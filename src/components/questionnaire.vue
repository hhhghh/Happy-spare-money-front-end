<style scoped>
p {
    font-size: 16px;
    margin-bottom: 5px;
}

span {
    font-size: 14px;
}

.span-choice {
    font-size: 14px; 
    margin-right: 10px;
}

.questionnaire-body {
    padding-top: 20px;
    padding-left: 150px;
    padding-right: 150px;
}

.single-item, .mutiple-item, .simple-item {
    margin-bottom: 20px;
}

.warning-question {
    color: #FF0000;
}
</style>

<template>
    <div class="questionnaire-body">
        <h1 style="margin-bottom: 10px">XXXXXX调查问卷</h1>
        <div class="single-body">
            <div class="single-item" v-for="item in single">
                <p v-bind:class="{'warning-question': answer[item.index - 1] == '' && !isFirst}">{{ item.index }}. {{item.question}}</p>
                <RadioGroup v-model="answer[item.index-1]">
                    <Radio v-for="(choice, index0) in item.choice" :key="choice.label" :label="choice.label">
                        <span class="span-choice">{{choice.label}}</span>
                    </Radio>
                </RadioGroup>
            </div>
        </div>

        <div class="mutiple-body">
            <div class="mutiple-item" v-for="(item,index) in mutiple">
                <p v-bind:class="{'warning-question': answer[item.index - 1].length == 0 && !isFirst}">{{ item.index }}. {{ item.question }}</p>
                <CheckboxGroup v-model="answer[item.index-1]">
                    <Checkbox v-for="(choice, index0) in item.choice" :key="choice.label" :label="choice.label">
                        <span class="span-choice">{{choice.label}}</span>
                    </Checkbox>
                </CheckboxGroup>
            </div>
        </div>

        <div class="simple-body">
             <div class="simple-item" v-for="item in simple">
                <p v-bind:class="{'warning-question': answer[item.index - 1] == '' && !isFirst}">{{ item.index }}. {{item.question}}</p>
                <Input  placeholder="Enter task title" type="textarea" :rows="10" style="width: 100%; position:relative;" v-model="answer[item.index-1]"></Input>
            </div>
        </div>
        <Button type="primary" long style="font-size: 14px" @click="postAnswer(questionnaire)">提交</Button>
         <div>
            {{answer}}
        </div>
    </div>
   
</template>

<script >
export default {
    data() {
        return {
            username:'yao',
            isFirst: true,
            answer:[
                
            ],
            questionnaire: [
                {
                    type: 0,
                    question: '单选题1',
                    choices: [
                        {
                            label:'A'
                        },
                        {
                            label:'B'
                        }
                    ],
                    answer: ''
                },
                {
                    type: 0,
                    question: '单选题2',
                    choices: [
                        {
                            label: 'C',
                        },
                        {
                            label: 'D'
                        }
                    ],
                    answer: ''
                },
                {
                    type: 1,
                    question: '多选题',
                    choices: [
                        {
                            label: 'C',
                        },
                        {
                            label: 'D'
                        },
                        {
                            label: 'E'
                        }
                    ],
                    answer: []
                },
                {
                    type: 2,
                    question: '简答题',
                    answer: ''

                }
            ],
            single: [],
            mutiple: [],
            simple: [],
            questionnaire_path:''
        }

    },
    mounted() {
       
        // this.getQuestions(this.questionnaire);
        this.questionnaire_path = this.$route.params.url;    
        this.getQuestionnaire(this.questionnaire_path);
    },
    methods: {
        getQuestionnaire(questionnaire_path) {
            let vm = this;
            let name = questionnaire_path.substring(questionnaire_path.lastIndexOf('/')+1);
            let url = '/uploads/questionnaire/' + name;
            // url = 'uploads/team/bc9321e869984.blob'
            //异步
            this.$axios.get(url, {
              
            })
            .then(function(response) {
                let data = response.data;
                // console.log(data.questions);
                if (response.status == 200) {
                    vm.questionnaire = data.questions;
                    vm.getQuestions(vm.questionnaire);
                } 

            
            })
            .catch(function (error) {
                console.log('Fail to request');
            });
        },
        getQuestions(questionnaire) {
            for(let i = 0;i < questionnaire.length;i ++) { 
                let ques = questionnaire[i];
                let type = ques['type'];
                // console.log(ques);
                ques['index'] = i + 1;
        
                if (type == 0) {
                    this.answer.push('');
                    this.single.push(ques);
                } else if (type == 1) {
                    this.answer.push([]);
                    this.mutiple.push(ques);
                } else if (type == 2) {
                    this.answer.push('');
                    this.simple.push(ques);
                }
            }
        },
        postAnswer(questionnaire) { 
            this.isFirst = false; 
            for(let i = 0;i < questionnaire.length;i ++) {
                if (this.answer[i] == '' || this.answer[i] == []) {
                    this.$Notice.warning({
                        title: 'Questions Lack Answer',
                        desc: 'Please complete the questionnaire '
                    }); 
                    return;
                }

                questionnaire[i]['answer'] = this.answer[i];
    
            }

            
            let vm = this;
            let url =  '/api/v1/file/TeamLogo';
            // let url = '/api/v1/file/Questionnaire';
            let form = new FormData();
           
            let data = JSON.stringify(questionnaire);
            let date = new Date();
            //Chrome Ok but IE is not OK
            // let file = new File([data], '123.json', {type: 'application/json', lastModified: date});
            let file = new Blob([data], {type: 'application/json', lastModified: date});
            form.append('file', file);
            // console.log(file);
            this.$axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log("test");
                let data = res.data;
                console.log(res.data);
                if (data.code == 200) {
                    // let ques_url = data.data.fileUrl;
                    // console.log(ques_url);
                   
                }
               
                
                
            }).catch((err) => {
                this.$Notice.warning({
                    title: 'Task Uploading Error',
                    desc: 'Fail to Upload the Questionnaire '
                });
            });
        }
    }

}


</script>
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

.questionnaire-content {
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 20px;
    border: 1px solid #dcdee2;
}

.p-answer {
    color: #FF0000;
    margin-top: 5px;
}
</style>

<template>
    <div class="questionnaire-body">
        <div class="questionnaire-content">
            <h1 style="margin-bottom: 10px">{{title}}</h1>
            <div class="single-body">
                <div class="single-item" v-for="item in single">
                    <p v-bind:class="{'warning-question': answer[item.index - 1] == '' && !isFirst}">{{ item.index }}. {{item.question}}</p>
                    <RadioGroup v-model="answer[item.index-1]">
                        <Radio v-for="(choice, index0) in item.choice" :key="choice.label" :label="choice.label" :disabled="state == 2">
                            <span class="span-choice">{{choice.label}}</span>
                        </Radio>
                    </RadioGroup>
                    <p class="p-answer" v-show="state == 2">Anwser:  {{answer[item.index-1]}}</p>
                </div>
            </div>

            <div class="mutiple-body">
                <div class="mutiple-item" v-for="item in mutiple">
                    <p v-bind:class="{'warning-question': answer[item.index - 1].length == 0 && !isFirst}">{{ item.index }}. {{ item.question }}</p>
                    <CheckboxGroup v-model="answer[item.index-1]">
                        <Checkbox v-for="choice in item.choice" :key="choice.label" :label="choice.label" :disabled="state == 2">
                            <span class="span-choice">{{choice.label}}</span>
                        </Checkbox>
                    </CheckboxGroup>
                    <p class="p-answer" v-show="state == 2">Anwser:  {{answer[item.index-1]}}</p>
                </div>
            </div>

            <div class="simple-body">
                <div class="simple-item" v-for="item in simple">
                    <p v-bind:class="{'warning-question': answer[item.index - 1] == '' && !isFirst}">{{ item.index }}. {{item.question}}</p>
                    <Input  placeholder="Enter task title" type="textarea" :rows="10" style="width: 100%; position:relative;" v-model="answer[item.index-1]" v-show="state != 2"></Input>
                    <p class="p-answer" v-show="state == 2">Anwser:  </p>
                    <p class="p-answer" v-show="state == 2">{{answer[item.index-1]}}</p>
                </div>
            </div>
        </div>
        <Button type="primary" long style="font-size: 14px; margin-top: 10px" @click="postAnswer(questionnaire)" v-show="state == 1" >提交</Button>
    </div>
   
</template>

<script scoped>

export default {
    data() {
        return {
            username:'yao',
            isFirst: true,
            answer:[
                
            ],
            title: '',
            questionnaire: {
                questions: [
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
                ]
            },
            single: [],
            mutiple: [],
            simple: [],
            questionnaire_path:'',
            state: 1,
            task_id:''
        }

    },
    mounted() {
       
        // this.getQuestions(this.questionnaire);
         
        this.questionnaire_path = this.$route.params.url; 
        this.state = this.$route.params.state;   
        this.task_id = this.$route.params.id;
        this.getQuestionnaire(this.questionnaire_path);
        this.getUserInfo();
        
    },
    methods: {
        getUserInfo(){
            let vm = this;
            let url = '/api/v1/user/getPersonalInfo'
            this.$axios.get(url, {
            
            })
            .then(function(response) {
                let data = response.data;
                if (data.code == 200) {
                    let userInfo = data.data;
                    vm.username = userInfo.username;
                    
                } 
            
            })
            .catch(function (error) {
                if (error.response.status == 401) {
                    vm.$Notice.warning({
                        title: 'Login',
                        desc:  "Please Login first"
                    });
                    vm.$router.push({name: 'login'});
                }
            });
        },
        getQuestionnaire(questionnaire_path) {
            let vm = this;
            let name = questionnaire_path.substring(questionnaire_path.lastIndexOf('/')+1);
            let url = '/uploads/questionnaire/' + name;
            // url = 'uploads/questionnaire/44cde885f8133.blob'
            //异步
            this.$axios.get(url, {
              
            })
            .then(function(response) {
                let data = response.data;
                console.log(data);
                if (response.status == 200) {
                    
                    vm.title = data.title;
                    vm.questionnaire.questions = data.questions;
                    vm.getQuestions(vm.questionnaire.questions);
                    
                    
                } 

            
            })
            .catch(function (error) {
                console.log('Fail to request');
            });
        },
        getQuestions(questions) {
            for(let i = 0;i < questions.length;i ++) { 
                let ques = questions[i];
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

            if (this.state == 2) {
                this.getAnswer(this.questionnaire.questions);
            }
        },
        getAnswer(questions) {
            
            for (let i = 0;i < questions.length;i ++) {
                this.answer[i] = questions[i].answer;
            }

        },
        postAnswer(questionnaire) { 
            this.isFirst = false; 
            for(let i = 0;i < questionnaire.questions.length;i ++) {
                if (this.answer[i] == '' || this.answer[i] == []) {
                    this.$Notice.warning({
                        title: 'Questions Lack Answer',
                        desc: 'Please complete the questionnaire '
                    }); 
                    return;
                }

                questionnaire.questions[i]['answer'] = this.answer[i];
    
            }

            
            let vm = this;
            let url =  '/api/v1/task/questionnaire/result';
            // let url =  '/api/v1/file/TeamLogo';
            // let url = '/api/v1/file/Questionnaire';
            let form = new FormData();
            questionnaire['title'] = vm.title;
            let data = JSON.stringify(questionnaire);
            let date = new Date();
            //Chrome Ok but IE is not OK
            // let file = new File([data], '123.json', {type: 'application/json', lastModified: date});
            let file = new Blob([data], {type: 'application/json', lastModified: date});
            form.append('file', file);

            this.$axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
               
                let data = res.data;
                // console.log(res.data);
                if (data.code == 200) {
                    let ques_url = data.data.fileUrl;
                    // console.log(ques_url);
                    vm.completeTask(ques_url);
                    vm.$router.go(-1);
                }
               
                
                
            }).catch((err) => {
                this.$Notice.warning({
                    title: 'Task Uploading Error',
                    desc: 'Fail to Upload the Questionnaire '
                });
            });
        },
        completeTask(ques_url) {
            let vm = this;
            let url = '/api/v1/task/complement'

            
            //异步
            this.$axios.post(url, {
                task_id: vm.task_id,
                questionnaire_path: ques_url
                
            })
            .then(function(response) {
                console.log(response.data);
                vm.$Notice.success({
                    title: 'Task Complement',
                    desc:  'Waiting for cofirming.'
                });
               
                
            })
            .catch(function (error) {
                console.log('error');
            });
        }
    }

}


</script>
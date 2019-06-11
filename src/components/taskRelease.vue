<style scoped>
.ivu-form-item-label {
    font-size: 16px;
}
.content-body {
    padding: 15px;
    background-color: #f8f8f9;
    
}

.content-body-layout {
    display:flex;
    min-width:1200px;
}
.task-info {
    position: relative;
    padding: 10px;
    width:80%;
    
}

.input-style {
    margin-left:20px;
}

.item-span {
    font-size: 18px;
    margin-top:3px;
  
   
}

.div-formItem {
    margin-top: 20px;
    margin-bottom: 20px;
}

.div-flex, .div-task-type-range {
    display:flex; 
    width: 100%;  
}
.div-task-type, .div-task-range {
    display:flex;
    width:50%;
}

.div-recent-task {
    width:20%;
    border-left: 1px solid #e8eaec;
    margin-left:20px
}

.task-item {
    margin: 20px;
    border: 1px solid #5cadff;
    box-shadow: 5px 5px 5px #5cadff;
    float: left;
    width:100%;
    height: 160px;
    position:relative;
}


.task-title{
    font-size: 18px;
    margin: 10px;
}

.task-intro {
    font-size: 16px;
    margin:10px;
}

.task-type {
    font-size: 16px;
    margin:10px;
}

.task-endtime {
    font-size: 16px;
    margin:10px;
}


.task-money {
    font-size: 16px;
    position:absolute;
    bottom: 0px;
    left: 0px;
    margin: 5px;
    margin-left: 10px;
   
}

.span-money{
    position:relative;
    bottom: 4px;
}

.coin {
    width:20px;
    height:20px;

}

.task-number {
    position:absolute;
    right:0px;
    bottom:0px;
    margin:10px;

}

.item-mouseenter {
    box-shadow: 3px 3px 5px #2b85e4;
}

.error-input {
    border:1px solid #ed4014;
    border-radius: 4px;
}
</style>

<template>
    <div class="content-body">
        <h1>任务发布</h1>
        <div class="content-body-layout">
            <div class="task-info">
                <div >
                    <div class="div-formItem div-flex">
                        <span class="item-span"   style="width:5%;">标题</span>
                        <Input  class="input-style" v-bind:class="{ 'error-input': taskInfo.title == ''&& !isFirst}" type="textarea" :rows="1" placeholder="Enter task title" clearable style="width: 95%" v-model="taskInfo.title"></Input>
                    </div>
                    <div  class="div-formItem div-flex">
                        <span class="item-span"   style="width:5%;">简介</span>
                        <Input  class="input-style" v-bind:class="{ 'error-input': taskInfo.introduction == ''&& !isFirst}" placeholder="Enter task title" type="textarea" :rows="4" style="width: 95%" v-model="taskInfo.introduction"></Input>
                    </div>
                
                    <div class="div-formItem div-flex">
                        <span class="item-span"   style="width:5%;" >数量</span>
                        <InputNumber class="input-style"  :min="1" v-model="taskInfo.max_accepter_number" style="width: 20%;" :disabled="taskInfo.type == 2"></InputNumber>
                    </div> 
                    <div class="div-formItem div-flex">
                        <span class="item-span"   style="width:5%;">金额</span>
                        <InputNumber class="input-style"  :min="1" v-model="taskInfo.money" style="width: 20%;"></InputNumber>
                    
                    </div>
        
                    <div class="div-formItem" style="display:flex">
                        <span class="item-span">截止时间</span>
                        <div style="display:flex">   
                            <DatePicker class="input-style" v-bind:class="{ 'error-input': taskInfo.endtime == ''&& !isFirst}" type="datetime"  :options="disabledTime" placeholder="Select date" style="width: 250px;" v-model="taskInfo.endtime"></DatePicker>     
                        </div>
                    </div>
                    <div class="div-task-type-range">
                        <div class="div-task-type">
                            <span class="item-span">任务类型</span>
                            <Select class="input-style"  v-model="taskInfo.type" style="width:70%" label="问卷调查" :on-change="taskTypeChange()">
                                <Option v-for="item in taskType" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                            </Select>
                        </div>                   
                        <div class="div-task-type">
                            <span class="item-span"   style="width:25%;">任务发布范围</span>
                            <Select class="input-style"  v-model="taskInfo.range" style="width:70%" label="全部"  multiple>
                                <Option v-for="item in rangeType" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                            </Select>
                        </div>
                    </div>
                    
                    <div class="div-formItem">
                        <span class="item-span">评价分数要求</span>
                    <InputNumber class="input-style" :max="5" :min="0" :step="0.5" v-model="taskInfo.score"></InputNumber>
                    </div>
                    <Divider></Divider>
                    <div class="div-questionaire"  v-show="isQuestionaire">
                        <span class="item-span">上传调查问卷文件</span>
                        <Upload
                            multiple
                            type="drag"
                            action="//jsonplaceholder.typicode.com/posts/"
                            :format="['jpg','jpeg','png']"
                           
                            :before-upload="handleBeforeUpload"
                            

                            style="margin-top:20px">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff;" v-show="!isFileExist"></Icon>
                                <Icon type="ios-cloud-done-outline" size="52" style="color: #3399ff;" v-show="isFileExist"></Icon>
                                <p v-show="!isFileExist">Click or drag files here to upload</p>
                                <p v-show="isFileExist">File is ready to be uploaded</p>
                            </div>
                        </Upload>   
                     </div>
                    <div class="div-formItem">
                        <span class="item-span" style="display: block">具体要求与联系方式</span>
                        <Input  placeholder="Enter task title" type="textarea" :rows="10" style="width: 100%; position:relative; margin-top:15px;" v-model="taskInfo.content"></Input>
                    </div>
                </div>
               
                <Button type="primary" long  @click="releaseTask(taskInfo)" style="font-size: 14px" :disabled="isUploading">发布任务</Button>
                <Modal
                    v-model="isModalShow"
                    title="支付"
                    @on-ok="ok"
                    @on-cancel="cancel"
                    :loading="loading">
                    <p style="font-size: 14px; margin-bottom: 5px;">请输入密码</p>
                    <Input v-model="password" type="password"></Input>
                </Modal>
            </div>
            <!--Rencent task list-->
            <div class="div-recent-task">   
                <p style="margin:10px;font-size: 18px;font-weight: bold;">最近发布的任务</p>
                <div class="task-content">
                    <div class="task-item" v-for="item in taskItems" v-bind:class="{
                    'item-mouseenter': isEnter(item.task_id)}"
                    @mouseenter="enterItemId = item.task_id" @mouseleave="enterItemId = ''" @click="jumpToTaskDetail(item.task_id)">
                        
                        <div class="task-title">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="task-type">
                            <span style="font-weight: bold">任务类型:</span>
                            <span>{{item.type}} </span>
                        </div>
                        <div class="task-endtime">
                            <span style="font-weight: bold">截止时间:</span>
                            <span>{{item.endtime}} </span>
                        </div>
                        <div class="task-money"> 
                            <img class="coin" src="../assets/coin.jpg"/>
                            <span class="span-money">{{ item.money }}</span>
                        </div>
                        <div class="task-number">
                            <Icon type="ios-copy" size="18" />
                            <span>{{ item.max_accepter_number }}</span>
                    </div>    
                </div>
            </div>
            </div>
            <!--
            <div>
                <p>{{taskInfo.title}}</p>
                <p>{{taskInfo.introduction}}</p>    
                <p>{{taskInfo.max_accepter_number}}</p>    
                <p>{{taskInfo.money}}</p>    
                <p>{{taskInfo.type}}</p>    
                <p>{{taskInfo.range}}</p>  
                <p>{{taskInfo.endtime}}</p>  
                <p>{{taskInfo.starttime}}</p>  
                <p>{{taskInfo.score}}</p>  
                <p>{{taskInfo.content}}</p>      
            </div>
            -->
        </div>
    </div>
</template>

<script scoped>
var SHA256 = require("crypto-js/sha256");
export default {
    data() {
        return {
            username: 'yao',
            password: '',
            money: 0,
            isFirst: true,
            isUploading: false,
            loading: true,
            //isQuestionaire type
            isQuestionaire: true,
            isFileExist: false,
            isModalShow: false,
            //selector item
            taskType: [
                {
                    value: 1,
                    label: '问卷调查'
                },
                {
                    value: 2,
                    label: '跑腿'
                },
               
            ],

            rangeType: [
                {
                    value: 1,
                    label: '全部'
                },
                
            ],
            //the highlight color item id
            enterItemId: '',
            disabledTime: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }

            },
            

            taskInfo :{
                title: '',
                introduction: '',
                max_accepter_number: 1,
                money: 1,
                endtime: '',
                starttime: '',
                type: 1,
                range: 1,
                score: 0,
                content: '',
                file: null
                
            },
            taskItems: [
                {
                    id : 1,
                    title: 'xxx问卷调查',
                    endtime: '2019-05-01 23:00',
                    money: 1,
                    state: 'doing',
                    type: '问卷调查',
                    max_accepter_number: 2
                },
                {
                    id: 2,
                    title: 'xxx取快递',
                    endtime: '2019-05-01 23:00',
                    money: 2,
                    type: '取快递',
                    state: 'completed',
                    max_accepter_number: 1
                },
                {
                    id: 3,
                    title: 'xxx取快递',
                    endtime: '2019-05-01 23:00',
                    money: 2,
                    type: '取快递',
                    state: 'waiting',
                    max_accepter_number: 1
                }
            ],
            


        };
    },

    mounted() {
        Date.prototype.Format = function (fmt) { //author: meizz
                let o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (let k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
        };
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
                    vm.money = userInfo.money;
                    vm.getRecentTask();
                    vm.getGroup();
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
        getRecentTask() {
            //http request get
            let vm = this;
            let url = '/api/v1/task/findByPublisher'
            //异步
            this.$axios.get(url, {
                params: {
                    type: 'all',
                    range: 'all',
                    state: 'all',
                    publisher: vm.username
                }
            
            })
            .then(function(response) {
                // console.log(response.data);
                vm.taskItems = [];
                let data = response.data;
                if (data.code == 200) {
                    let task = data.data;
                    let max_length = 5;
                    let length = task.length > max_length ? max_length : task.length; 
                    for (let i = 0;i < length;i ++) {
                        if (task[i].type == 1) {
                           task[i].type = '问卷调查';
                        } else if (task[i].type == 2){
                           task[i].type = '跑腿';
                        }
                         vm.taskItems.push(task[i]);
                    }
                   
                } 
                
                
            
            })
            .catch(function (error) {

            });
        },

        getGroup: function() {
            let vm = this;
            let url = '/api/v1/team/MemberName'
            //异步
            this.$axios.get(url, {
               params: {
                   member_username : vm.username
               }
            
            })
            .then(function(response) {
                let data = response.data;
                if (data.code == 200) {
                    let teamDatas = data.data;
                    for(let i = 0;i < teamDatas.length;i ++) {
                        vm.rangeType.push({value: teamDatas[i].team_id, label: teamDatas[i].team_name + '--' + teamDatas[i].leader});
                    }
                    // console.log(vm.rangeType);
                } 
            
            })
            .catch(function (error) {
                console.log('Fail to request');
            });
        },
        getFile(event) {
            this.file = event.target.files[0];
            // console.log(this.file.name);
        },
        isEnter(id) {
            return id == this.enterItemId;
            
        },
        taskTypeChange(){
           this.isQuestionaire = this.taskInfo.type == 1 ? true : false;
           if (!this.isQuestionaire) {
               this.taskInfo.max_accepter_number = 1;
           }
           
        },
        handleBeforeUpload (file) {
            let type = file.name.substring(file.name.lastIndexOf('.')+1);
            console.log(file);
            if (type == 'yaml') {
                this.taskInfo.file = file;
                this.isFileExist = true;
            } else {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format is incorrect, please select yaml.'
                });
               
            }
            return false;
        },

        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format is incorrect, please select yaml.'
            });
        },

        jumpToTaskDetail(id) {
            this.$router.push({path: `/MainPage/taskDetail/${id}`})
        },
        ok() {

            this.confirmPassword(this.password);
          
        },
        cancel() {
            // this.$Message.info('Clicked cancel');
        },
        confirmPassword(password) {
            
            
            let vm = this;
            let url ='/api/v1/user/verifyPassword';
            
            this.$axios.post(url, {         
                password: SHA256(vm.password).toString()
            })
            .then(function(response) {
               
                let data = response.data;
                // console.log(data);
                if (data.code == 200) {
                    vm.isUploading = true;
                    vm.isModalShow = false;
                    if (vm.taskInfo.type == 1) {
                        vm.postQuestionnaire(vm.taskInfo);
                    } else {
                        vm.postTaskInfo(vm.taskInfo, '');
                    }
                } else {
                    vm.$Message.info('密码错误');
                    vm.loading = false;
                    setTimeout(() => {
                        vm.loading = true;
                    }, 10);    
                }

                
            
            })
            .catch(function (error) {
                if (error.response.status == 401) {
                   
                    vm.$Notice.warning({
                        title: 'Task Release',
                        desc:  "Please Login first"
                    });
                    vm.$router.push({name: 'login'});
               
                }
            });
            

            
        },
        releaseTask(taskInfo) {
            let isError = false;
            this.isFirst = false;
            let endtime_date = new Date(taskInfo.endtime);
            let starttime_date = new Date();
            if (taskInfo.title == '') {
                this.$Notice.warning({
                    title: 'Task Info Lack',
                    desc: 'Task Title'
                });
                isError = true;
            }
            if (taskInfo.simpleInfo == '') {
                this.$Notice.warning({
                    title: 'Task Info Lack',
                    desc: 'Task SimpleInfo'
                });
                isError = true;
            }
            if (taskInfo.endtime == '' ) {
                this.$Notice.warning({
                    title: 'Task Info Lack',
                    desc: 'Task Date and Time'
                });
                isError = true;
            } 
            if (endtime_date < starttime_date) {
                this.$Notice.warning({
                    title: 'Task Info TimeError',
                    desc: 'Please choose the latter time'
                });
                isError = true;

            } 
            if (taskInfo.requirement == '') {
                this.$Notice.warning({
                    title: 'Task Info Lack',
                    desc: 'Task Requirement'
                });
                isError = true;
            } 

            if (taskInfo.file == null && taskInfo.type == 1) {
                this.$Notice.warning({
                    title: 'Task Info Lack',
                    desc: 'Please Upload Task Questionnaire'
                });
                isError = true;
            }

            if (this.money < taskInfo.max_accepter_number * taskInfo.money) {
                this.$Notice.warning({
                    title: 'Money',
                    desc: 'Balance is not enough'
                });
                isError = true;
            }

          
            if (!isError)
            {
                this.isModalShow = true;
                        
                
            }
           
           
            
            
        },
        postQuestionnaire(taskInfo) {
            let vm = this;
            let url =  '/api/v1/file/Questionnaire';

            let form = new FormData();
            form.append('file', this.taskInfo.file);
            
            this.$axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                let data = res.data;
                // console.log(res.data);
                if (data.code == 200) {
                    let ques_url = data.data.fileUrl;
                    console.log(ques_url);
                    vm.postTaskInfo(taskInfo, ques_url);
                }
               
                
                
            }).catch((err) => {
                this.$Notice.warning({
                    title: 'Task Uploading Error',
                    desc: 'Fail to Upload the Questionnaire '
                });
            })
            
        },
        postTaskInfo(taskInfo, ques_url) {
            let endtime = new Date(taskInfo.endtime).Format("yyyy-MM-dd hh:mm:ss");
            let starttime = new Date().Format("yyyy-MM-dd hh:mm:ss");
            taskInfo.endtime = endtime;
            taskInfo.starttime = starttime;
            
            let vm = this;
            let url ='/api/v1/task';
            
            this.$axios.post(url, {
                title: taskInfo.title,
                introduction: taskInfo.introduction,
                money: taskInfo.money,
                score: taskInfo.score,
                max_accepter_number: taskInfo.max_accepter_number,
                publisher: vm.username,
                type: taskInfo.type,
                starttime: taskInfo.starttime,
                endtime: taskInfo.endtime,
                content: taskInfo.content,
                range: taskInfo.range,
                questionnaire_path: ques_url
               
            
            
                    

            })
            .then(function(response) {
                // console.log(response.data);
                let data = response.data;
                if (data.code == 200) {
                        vm.$Notice.success({
                        title: 'Task Release',
                        desc:  'Releasing the task successfully.'
                    });
                    vm.jumpToTaskDetail(data.data.task_id);
                }
                
                
            
            })
            .catch(function (error) {
                if (error.response.status == 401) {
                   
                    vm.$Notice.warning({
                        title: 'Task Quiting',
                        desc:  "Please Login first"
                    });
                    vm.$router.push({name: 'login'});
               
                }
            });
        }

    }

}
</script>

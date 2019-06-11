<template>
    <div class="task-body">
        <div class="task-detail-body">
            <div class="drawer-btn">
                <Button @click="drawerDisplay = true" type="info" v-show="isReleaser">任务完成度</Button>
                </br>
                <Button type="primary" style="margin-top: 10px" v-show="isReleaser && task.type == 1" @click="jumpToQuestionnaire(task.questionnaire_path, 0)">问卷内容</Button>
            </div>
            <h1 id="title" style="font-size: 28px">任务信息</h1>
            <div class="detail-body">
                <div class="div-score" v-show="isAcceptor && isCompleted ">
                    <p style="font-size:18px; font-weight:bold;" >评分</p>
                    <Rate v-model="tr.score" disabled></Rate>
                </div>
                <div class="detail">
                    <div class="div-taskInfo-item">
                        <div class="div-taskInfo-item">
                            <h1>标题 </h1>
                            <p>{{ task.title }}</p>
                        </div>
                       
                    </div>
                    <div class="div-taskInfo-item">
                        <h1 id="intro">简介</h1>
                        <p>{{ task.introduction }} </p>
                    </div>
                    <div class="div-taskInfo-item div-flex">
                        <div class="div-taskInfo-cell">
                            <h1 id="type">类型</h1>
                            <p>{{ task.type_label }} </p>
                        </div>
                        <div class="div-taskInfo-cell">
                            <h1 id="releaser">发布人</h1>
                            <Avatar :src="avatar"> </Avatar>
                            <span style="margin-left: 10px">{{ name }} </span>
                        </div>
                    </div>
                    <div class="div-taskInfo-item">
                        <h1 id="time">任务时间</h1>
                        <div style="display: flex">
                            <div class="div-flex div-taskInfo-cell" > 
                                <h2>开始时间:</h2>
                                <span class="span-time">{{task.starttime}} </span>
                                <!--Time :time="task.starttime" type="datetime" / -->
                            </div>
                            <div class="div-flex div-taskInfo-cell" > 
                                <h2>截止时间:</h2>
                                <span class="span-time">{{task.endtime}} </span>
                                <!--Time :time="task.endtime" type="datetime" / -->
                            </div>
                        </div>
                    </div>
                    <div class="div-taskInfo-item div-flex">
                        <div class="div-taskInfo-cell">
                            <h1 id="profit" >奖赏</h1>
                            <span>{{task.money}}</span>
                            <Icon type="logo-yen" />
                        </div>
                        <div class="div-taskInfo-cell" v-show="isReleaser">
                            <h1>数量</h1>
                            <span>{{task.max_accepter_number}}</span>
                        </div>
                        <div class="div-taskInfo-cell" v-show="isReleaser">
                            <h1>接受评分要求</h1>
                            <Rate allow-half show-text v-model="task.score" disabled>
                                <span style="color: #f5a623;position:relative;bottom:2px;">{{ task.score }}</span>
                            </Rate>
                        </div>
                    </div>
                    
                </div>

            </div>
            <div id="requirement" class="accepted-detail-body" v-show="isAcceptor || isReleaser">
                <div class="releaser-info">
                    <h2>具体要求与联系方式</h2>
                    <p>{{task.content}}</p>
                </div>
            </div>
            

            <div style="margin-top: 20px;">
                <Button class="btn" type="success" long v-show="!isAcceptor && !isReleaser" @click="acceptTask()" :disabled="isOver">接受任务</Button>
                <Button class="btn" type="primary" long v-show="isAcceptor && isDoing" @click="completeTask()">完成任务</Button>
                <Button class="btn" type="error" long v-show="isAcceptor && isDoing" @click="quitingTask()">放弃任务</Button>
               
                <Button class="btn" type="success" long v-show="isAcceptor && !isDoing">{{ acceptorBtnMsg }}</Button>
                
                <!--待处理-->
                <Button class="btn" type="error" long v-show="isReleaser && !isCompleted" @click="cancelTask()" :disabled="trs.length > 0">取消任务</Button>
                <Button class="btn" type="success" long v-show="isReleaser && isCompleted">已完成</Button>
            </div>
        
       </div>
        <Drawer title="完成度" width="500" :closable="false" v-model="drawerDisplay">
            
            <div class="table-whole" >
                <div class="div-table-body">
                    <div class="table-header">
                        <table style="width: 470px;" border="0" cellspacing="0" cellpadding="0">
                            <thead>
                                <tr>
                                    <th  width="163">
                                        <div class="header-th">
                                            <span>User</span>
                                        </div>
                                    </th>
                                    <th  width="203">
                                        <div class="header-th">
                                            <span>State</span>
                                        </div>
                                    </th>
                                     <th  width="120">
                                        <div class="header-th">
                                            <span>Action</span>
                                            <!--<Checkbox @click="selectAll()" v-model="isSelectAll"></Checkbox>-->
                                            <input type="checkbox" v-model="isSelectAll" @click="selectAll()">
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            
                        </table>
                    </div>
                    <div class="table-body">
                        <table style="width: 470px;" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr v-for="(item,index) in trs">
                                    <td  width="163">
                                        <div class="header-th">
                                            <Avatar :src="item.avatar"></Avatar>
                                            <strong>{{ item.username }}</strong>
                                        </div>
                                    </td>
                                    <td  :width="td_width">
                                        <div class="header-th">
                                            <span>{{ item.label }}</span>
                                        </div>
                                    </td>
                                    <td width="120">
                                        <div class="header-th" style="display: flex">
                                            <Poptip placement="bottom-end">
                                                 <Button type="primary" size="small" :disabled="item.state != 1">确认完成</Button>
                                                 <div class="div-evaluation" slot="content">
                                                    <span class="span-score">评分</span>
                                                    <Rate v-model="scoreValue"></Rate>
                                                    <Button type="info" size="small" :disabled="item.state == 2" @click="confirmTaskSingle(item.username, scoreValue, index)">确认</Button>
                                                 </div>
                                            </Poptip>
                                            <Button type="primary" size="small" style="margin-left:5px" v-show="task.type == 1" :disabled="item.state == 0" @click="jumpToQuestionnaire(item.questionnaire_path, 2)">问卷答案</Button>
                                            <Checkbox :disabled="item.state != 1" v-model="item.isSelected" style="margin-top: 3px;position: relative;left: 10px;"></Checkbox>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div style="float:right;margin-right:10px; margin-top:10px;">
                <Poptip placement="bottom-end">
                    <Button type="success" :disabled="trs.length == 0">一键确认</Button>
                    <div class="div-evaluation" slot="content">
                        <span class="span-score">评分</span>
                        <Rate v-model="scoreValue"></Rate>
                        <Button type="info" size="small" @click="confirmTaskMutiple(scoreValue)">确认</Button>
                    </div>
                </Poptip>
            </div>
           
        </Drawer>
        <div class="div-anchor-body">
            <div class="div-anchor">
                
                <Anchor show-ink>
                    <AnchorLink href="#title" title="标题" />
                    <AnchorLink href="#type" title="类型" />
                    <AnchorLink href="#intro" title="简介" />
                    <AnchorLink href="#releaser" title="发布人" />
                    <AnchorLink href="#time" title="任务时间" />
                    <AnchorLink href="#profit" title="奖赏" />
                    <AnchorLink href="#requirement" title="具体要求"/>
                </Anchor>
            </div>
        </div>
    </div>
    


</template>


<script scoped>
export default {
    //ba6edb624b0d2.json
    inject: ['reload'],
    data () {
        return {
            
            username: 'yao',
            name:'',
            
           
            task_id: '',
            isReleaser: false,     
            isAcceptor: false,      //control the show of accepter and cancel buttons
            acceptorBtnMsg: '',
            isDoing: true,          //for Acceptor
            isCompleted: false,     
            isOver: false,
            drawerDisplay: false,
            scoreValue: 0,
            isSelectAll: false,
            isFirst: true,
            trs: [],
            selectedTr:[],
            tr:  {
                score:0,
            },
            td_width: 203,
            avatar:'',
            task: {
                title: 'xxxxxx问卷调查',
                introduction: '可能会发生这样的情况：当一个道具在激活状态时，另一个道具与挡板发生了接触。在这种情况下我们有超过1个在当前PowerUps容器中处于激活状态的道具。然后，当这些道具中的一个被停用时，我们不应使其效果失效因为另一个相同类型的道具仍处于激活状态。出于这个原因，我们使用isOtherPowerUpActive检查是否有同类道具处于激活状态。只有当它返回false时，我们才停用这个道具的效果。这样，给定类型的道具的持续时间就可以延长至最近一次被激活后的持续时间。',
                money: 12,
                max_accepter_number: 10,
                publisher : 'Howlyao',
                state: 1,
                score: 3.5,
                type: 2,
                starttime: '', //(new Date()).getTime() - 86400 * 3 * 1000,
                endtime: '',//(new Date()).getTime(),
                content:''
            },

            

            
        }
    },
    
    mounted() {
        this.task_id = this.$route.params.id;    
        this.getMyUserInfo();

    },

    methods: {
        getMyUserInfo(){
            let vm = this;
            let url = '/api/v1/user/getPersonalInfo'
            this.$axios.get(url, {
            
            })
            .then(function(response) {
                let data = response.data;
                if (data.code == 200) {
                    let userInfo = data.data;
                    vm.username = userInfo.username;
                    vm.name = userInfo.name;
                    vm.getTaskDetail();
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
        // OK
        getTaskDetail:function() {
            let vm = this;
            let url ='/api/v1/task/findByTaskId'

            //异步
            this.$axios.get(url, {
                params: {
                    task_id: vm.task_id
                }
            })
            .then(function(response) {
                let data = response.data;
                // console.log(data);
                if (data.code == 200) {
                    let task = data.data;
                    if (task.type == 1) {
                        task["type_label"] = '问卷调查';
                        vm.td_width = 163;
                    } else {
                        task["type_label"] = '跑腿';
                        vm.td_width = 203;
                    }

                   

                    

                    vm.task = task;
                    //Set the charactor
                    vm.setCharactor(); 
                    vm.getUserInfo();
                }
               

                
            })
            .catch(function (error) {
                console.log('error');
            });

        },

        getUserInfo:function() {
            let vm = this;
            let url = '/api/v1/user/getuser';

            //异步
            this.$axios.get(url, {
                params: {
                    username: vm.task.publisher
                }
            })
            .then(function(response) {
                let data = response.data;
                if (data.code == 200) {
                    // console.log(data);
                    vm.avatar = data.data.avatar;
                }
               

                
            })
            .catch(function (error) {
                console.log('userInfo error');
            });

        },
        // OK
        setCharactor: function() {

            let vm = this; 
            let info = vm.task;
           
            vm.getTaskRelation();
            if (info.publisher == vm.username) {
                vm.isReleaser = true;
                
                if (info.state == 2) {
                    vm.isCompleted = true;
                } else {
                    vm.isCompleted = false;
                }
                
            } else {
                //http请求
                //找到登陆用户是否有接受过该任务
                //若有isAcceptor = true else isAcceptor = false
                let url = '/api/v1/task/acceptance'
                this.$axios.get(url, {
                    params:{
                        task_id: vm.task_id,
                        username: vm.username
                    }
                })
                .then(function(response) {
                    
                    let tr = response.data.data;
                    // console.log(response);
                    if (tr == null) {
                        vm.isAcceptor = false;
                      
                    
                    } else {
                        vm.tr = tr;
                        vm.isAcceptor = true;
                        // console.log('test');
                        if (vm.tr.state == 1) {
                            vm.acceptorBtnMsg = '等待核实';
                            vm.isDoing = false;
                        } else if (vm.tr.state == 2) {
                            vm.acceptorBtnMsg = '已完成';
                            vm.isDoing = false;
                        }
                        if (vm.tr.state == 2) {
                            vm.isCompleted = true;
                        }
                        
                    }
                    
                
                })
                .catch(function (error) {
                     console.log('setCharacter error');
                });

            }
        },
        // OK
        acceptTask: function() {
            let vm = this;
            let url = '/api/v1/task/acceptance';

            //添加接受者与任务的联系
            this.$axios.post(url, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                username: vm.username,
                task_id: vm.task.task_id
                
            
            })
            .then(function(response) {
                let data = response.data;
                let msg = data.msg;
                if (data.code == 200) {
                    vm.$Notice.success({
                        title: 'Task Acceptance',
                        desc:  'Accept the task successfully.'
                    });
                    vm.reload();
                    
                } else{
                    
                    vm.$Notice.warning({
                        title: 'Task Acceptance',
                        desc:  msg
                    });
                    vm.reload();
                }
               
            })
            .catch(function (error) {
                if (error.response.status == 401) {
                   
                    vm.$Notice.warning({
                        title: 'Task Acceptance',
                        desc:  "Please Login first"
                    });
                    vm.$router.push({name: 'login'});
               
               }
            });
        },

        completeTask: function() {
            if(this.task.type == 1) {
                // let url = 'http://localhost:3000/uploads/questionnaire/69cc28649066e.json';
                let url = this.task.questionnaire_path;
                this.$router.push({name: 'questionnaire', params: {url: url, id: this.task.task_id, state: 1}});
            } else {
                let vm = this;
                let url = '/api/v1/task/complement'
            
                //异步
                this.$axios.post(url, {
                    task_id: vm.task_id,
                    username: vm.username
                    
                })
                .then(function(response) {
                    // console.log(response.data);
                    let data = response.data;
                    let msg = data.msg;
                    if (data.code == 200) {
                        vm.$Notice.success({
                            title: 'Task Complement',
                            desc:  'Waiting for cofirming.'
                        });
                        vm.reload();
                    } else{
                        vm.$Notice.warning({
                            title: 'Task Complement',
                            desc:  msg
                        });
                        vm.reload();
                    }

                    
                   
                    
                })
                .catch(function (error) {
                    if (error.response.status == 403) {
                   
                        vm.$Notice.warning({
                            title: 'Task Complement',
                            desc:  "Please Login first"
                        });
                        vm.$router.push({name: 'login'});
               
                    }
                });
            }
        },
        // OK
        quitingTask:function() {
            let vm = this;
            let url = '/api/v1/task/acceptance';

            //删除接受者与任务的联系
            this.$axios.delete(url, {
                params: {
                    username: vm.username,
                    task_id: vm.task.task_id
                }
                
            
            })
            .then(function(response) {
                // console.log(response.data);
                let data = response.data;
                let msg = data.msg;
                if (data.code == 200) {
                    vm.$Notice.success({
                        title: 'Task Quiting',
                        desc:  'Quiting the task successfully.'
                    });
                    vm.reload();
                } else{

                    vm.$Notice.warning({
                        title: 'Task Quiting',
                        desc:  msg
                    });
                    vm.reload();
                }
                
                // console.log(response.data)
                //reload
            })
            .catch(function (error) {
                if (error.response.status == 403) {
                   
                    vm.$Notice.warning({
                        title: 'Task Quiting',
                        desc:  "Please Login first"
                    });
                    vm.$router.push({name: 'login'});
               
                }
            });
            
            
           
        },

        cancelTask:function() {
            let vm = this;
            let url = '/api/v1/task';

            //删除任务
            this.$axios.delete(url, {
                params: {
                    task_id: vm.task_id
                }
               
            
            })
            .then(function(response) {
                let data = response.data;
                let msg = data.msg;
                if (data.code == 200) {
                    // console.log(data)
                    vm.$Notice.success({
                        title: 'Task Cancel',
                        desc:  'Cancel the task successfully.'
                    });

                    // vm.$router.push({path: `/MainPage/taskSearch`})
                    vm.$router.go(-1);
                } else {
                    vm.$Notice.warning({
                        title: 'Task Cancel',
                        desc:  msg
                    });
                }
               
                //reload
            })
            .catch(function (error) {
                if (error.response.status == 401) {
                   
                    vm.$Notice.warning({
                        title: 'Task Cancel',
                        desc:  "Please Login first"
                    });
                    vm.$router.push({name: 'login'});
               
                }
            });
        },


        getTaskRelation: function() {
            let vm = this;
            let url = '/api/v1/task/accepter'

            //异步
            this.$axios.get(url, {
                params: {
                    task_id: vm.task_id,     
                }                     
            })
            .then(function(response) {
                
                let data = response.data;
                
                if (data.code == 200) {
                    let trs = data.data;
                    // console.log(trs);
                    for(let i = 0;i < trs.length;i ++) {
                        if (trs[i].state == 0) {
                            trs[i]["label"] = '正在做';
                        } else if (trs[i].state == 1) {
                            trs[i]["label"]  = '等待核实';
                        } else if (trs[i].state == 2) {
                            trs[i]["label"]  = '已完成';
                        }
                        trs[i]["avatar"] = trs[i].trs[0].avatar;
                        trs[i]["isSelected"] = false;
                        // vm.selectedTr.push({"isSelected":false});
                    }
                   
                    
                    //over the max_accepter_number
                    if(trs.length >= vm.task.max_accepter_number) {
                        vm.isOver = true;
                    }
                    
                    vm.trs = trs;
                   
                   
                }
                
                
            })
            .catch(function (error) {
                console.log('get tr error');
            });
        },
        selectAll() {
           
            for (let i = 0;i < this.trs.length; i++) {
                if (this.trs[i].state == 1) {
                    this.trs[i].isSelected = this.isSelectAll;
                }
            } 
        },
        confirmTaskSingle:function(username_, score_, index) {
            let username_arr = []
            let index_arr = []
            let score_arr =[]
            username_arr.push(username_);
            index_arr.push(index);
            score_arr.push(score_)
           
            this.postConfirmTask(username_arr, score_arr, index_arr);
            
        },
        confirmTaskMutiple(score_) {
            let username_arr = [];
            let index_arr = [];
            let score_arr = [];
            
            for(let i = 0;i < this.trs.length;i ++) {
                if (this.trs[i].isSelected) {
                    username_arr.push(this.trs[i].username);
                    index_arr.push(i);
                    score_arr.push(score_);
                }
            }
            
            this.postConfirmTask(username_arr, score_arr, index_arr);
        },
        postConfirmTask(username_arr, score_arr, index_arr) {
            let vm = this;
            let url = '/api/v1/task/comfirm'
            this.$axios.post(url, {
                username: username_arr,
                score: score_arr,
                task_id: vm.task_id
                
                                    
            })
            .then(function(response) {
                // console.log(response.data);
                let data = response.data;
                let msg = data.msg;
                if (data.code == 200) {
                     vm.$Notice.success({
                        title: 'Task Confirm',
                        desc:  'Confirm successfully.'
                    });
                    // vm.reload();
                    for (let i = 0;i < index_arr.length;i ++) {
                         vm.trs[index_arr[i]].state = 2;
                         vm.trs[index_arr[i]].label = "已完成";
                    }
                   

                    
                  
                    if (vm.trs.length < vm.task.max_accepter_number) {
                        vm.isCompleted = false;
                        return;
                    }
                       
                    let isCompleted = true;
                    for (let i = 0;i < vm.trs.length;i ++) {
                        if (vm.trs[i].state != 2) {
                            isCompleted = false;
                            break;
                        }
                    }
                  

                    if (isCompleted) {
                        vm.isCompleted = true;
                    }
                }  else {
                    vm.$Notice.warning({
                        title: 'Task Comfirm',
                        desc:  msg
                    });
                }
               
            })
            .catch(function (error) {
                if (error.response.status == 403) {
                   
                    vm.$Notice.warning({
                        title: 'Task Confirm',
                        desc:  "Please Login first"
                    });
                    vm.$router.push({name: 'login'});
               
                }
            });
        },

        jumpToQuestionnaire(url, state) {
            // let url = this.task.questionnaire_path;
            // let url = 'http://localhost:3000/uploads/questionnaire/69cc28649066e.json';          
            this.$router.push({name: 'questionnaire', params: {url: url, state: state}});
        }


    }
}
    

</script>

<style scoped>
div {
    # margin: 5px;
    text-align: left;
}

span, p {
    margin-top: 12px;
    margin-bottom: 8px;
    color: #515a6e;
    font-size :14px;
}

h2 {
    margin-top: 8px;
    margin-bottom: 8px;
}

h1 {
    color :#17233d;
}

.div-flex {
    display:flex;
}


.task-body {
    padding: 20px;
    position:relative;
    min-width: 1000px;
    overflow: hidden;
    background-color: #f8f8f9;
    display: flex;
}

.task-detail-body {
    width: 80%;
    text-align: left;
    
}

.detail-body {
    position:relative;
    margin-top: 10px;
    margin-bottom: 10px;
}

.div-taskInfo-item {
    margin-top: 30px;
    
}

.div-taskInfo-cell {
    width: 33%;
}

.span-time {
    margin-left: 5px;
}

.accepted-detail-body {
    border: 1px solid #dcdee2;
    border-radius: 5px;
    margin-top:20px;
    margin-bottom: 20px;
    padding: 10px;
}

.drawer-btn {
    position:relative;
    float:right;
}

.table-whole {
    position: relative;
    border: 1px solid #dcdee2;
    border-bottom: 0;
    border-right: 0;

}
.div-table-body {
    width:inherit;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    color: #515a6e;
    font-size: 12px;
    background-color: #fff;
}

.table-header th {
    height:40px;
    white-space: nowrap;
    overflow: hidden;
    background-color: #f8f8f9;
}

.table-header td, .table-body td{
    mid-width:0px;
    height:48px;
    box-sizing: border-box;
    text-align: left;
    text-overflow: ellipsis;
    vertical-align:middle;
    border-bottom: 1px solid #e8eaec;
}

.header-th {
    word-wrap:normal;
    vertical-align: middle;
    box-sizing: border-box;
    padding-left: 18px;
    padding-right: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
}

.span-score {
    position:relative;
    top: 2px;
}

.div-anchor-body {
    position: relative;
}
.div-anchor {
   position: fixed;
   margin-left: 50px;

}
.div-score {
    position: absolute;
    right:0px;
    top:0px;
}

.btn {
    margin-top: 15px;
   
}
</style>

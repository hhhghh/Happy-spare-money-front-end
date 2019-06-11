<template>
    <div class="task-body">
        <div class="content" >
            <div class="content-selector-block">
                <div class="div-selectors">
                    <div class="selector">
                        <span class="selector-span">任务类型</span>
                        <Select v-model="typeSelect" style="width:100px;margin-right:5px" @on-change="getAcceptTask(typeSelect,rangeSelect,stateSelect)">
                            <Option v-for="item in taskType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="selector">
                    <span class="selector-span">任务发布范围</span>
                        <Select v-model="rangeSelect" style="width:100px;margin-right:5px" @on-change="getAcceptTask(typeSelect,rangeSelect,stateSelect)">
                            <Option v-for="item in rangeType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="selector">
                    <span class="selector-span">任务状态</span>
                        <Select v-model="stateSelect" style="width:100px;margin-right:5px" @on-change="getAcceptTask(typeSelect,rangeSelect,stateSelect)">
                            <Option v-for="item in stateType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                </div>
                <div class="state-type-hint" style="display:flex">
                    <div class="div-box">
                        <div class="box green-state-box"></div>
                        <span>已完成</span>
                    </div>
                    <div class="div-box">
                        <div class="box yellow-state-box"></div>
                        <span>待审核</span>
                    </div>
                    <div class="div-box">
                        <div class="box blue-state-box"></div>
                        <span>正在做</span>
                    </div>
                </div>
            </div>
            <Divider></Divider>
            <div class="task-content">
                <div class="task-item" v-for="item in taskItems" v-bind:class="{ 'completed': isComplete(item.trs), 
                'completed-mouseenter':isEnter(item.task_id) && isComplete(item.trs), 
                'waiting': isWaiting(item.trs),
                'waiting-mouseenter':isEnter(item.task_id) && isWaiting(item.trs),
                'item-mouseenter': isEnter(item.task_id)}"
                @mouseenter="enterItemId = item.task_id" @mouseleave="enterItemId = ''" @click="jumpToTaskDetail(item.task_id)"
                v-show="isShow(stateSelect, item.trs)">
                    
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
                    <Avatar class="avatar" :src="item.user.avatar"></Avatar>
                
                </div>
            </div>
        </div>
    </div>
</template>

<script scoped>
export default {
    data() {
        return {
            username: null,
            taskType: [
                {
                    value: 'all',
                    label: '全部'
                },
                {
                    value: 1,
                    label: '问卷调查'
                },
                {
                    value: 2,
                    label: '跑腿'
                }
            ],
            rangeType: [
                {
                    value: 'all',
                    label: '全部'
                }
                
            ],
            stateType: [
                {
                    value: 'all',
                    label: '全部'
                },
                {
                    value: 0,
                    label: '正在做'
                },
                {
                    value: 1,
                    label: '等待核实'
                },
                {
                    value: 2,
                    label: '已完成'
                }
            ],
            typeSelect: 'all',
            rangeSelect: 'all',
            stateSelect:'all',
            enterItemId: '',
            taskItems: [
                {
                    id : 1,
                    title: 'xxx问卷调查',
                    endtime: '2019-05-01 23:00',
                    money: 1,
                    state: 0,
                    type: '问卷调查',
                    max_accepter_number: 2,
                    user: {
                        username: 'yao',
                        avatar: 'http://139.196.79.193:3000/awesomeface.png'
                    }
                },
                {
                    id: 2,
                    title: 'xxx取快递',
                    endtime: '2019-05-01 23:00',
                    money: 2,
                    type: '取快递',
                    state: 2,
                    max_accepter_number: 1,
                    user: {
                        username: 'yao',
                        avatar: 'http://139.196.79.193:3000/awesomeface.png'
                    }
                },
                {
                    id: 3,
                    title: 'xxx取快递',
                    endtime: '2019-05-01 23:00',
                    money: 2,
                    type: '取快递',
                    state: 1,
                    max_accepter_number: 1,
                    user: {
                        username: 'yao',
                        avatar: 'http://139.196.79.193:3000/awesomeface.png'
                    }
                }
            ],
          

        }


    },

    mounted() {    
        //http.get my release task
        //this.getReleaseTask(this.typeSelect, this.rangeSelect, this.stateSelect);
        this.getUserInfo();
    },

    methods: {
        isComplete(trs) {
            if (trs != null) {
                return trs[0].state == 2;
            }
            return false;
             
        },

        isWaiting(trs) {
             if (trs != null) {
                return trs[0].state == 1;
            }
            return false;
        },

        isEnter(id) {
            return id == this.enterItemId;
        },
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
                    vm.getGroup();
                    vm.getAcceptTask(vm.typeSelect, vm.rangeSelect, vm.stateSelect);
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
        getGroup() {
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
        //get Accept Task
        getAcceptTask(typeSelect, rangeSelect, stateSelect) {
            //http request get
            let vm = this;
            let url = '/api/v1/task/findByAccepter'


            //异步
            this.$axios.get(url, {
                params: {
                    type: typeSelect,
                    range: rangeSelect,
                    state: 'all',
                    username: vm.username
                }
            
            })
            .then(function(response) {
                vm.taskItems = [];
                let data = response.data;
                // console.log(data);
                if (data.code == 200) {
                    let taskItems = data.data;
                    for (let i = 0;i < taskItems.length;i ++) {
                        if (taskItems[i].type == 1) {
                            taskItems[i].type = '问卷调查';
                        } else if (taskItems[i].type == 2){
                            taskItems[i].type = '跑腿';
                        }        
                    }
                   
                    vm.taskItems = taskItems;
                    

                } 
                
                
            
            })
            .catch(function (error) {
                console.log('error');
            });
            

        },

        jumpToTaskDetail(id) {
            this.$router.push({path: `/MainPage/taskDetail/${id}`})
        },
        isShow(stateSelect, trs) {
            if (stateSelect != 'all' && trs != null) {

                return stateSelect == trs[0].state;
            }
            return true;
        }
    }

}

</script>


<style scoped>
div {
    text-align: left;
    
}


h2 {
   
}

.task-body {
    padding: 20px;
    position:relative;
    min-width: 960px;
    min-height: 200px;
    overflow: hidden;
    background-color: #f8f8f9;
   
    
}

.content-selector-block {
    position:relative;
    margin-bottom: 10px;
    padding-left: 10px;
}

.div-selectors {
    position:relative;
    display:flex;
}


.selector {
    position:relative;
    margin-right: 30px;
   
}

.selector-span {
    margin-right: 15px;
    
}


.state-type-hint {
    position: relative;
    top: 10px;
}

.div-box {
    display: flex;
    margin-top: 10px;
    margin-right: 10px;
}
.box {
    width:15px;
    height:15px;
    border-radius: 2px;
    margin-right: 5px;
    box-shadow: 2px 2px 2px #c5c8ce;
}

.green-state-box {
    background: #19ff6b;
    
   
}

.yellow-state-box {
    background: #ffcc00;
   
}

.blue-state-box {
    background: #5cadff;
}

.task-content {
    position: relative;
    width: 100%;
    min-width: 800px;
    height: 100%;
}


.task-item {
    margin: 20px;
    border: 1px solid #5cadff;
    box-shadow: 5px 5px 5px #5cadff;
    float: left;
    width:28%;
    height: 160px;
    position:relative;
}


.task-title{
    font-size: 24px;
    margin: 10px;
}

.task-intro {
    font-size: 18px;
    margin:10px;
}

.task-type {
    font-size: 14px;
    margin:10px;
}

.task-endtime {
    font-size: 14px;
    margin:10px;
}


.task-money {
    font-size: 12px;
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


.avatar {
    position: absolute;
    bottom: 0px;
    right:0px;
    margin:5px 5px 5px 5px;
    margin-right:10px;
}


.item-mouseenter {
    box-shadow: 3px 3px 5px #2b85e4;
}

.completed {
    border: 1px solid #19be6b;
    box-shadow: 5px 5px 5px #19ff6b;

}

.completed-mouseenter {
    box-shadow: 3px 3px 5px #19be6b;
}

.waiting {
    border: 1px solid #ffcc00;
    box-shadow: 5px 5px 5px #ffcc00;

}

.waiting-mouseenter {
    box-shadow: 3px 3px 5px #ff9900;
}



</style>

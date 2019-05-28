/* eslint-disable */
<template>
    <div class="task-body">
        <div class="content">
            <div class="content-selector-block">
                <div class="div-selectors" style="z-index:">
                    <div class="selector">
                        <span class="selector-span">任务类型</span>
                        <Select v-model="typeSelect" style="width:100px;margin-right:5px" @on-change="getTasks(typeSelect,rangeSelect)">
                            <Option v-for="item in taskType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="selector">
                    <span class="selector-span">任务发布范围</span>
                        <Select v-model="rangeSelect" style="width:100px;margin-right:5px" @on-change="getTasks(typeSelect,rangeSelect)">
                            <Option v-for="item in rangeType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <Divider></Divider>
            <div class="task-content">
                <div v-for="item in taskItems">
                    <div v-bind:class="{'task-card':true,'task-card-mouseenter': enterItemId == item.id, 'task-card-mouseleave':!(enterItemId == item.id)}"
                    v-on:mouseenter="enterItemId = item.id" v-on:mouseleave="enterItemId = ''" @click="jumpToTaskDetail(item.task_id)">
                        <div class="task-title">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="task-intro"> 
                            <span>{{item.introduction}} </span>
                        </div>
                        <div class="task-type">
                            <span style="font-weight: bold">任务类型:</span>
                            <span>{{item.type}} </span>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            username:'yao',
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
                },
    
            ],
            typeSelect: 'all',
            rangeSelect: 'all',
            enterItemId: '',

            taskItems: [
                {
                    task_id : 1,
                    title: 'xxx问卷调查',
                    introduction: '关于xxxxxxx的问卷调查',
                    money: 1,
                    state: 'doing',
                    type: '问卷调查',
                    max_accepter_number: 2,
                    user: {
                        username: 'yao',
                        avatar: 'http://139.196.79.193:3000/awesomeface.png'
                    }
                    
                },
                {
                    task_id: 2,
                    title: 'xxx取快递',
                    intro: '在xxxxxxxxx范围内取快递',
                    money: 2,
                    type: '取快递',
                    state: 'completed',
                    max_accepter_number: 1,
                    user: {
                        username: 'yao',
                        avatar: 'http://139.196.79.193:3000/awesomeface.png'
                    }
                },
                {
                    task_id: 3,
                    title: 'xxx取快递',
                    intro: '在xxxxxxxxx范围内取快递',
                    money: 2,
                    type: '取快递',
                    state: 'waiting',
                    max_accepter_number: 1,
                    user: {
                        username: 'yao',
                        avatar: 'http://139.196.79.193:3000/awesomeface.png'
                    }
                }
            ],

            
        };
    },

    mounted() {
        this.getGroup();
        this.getTasks(this.typeSelect, this.rangeSelect);
        // this.login();
    },

    methods: {
        login:function() {
            let vm = this;
            let url = '/api/v1/user/login';
            //异步
            this.$axios.post(url, {
                type : 0,
                username: 'hyx',
                password: '123456',
                headers: {
                   "Access-Control-Allow-credentials": true, 
                   "Access-Control-Allow-Origin": "*"
                }
               
            
            })
            .then(function(response) {
                console.log(response.headers);
            
            })
            .catch(function (error) {
                console.log('Fail to request');
            });
        },
        
        getGroup: function() {
            let vm = this;
            let url = '/api/v1/team/MemberName';
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

        getTasks: function(typeSelect, rangeSelect) {
            let vm = this;
            let url = '/api/v1/task';
            //异步
            this.$axios.get(url, {
               params: {
                   type: typeSelect,
                   range: rangeSelect,
                   username: vm.username
               }
            
            })
            .then(function(response) {
        
                let data = response.data;
                if (data.code == 200) {
                    let tasks = data.data;
                    vm.taskItems = [];
                    for (let i = 0;i < tasks.length;i ++) {
                         if (tasks[i].trs.length >= tasks[i].max_accepter_number)
                            continue;
                        if (tasks[i].type == 1) {
                            tasks[i].type = '问卷调查';
                        } else if (tasks[i].type == 2){
                            tasks[i].type = '跑腿';
                        }
                        vm.taskItems.push(tasks[i]);
                    }
                    //console.log(vm.taskItems[0].user.avatar);
                } 
            
            })
            .catch(function (error) {

            });

        },

        jumpToTaskDetail: function(id) {
            this.$router.push({path: `/MainPage/taskDetail/${id}`})
        }
    }


}
</script>

<style scoped>
.task-body {
    padding: 20px;
    position:relative;
    min-width: 800px;
    overflow: hidden;
    background-color: #f8f8f9;
    min-height: 200px;
}

.content {
    background:#f8f8f9;
    
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
    width:100%;
    
}

.task-card {
    position:relative;
    border: 1px solid #2d8cf0;
    height: 160px;
    width: 40%;
    margin: 30px;
    float: left;  
}

.task-card-mouseenter {
    box-shadow: 4px 4px 10px #2b85e4;
}

.task-card-mouseleave {
    box-shadow: 4px 4px 10px #5cadff;
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

.task-money {
    font-size: 12px;
    position:absolute;
    bottom: 0px;
    left: 0px;
    margin: 5px;
    margin-left:10px;
   
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
    margin:5px 5px 5px 5px;4
    margin-right:10px;
}
</style>
/* eslint-disable */
<template>
    <div class="task-body">
        <div class="content">
            <div class="content-selector-block">
                <div class="div-selectors" style="z-index:">
                    <div class="selector">
                        <span class="selector-span">任务类型</span>
                        <Select v-model="typeSelect" style="width:100px;margin-right:5px" @on-change="getTasks(typeSelect,rangeSelect,kindSelect)">
                            <Option v-for="item in taskType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <!--
                    <div class="selector">
                        <span class="selector-span">任务发布范围</span>
                        <Select v-model="rangeSelect" style="width:100px;margin-right:5px" @on-change="getTasks(typeSelect,rangeSelect)">
                            <OptionGroup label="全部">
                                <Option v-for="item in allRangeType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </OptionGroup>
                            <OptionGroup label="小组">
                                <Option v-for="item in groupRangeType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                             </OptionGroup>
                            <OptionGroup label="机构">
                                <Option v-for="item in organRangeType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                             </OptionGroup>
                            
                             
                        </Select>
                    </div>
                    -->
                    <Button type="primary" @click="isDrawerDisplay = true" >任务发布范围</Button>
                    <span style="margin-left: 10px; margin-top: 8px;">{{rangeLabel}}</span>
                </div>
            </div>
            <Divider></Divider>
            <div class="task-content">
                <div v-for="item in taskItems">
                    <div v-bind:class="{'task-card':true,'task-card-mouseenter': enterItemId == item.task_id, 'task-card-mouseleave':!(enterItemId == item.task_id)}"
                    v-on:mouseenter="enterItemId = item.task_id" v-on:mouseleave="enterItemId = ''" @click="jumpToTaskDetail(item.task_id)">
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

             <Drawer title="范围筛选" width="600" :closable="false" v-model="isDrawerDisplay">
                <div class="drawer-body">
                    <div class="div-action-btn">
                        <Button type="primary" @click="selectGroup('', 1)">公有</Button>
                        <Button type="primary" @click="showGroup = true;showDefault = false">小组</Button>
                        <Button type="primary" @click="showDefault = true;showGroup = false;">默认小组</Button>
                        <Button type="primary" @click="showGroup = false;showDefault = false ">机构</Button>
                    </div>
                    <div class="div-group-body" v-show="showGroup"> 
                        <div v-for="item in groupItems" @click="selectGroup(item.team_name, item.team_id)">
                            <div class="div-group">
                               <img class="logo" :src="item.logo"/>
                               <p>{{item.team_name}} -- {{item.leader}}</p>
                            </div>
                        </div>
                    
                    </div>
                    <div class="div-group-body" v-show="showDefault"> 
                        <div v-for="item in defaultGroupItems" @click="selectGroup(item.team_name, item.team_id)">
                            <div class="div-group">
                               <img class="logo" :src="item.logo"/>
                               <p>{{item.team_name}} -- {{item.leader}}</p>
                            </div>
                        </div>
                    
                    </div>
                    <div class="div-organization-body" v-show="!showGroup">
                        <div v-for="item in organsItems" @click="selectOrg(item.orgname)">
                            <div class="div-organization">
                               <img class="logo" :src="item.orgavatar"/>
                               <p>{{item.orgname}}</p>
                            </div>
                        </div>
                    </div>
                </div>

             </Drawer>        
        </div>
    </div>
</template>

<script scoped>
export default {
    inject: ['backTop'],
    data() {
        return {
            username: null,
            type: 0,
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
            allRangeType:[
                {
                    value: 1,
                    label: '公有'
                }
            ],
            groupRangeType: [
                
                
            ],
            typeSelect: 'all',
            rangeSelect: 1,
            rangeLabel: '公有',
            kindSelect:0,
            enterItemId: '',
            isDrawerDisplay: false,
            taskItems: [
               
            ],
            groupItems:[],
            defaultGroupItems:[],
            organsItems:[],
            showGroup:true,
            showDefault: false,
            
        };
    },

    mounted() {
        this.getUserInfo();
        this.backTop();
        this.sendToMainPage();
        
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
                    vm.getGroup(0);
                    vm.getGroup(1);
                    if (vm.type == 0) {
                        vm.getOrganization();
                    }
                    vm.getTasks(vm.typeSelect, vm.rangeSelect, vm.kindSelect);
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
        getGroup(type) {
            let vm = this;
            let url = '';
            if (vm.type == 0) {
                url = '/api/v1/team/MemberName';
            } else if (vm.type == 1) {
                url = '/api/v1/team/OrgName';
            }
             
            
            //异步
            this.$axios.get(url, {
               params: {
                   type: type,
                   member_username : vm.username
               }
            
            })
            .then(function(response) {
                let data = response.data;
                if (data.code == 200) {
                   
                    
                    let teamDatas = data.data;
                    for(let i = 0;i < teamDatas.length;i ++) {
                       
                        vm.groupRangeType.push({value: teamDatas[i].team_id, label: teamDatas[i].team_name + '--' + teamDatas[i].leader});
            
                    }
                    if (type == 0) {
                        vm.groupItems = teamDatas;
                    } else if (type == 1) {
                        vm.defaultGroupItems = teamDatas;
                    }
                   
                    // console.log(teamDatas);
                } 
            
            })
            .catch(function (error) {
                console.log('Fail to request');
            });
        },

         getOrganization() {
            let vm = this;
            let url = '/api/v1/user/getUsersFollowedOrganizationsList';
            //异步
            this.$axios.get(url, {
        
            
            })
            .then(function(response) {
        
                let data = response.data;
                if (data.code == 200) {
                   
                   let organDatas = data.data;
                   vm.organsItems = organDatas;
                } 
            
            })
            .catch(function (error) {

            });
        },


        getTasks(typeSelect, rangeSelect, kindSelect) {
             
            if (kindSelect == 0) {
                this.getTasksByGroup(typeSelect, rangeSelect);
            } else if (kindSelect == 1) {
                this.getTasksByOrg(typeSelect, rangeSelect)
            }

        },
        getTasksByGroup(typeSelect, rangeSelect) {
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
                    if(tasks.length == 0) {
                        vm.$Message.info('This range has no tasks');
                        
                    }
                    // console.log(tasks);
                    vm.taskItems = [];
                    for (let i = 0;i < tasks.length;i ++) {
                        // if (tasks[i].trs.length >= tasks[i].max_accepter_number)
                        //     continue;
                            
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
        getTasksByOrg(typeSelect, rangeSelect) {
            let vm = this;
            let url = '/api/v1/task/findByOrg';
            //异步
            this.$axios.get(url, {
               params: {
                //    type: typeSelect,
                //    range: rangeSelect,
                   orgname: rangeSelect
               }
            
            })
            .then(function(response) {
        
                let data = response.data;
                if (data.code == 200) {
                    let tasks = data.data;
                    console.log(tasks);
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

                    console.log(vm.taskItems);
                    //console.log(vm.taskItems[0].user.avatar);
                } 
            
            })
            .catch(function (error) {
                console.log("get by org error");
            });
        },
       
        jumpToTaskDetail(id) {
            this.$router.push({path: `/MainPage/taskDetail/${id}`})
        },
        sendToMainPage() {
            let data = {
                active: '1-1',
                open: '1'
            };
            this.$emit('menuSelected', data);
        },

        selectGroup(team_name, team_id){
            this.kindSelect = 0;
            this.rangeSelect = team_id;
            if (team_id == 1) {
                this.rangeLabel = '公有';
            } else {
                this.rangeLabel = '小组: ' + team_name;
            }
            this.getTasks(this.typeSelect, this.rangeSelect,this.kindSelect)
        },
        selectOrg(org_name){
            this.kindSelect = 1;
            this.rangeSelect = org_name;
            this.rangeLabel = '机构: ' + org_name;
            this.getTasks(this.typeSelect, this.rangeSelect,this.kindSelect)
        }

    },
    
    

}
</script>

<style scoped>
.task-body {
    padding: 20px;
    position:relative;
    min-width: 800px;
    min-height: 1000px;
    overflow: hidden;
    background-color: #f8f8f9;
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

.drawer-body {
    position:relative;
    width: 100%;
    
}

.div-group-body {
    position:relative;
    margin-top: 10px;
   
    
}

.div-group{
    position:relative;
    border: 1px solid #2d8cf0;
    box-shadow: 4px 4px 10px #2b85e4;
    height: 140px;
    width: 140px;
    margin: 20px;
    float: left;
    cursor: pointer;
    text-align: center;
    padding: 4px
}


.div-organization {
    position:relative;
    border: 1px solid #2d8cf0;
    box-shadow: 4px 4px 10px #19ff6b;
    height: 140px;
    width: 140px;
    margin: 20px;
    float: left;
    cursor: pointer;
    text-align: center;
    padding: 4px
}
.logo {
    width: 100px;
    height: 100px;
    position:relative;
    margin:0 auto;
    
}
</style>
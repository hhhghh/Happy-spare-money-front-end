<template>
    <div class="task-body">
        <div class="task-detail-body">
            <div class="drawer-btn">
                <Button @click="drawerDisplay = true" type="info" v-show="isReleaser">任务完成度</Button>
            </div>
            <h1 id="title" style="font-size: 28px">任务信息</h1>
            <div class="detail-body">
                <div class="detail">
                    <div class="div-taskInfo-item">
                        <h1>标题 </h1>
                        <p>{{ task.title }}</p>
                    </div>
                    <div class="div-taskInfo-item">
                        <h1 id="type">类型</h1>
                        <p>{{ task.type }} </p>
                    </div>
                    <div class="div-taskInfo-item">
                        <h1 id="intro">简介</h1>
                        <p>{{ task.intro }} </p>
                    </div>
                    <div class="tack-releaser div-taskInfo-item">
                        <h2 id="releaser">发布人</h2>
                        <Avatar> </Avatar>
                        <span>{{ task.releaser }} </span>
                    </div>
                    <div class="task-time div-taskInfo-item">
                        <h1 id="time">任务时间</h1>
                        <div class="task-starttime"> 
                            <span>开始时间: </span>
                            <Time :time="task.starttime" type="datetime" />
                        </div>
                        <div class="task-endtime"> 
                            <span>截止时间: </span>
                            <Time :time="task.endtime" type="datetime" />
                        </div>
                    </div>
                    <div class="div-taskInfo-item" style="display: flex;">
                        <div>
                            <h1 id="profit">奖赏</h1>
                            <span>{{task.money}}</span>
                            <Icon type="logo-yen" />
                        </div>
                        <div style="margin-left:250px" v-show="isReleaser">
                            <h1>数量</h1>
                            <span>{{task.number}}</span>
                        </div>
                        <div style="margin-left:250px" v-show="isReleaser">
                            <h1>接受评分要求</h1>
                            <Rate allow-half show-text v-model="task.score" disabled>
                                <span style="color: #f5a623;position:relative;bottom:2px;">{{ task.score }}</span>
                            </Rate>
                        </div>
                    </div>
                </div>
            </div>
            <div id="requirement" class="accepted-detail-body" v-show="isAcceptor">
                <div class="releaser-info">
                    <h2>联系方式</h2>
                    <p>手机：123456789</p>
                    <h2>具体地点</h2>
                    <p>明德666</p>
                </div>
            </div>
            <div style="margin-top: 20px;">
                <Button type="success" long v-show="!isAcceptor && !isReleaser" @click="acceptTask()">接受任务</Button>
                <Button type="error" long v-show="isReleaser || isAcceptor">取消任务</Button>
            </div>
        
       </div>
        <Drawer title="完成度" width="480" :closable="false" v-model="drawerDisplay">
           <div class="table-whole">
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
                                    <th  width="163">
                                        <div class="header-th">
                                            <span>State</span>
                                        </div>
                                    </th>
                                     <th  width="120">
                                        <div class="header-th">
                                            <span>Action</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            
                        </table>
                    </div>
                    <div class="table-body">
                        <table style="width: 470px;" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr v-for="item in completeRateData">
                                    <td  width="163">
                                        <div class="header-th">
                                            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"></Avatar>
                                            <strong>{{ item.username }}</strong>
                                        </div>
                                    </td>
                                    <td  width="163">
                                        <div class="header-th">
                                            <span>{{ item.state }}</span>
                                        </div>
                                    </td>
                                    <td width="120">
                                        <div class="header-th" >
                                            <Poptip placement="bottom-end">
                                                 <Button type="primary" size="small" :disabled="item.state != 'completed'">确认完成</Button>
                                                 <div class="div-evaluation" slot="content">
                                                    <span class="span-score">评分</span>
                                                    <Rate v-model="scoreValue"></Rate>
                                                    <Button type="info" size="small" @click="">确认</Button>
                                                 </div>
                                            </Poptip>
                                          
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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
    data () {
        return {
            isReleaser: true,     
            isAcceptor: true,      //control the show of accepter and cancel buttons
            drawerDisplay: false,
            scoreValue: 0,
            taskInfo:[],
            task: {
                title: 'xxxxxx问卷调查',
                intro: '可能会发生这样的情况：当一个道具在激活状态时，另一个道具与挡板发生了接触。在这种情况下我们有超过1个在当前PowerUps容器中处于激活状态的道具。然后，当这些道具中的一个被停用时，我们不应使其效果失效因为另一个相同类型的道具仍处于激活状态。出于这个原因，我们使用isOtherPowerUpActive检查是否有同类道具处于激活状态。只有当它返回false时，我们才停用这个道具的效果。这样，给定类型的道具的持续时间就可以延长至最近一次被激活后的持续时间。',
                money: 12,
                number: 10,
                releaser : 'Howlyao',
                state: 'waiting for being accepted',
                score: 3.5,
                type: 2,
                starttime:  (new Date()).getTime() - 86400 * 3 * 1000,
                endtime: (new Date()).getTime()
            },

           
            completeRateData: [
                {
                    username: 'Howlyao',
                    state: 'waiting'
                }, 
                
                {
                     username: 'User',
                    state: 'completed'
                }

            ]
        }
    },
    
    mounted() {
       this.getTaskDetail();
      
    },

    methods: {

        getTaskDetail:function() {
            var vm = this;
            var url = 'https://api.github.com/users/howlyao'
            //异步
            this.$axios.get(url, {
               
            
            })
            .then(function(response) {
                //console.log(response.data);
                vm.taskInfo = response.data;
                this.setCharactor(); 
            })
            .catch(function (error) {

            });

        },

        setCharactor: function() {
           var vm = this; 
           var inf = vm.taskInfo;
           if (inf.login == this.task.releaser) {
               isReleaser = true;
           } else {
               //http请求
               //找到登陆用户是否有接受过该任务
               //若有isAcceptor = true else isAcceptor = false
           }
        },

        acceptTask: function() {
            var vm = this;
            var username = 'user';
            var url = '';

            //添加接受者与任务的联系
            this.$axios.post(url, {
               user: username,
               taskid: taskInfo.id
            
            })
            .then(function(response) {
                console.log(reponse.data)
                //reload
            })
            .catch(function (error) {

            });
        },

        cancelTaskForAcceptor:function() {
            var vm = this;
            var username = 'user';
            var url = '';

            //删除接受者与任务的联系
            this.$axios.post(url, {
               user: username,
               taskid: taskInfo.id
            
            })
            .then(function(response) {
                console.log(reponse.data)
                //reload
            })
            .catch(function (error) {

            });
        },

        cancelTaskForAcceptor:function() {
            var vm = this;
            var username = 'user';
            var url = '';

            //删除任务
            this.$axios.post(url, {
               user: username,
               taskid: taskInfo.id
            
            })
            .then(function(response) {
                console.log(reponse.data)
                //reload
            })
            .catch(function (error) {

            });
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
   margin-top: 8px;
   margin-bottom: 8px;
   color: #515a6e;
}

h1 {
    color :#17233d;
}




.task-body {
    padding: 20px;
    position:relative;
    min-width: 960px;
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
</style>

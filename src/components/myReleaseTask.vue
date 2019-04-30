<template>
    <div class="task-body">
        <div class="content">
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
                        <span>正在做</span>
                    </div>
                    <div class="div-box">
                        <div class="box blue-state-box"></div>
                        <span>待审核</span>
                    </div>
                </div>
            </div>
            <Divider></Divider>
            <div class="task-content">
               <div class="task-item" v-for="item in taskItem" v-bind:class="{ 'completed': isComplete(item.state), 
                'completed-mouseenter':isEnter(item.id) && isComplete(item.state), 
                'waiting': isWaiting(item.state),
                'waiting-mouseenter':isEnter(item.id) && isWaiting(item.state),
                'item-mouseenter': isEnter(item.id)}"
                @mouseenter="enterItemId = item.id" @mouseleave="enterItemId = ''" @click="jumpToTaskDetail(item.id)">
                    <h2>{{item.title}}</h2>
                    <span>类型：{{item.type}} </span>
                    <div class="div-money">
                        <img class="coin" src="../assets/coin.jpg"/>
                        <span class="span-number">{{ item.money }}</span>
                    </div>
                    <div class="div-number">
                        <Icon type="ios-copy" size="18" />
                        <span>{{ item.number }}</span>
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
            taskType: [
                {
                    value: 'all',
                    label: '全部'
                },
                {
                    value: 'questionaire',
                    label: '问卷调查'
                },
                {
                    value: 'express',
                    label: '取快递'
                }
            ],
            rangeType: [
                {
                    value: 'all',
                    label: '全部'
                },
                {
                    value: 'group1',
                    label: '小组1'
                }
            ],
            stateType: [
                {
                    value: 'all',
                    label: '全部'
                },
                {
                    value: 'completed',
                    label: '已完成'
                },
                {
                    value: 'uncompleted',
                    label: '未完成'
                }
            ],
            typeSelect: 'all',
            rangeSelect: 'all',
            stateSelect:'all',
            enterItemId: '',
            taskItem: [
                {
                    id : 1,
                    title: 'xxxx问卷调查',
                    money: 1,
                    state: 'waiting',
                    type: '问卷调查',
                    number: 2
                },
                {
                    id: 2,
                    title: 'xxxx取快递',
                    money: 2,
                    state: 'completed',
                    type: '取快递',
                    number: 1
                },
                {
                    id: 3,
                    title: 'xxx取快递',
                    money: 2,
                    type: '取快递',
                    state: 'waiting',
                    number: 1
                }
            ]

        }


    },

    mounted() {
        //http.get my release task
        //this.getReleaseTask(this.typeSelect, this.rangeSelect, this.stateSelect);
    },

    methods: {
        isComplete: function(state) {
            return state == 'completed';
        },
        isWaiting: function (state) {
            return state == 'waiting';
        },
        isEnter: function(id) {
            return id == this.enterItemId;
        },
        getReleaseTask: function(type, range, state) {
            //http request get
            
            this.$Message.info(type);
            

        },
        jumpToTaskDetail: function(id) {
            this.$router.push({path: `/MainPage/taskDetail/${id}`})
        }
    }

}

</script>


<style scoped>
div {
    text-align: left;
}

.task-body {
    padding: 20px;
    position:relative;
    min-width: 960px;
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
    padding: 5px;
    border: 1px solid #5cadff;
    box-shadow: 5px 5px 5px #5cadff;
    float: left;
    width:28%;
    height: 100px;
    position: relative;
}

.div-money {
    position:absolute;
    bottom: 0px;
}
.span-number{
    position:relative;
    bottom: 5px;
}

.coin {
    width:20px;
    height:20px;

}

.div-number {
    margin: 5px;
    position: absolute;
    right:0px;
    bottom:0px;
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
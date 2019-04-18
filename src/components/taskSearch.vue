/* eslint-disable */




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
            </div>
            <Divider></Divider>
            <div class="task-content">
                <div v-for="item in items">
                    <div v-bind:class="{'task-card':true,'task-card-mouseenter': enterid == item.id, 'task-card-mouseleave':!(enterid == item.id)}"
                    v-on:mouseenter="enterid = item.id" v-on:mouseleave="enterid = 0" @click="getTaskItem(item.id)">
                        <div class="task-title">
                            <span>{{item.id}}</span>
                        </div>
                        <div class="task-simpleinfo"> 
                            <span>{{item.simpleinfo}} </span>
                        </div>
                        <div class="task-profit"> 
                            <span>{{item.profit}}</span>
                        </div>
                        <div class="task-detail">
                            <span>数量:{{item.count}}</span>
                            <span>发布人: {{item.releaser}}</span>
                        </div>
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
            taskList: [
                {
                    value: 'All',
                    label: '全部'
                },
                {
                    value: 'Questionaire',
                    label: '问卷调查'
                },
                {
                    value: 'Express',
                    label: '取快递'
                },
               
            ],

            rangeList: [
                {
                    value: 'All',
                    label: '全部'
                },
                {
                    value: 'Group1',
                    label: '小组1'
                },
            ],
            taskClass: '',
            range: '',
            enterid: 0,
            items: [
                {   
                    id: 1,
                    title: 'title1', 
                    simpleinfo: '简介',
                    profit: '10',
                    releaser: 'user1',
                    count: '10'
                },
                {id: 2,title:'title2'}
            ]
        };
    },
    methods: {
        getTaskItem(id_) {
            this.$router.push({
                name: '/MainPage/taskDetail',
                params: {
                id:id_
                }
            });

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

.task-simpleinfo {
    font-size: 18px;
    margin:10px;
}

.task-profit {
    font-size: 12px;
    position:absolute;
    bottom: 0px;
    left: 0px;
    margin: 10px;
   
}

.task-detail {
    position:absolute;
    right:0px;
    bottom:0px;
    margin:10px;

}
</style>
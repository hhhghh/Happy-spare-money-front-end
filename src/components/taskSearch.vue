/* eslint-disable */




<template>
    <div class="content-body">
        <div class="content">
            <div class="content-selector-block" >
                <div class="selector">
                    <span>任务类型</span>
                    <Select v-model="taskClass" style="width:100px" label="全部">
                        <Option v-for="item in taskList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="selector">
                    <span>任务发布范围</span>
                    <Select v-model="range" style="width:100px" label="全部">
                        <Option v-for="item in rangeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <Divider>Task</Divider>
            </div>
            <div class="task-content">
                <div v-for="item in items" v-bind:key="item.id">
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
span {
    margin:10px;
}



.content {
    background:#f8f8f9;
    padding:15px;
}
.content-body {
    background-color: #f8f8f9;
}
.selector {
    float:left;
    margin: 10px;
}

.content-selector-block {
    position:relative;
    z-index: 999;
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
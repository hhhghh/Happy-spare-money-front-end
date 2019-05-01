<style scoped>
.content-body {
    padding: 15px;
}
.task-header {
    position: relative;
    padding: 10px;
}

.input-style {
    margin-left:20px;
}


</style>


<template>
    <div class="content-body">
        <h1>任务发布</h1>
        <div class="task-header">
            <Form :label-width="60">
                <FormItem label="Title">
                    <Input  class="input-style" placeholder="Enter task title" clearable style="width: 70%" v-model="taskInfo.title"></Input>
                </FormItem>
                <FormItem label="SimpleInfo">
                    <Input  class="input-style" placeholder="Enter task title" type="textarea" :rows="4" style="width: 70%" v-model="taskInfo.simpleInfo"></Input>
                </FormItem>
               
                <FormItem label="Count">
                    <InputNumber class="input-style" :min="1" v-model="taskInfo.count" style="width: 20%;"></InputNumber>
                </FormItem> 
                <FormItem label="Profit">
                    <InputNumber class="input-style" :min="1" v-model="taskInfo.profit" style="width: 20%;"></InputNumber>
                   
                </FormItem>
    
                <FormItem label="Deadline">
                    <Row>
                        <Col span="8">
                            <DatePicker class="input-style" type="date" placeholder="Select date" style="width: 90%;" v-model="taskInfo.endtimeDate"></DatePicker>
                        </Col>
                        <Col span="1" style="text-align: center">-</Col>
                        <Col span="8">
                            <TimePicker class="input-style" type="time" placeholder="Select time" style="width: 90%;" v-model="taskInfo.endtimeTime"></TimePicker>
                        </Col>
                    </Row>
                </FormItem>
                <Row>
                    <Col span="8">
                        <FormItem label="Type">
                            <Select class="input-style" v-model="taskInfo.type" style="width:68%" label="问卷调查" >
                                <Option v-for="item in taskList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="Range">
                            <Select class="input-style" v-model="taskInfo.range" style="width:68%" label="全部" >
                                <Option v-for="item in rangeList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="Score">
                   <InputNumber class="input-style" :max="5" :min="0" :step="0.5" v-model="taskInfo.score"></InputNumber>
                </FormItem>

                <Divider></Divider>
                 <FormItem label="Requirement">
                    <Input  class="input-style" placeholder="Enter task title" type="textarea" :rows="10" style="width: 70%" v-model="taskInfo.requirement"></Input>
                </FormItem>
            </Form>
            
            
        </div>
        <div>
            <p>{{taskInfo.title}}</p>
            <p>{{taskInfo.simpleInfo}}</p>    
            <p>{{taskInfo.count}}</p>    
            <p>{{taskInfo.profit}}</p>    
            <p>{{taskInfo.type}}</p>    
            <p>{{taskInfo.range}}</p>  
            <p>{{taskInfo.endtimeDate}}</p>    
            <p>{{taskInfo.endtimeTime}}</p>    
            <p>{{taskInfo.score}}</p>  
            <p>{{taskInfo.requirement}}</p>      
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

             taskList: [
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

            taskInfo :{
                title: '',
                simpleInfo: '',
                count: 1,
                profit: 1,
                endtime: '',
                endtimeTime: '',
                endtimeDate: '',
                starttime: '',
                type: 'Questionaire',
                range: 'All',
                score: 0,
                requirement: '',
                
            }
        };
    }

}
</script>

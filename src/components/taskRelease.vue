<style scoped>
.content-body {
    padding: 15px;
    background-color: #f8f8f9;
}
.task-header {
    position: relative;
    padding: 10px;
}

.input-style {
    margin-left:10px;
}


</style>


<template>
    <div class="content-body">
        <h1>任务发布</h1>
        <div class="task-header">
            <Form :label-width="60">
                <FormItem label="Title">
                    <Input  class="input-style" placeholder="Enter task title" clearable style="width: 40%"></Input>
                </FormItem>
                <FormItem label="SimpleInfo">
                    <Input  class="input-style" placeholder="Enter task title" type="textarea" :rows="4" style="width: 40%"></Input>
                </FormItem>
                <FormItem label="Count">
                    <InputNumber class="input-style" :min="1"></InputNumber>
                </FormItem>
                <FormItem label="Profit">
                    <InputNumber class="input-style" :min="1"></InputNumber>
                    <Icon type="logo-usd" />
                </FormItem>
                <FormItem label="Deadline">
                    <Row>
                        <Col span="8">
                            <DatePicker class="input-style" type="date" placeholder="Select date"></DatePicker>
                        </Col>
                        <Col span="1" style="text-align: center">-</Col>
                        <Col span="8">
                            <TimePicker class="input-style" type="time" placeholder="Select time"></TimePicker>
                        </Col>
                    </Row>
                </FormItem>
                <Row>
                    <Col span="8">
                        <FormItem label="Class">
                            <Select class="input-style" v-model="taskClass" style="width:100px" label="问卷调查">
                                <Option v-for="item in taskList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="Range">
                            <Select class="input-style" v-model="range" style="width:100px" label="全部">
                                <Option v-for="item in rangeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>

            </Form>
            <Divider></Divider>
            <Form>
                 <FormItem label="Requirement">
                    <Input  class="input-style" placeholder="Enter task title" type="textarea" :rows="10" style="width: 70%"></Input>
                </FormItem>
            </Form>
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
            taskClass: '',
            range: ''
        };
    }

}
</script>

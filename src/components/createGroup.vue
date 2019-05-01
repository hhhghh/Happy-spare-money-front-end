/* eslint-disable */

<template>
    <div class="content-body">
        <div class="content"> 
            <div class="title">创建小组</div>

            <div class="main-content">
                <div class="basic-informations">
                    <Form :label-width="120" style="margin-top:20px">
                        <FormItem label="Name">
                            <Input v-model="group.team_name" class="input-style" placeholder="Enter Group Name" ></Input>
                        </FormItem>
                        <FormItem label="Description">
                            <Input v-model="group.description" class="input-style" placeholder="Enter Group Description" type="textarea" :rows="4"></Input>
                        </FormItem>
                        <FormItem label="Limit">
                            <RadioGroup v-model="group.limit" class="margin-left" vertical>
                                <Radio label=0 style="width:80px">允许所有人</Radio>
                                <Radio label=1 style="width:80px">需要审核</Radio>
                                <Radio label=2 style="width:80px">禁止所有人</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="Tags">
                            <CheckboxGroup v-model="group.teamlabels" class="margin-left">
                                <Checkbox label="Music"></Checkbox>
                                <Checkbox label="Dance"></Checkbox>
                                <Checkbox label="Sports"></Checkbox>
                                <Checkbox label="Study"></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem label="Invited Members">
                            <div class="div-flex" >
                                <Input v-model="currentInvitedMember" placeholder="Enter Invited Member's ID" class="input-style2"></Input>
                                <Button icon="md-add" @click="addInvitedMember">Add</Button>
                            </div>
                            <Row>
                                <Tag type="border" color="primary" class="margin-left" v-for="item in InvitedMemberList" :key="item" :name="item" closable @on-close="handleClose">用户{{ item }}</Tag>
                            </Row>
                        </FormItem>
                    </Form>
                </div>

                <div class="logo-content">
                    <div class="logo-title">Logo</div>
                    <div class="logo-block">
                        <img class="logo-image" id="logo" :src="logoUrl" alt="Group Logo">
                        <div class="upload-block">
                            <Upload
                                ref="upload"
                                :format="['jpg','jpeg','png']"
                                :before-upload="handleBeforeUpload"
                                type="drag"
                                action="https://sm.ms/api/upload"
                                style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="ios-camera" size="20"></Icon>
                                </div>
                            </Upload>
                        </div>
                    </div>
                </div>
            </div>

            <Button type="success" long class="button-create">CREATE</Button>
            
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            screenWidth: document.body.clientWidth,

            currentInvitedMember: '',

            InvitedMemberList: [],

            logoUrl: 'https://i.loli.net/2017/08/21/599a521472424.jpg',

            group: [
                {
                    team_name: '',
                    leader: '',
                    description: '',
                    logo: '',
                    limit: '',
                    teamlabels: [],
                    members: []
                }
            ],
        };
    },
    methods: {
        addInvitedMember() {
            if (this.currentInvitedMember !== '') {
                if (-1 == this.InvitedMemberList.indexOf(this.currentInvitedMember))
                    this.InvitedMemberList.push(this.currentInvitedMember);
            }
        },

        handleClose(event, name) {
            const index = this.InvitedMemberList.indexOf(name);
            this.InvitedMemberList.splice(index, 1);
        },
            
        handleBeforeUpload (file) {
            if (!typeof FileReader != 'undefined') {
                if (/^image\/\w+/.test(file.type)) {
                    let fr = new FileReader();
                    fr.readAsDataURL(file);

                    fr.onload = function(e) {
                        let logo = document.getElementById('logo');
                        logo.src = this.result;
                    }
                }
            }

            return false;
        }
    },
    mounted () {

    }

}
</script>

<style scoped>
span {
    margin:3px;
}

.content {
    background:#f8f8f9;
    padding:15px;
}

.title {
    margin: auto 15px;
    font-size: 18pt;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bolder;
    height: 30px;
    line-height: 30px;
}

.main-content {
    display: flex;
}

.input-style {
    margin-left: 10px;
    width: 90%;
}

.input-style2 {
    margin-right: 10px;
    flex: 1;
}

.margin-left {
    margin-left: 10px;
}

.button-create {
    bottom:10px;
}

.basic-informations {
    display: inline-block;
    width: 60%;
}

.div-flex {
    display: flex;
    margin-left: 10px;
    width: 90%;
}

.logo-content {
    display: inline-block;
    vertical-align: top;
    top: 0;
    height: 100%;
    flex: 1;
}

.logo-block {
    width: 200px;
    height: 200px;
    margin: auto;
    position: relative;
}

.logo-title {
    margin: auto;
    text-align: center;
    font-size: 15pt;
    width: 200px;
}

.logo-image {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.upload-block {
    text-align: center;
}

</style>
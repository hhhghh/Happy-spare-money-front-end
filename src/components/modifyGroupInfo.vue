/* eslint-disable */

<template>
    <div class="content-body">
        <div class="content"> 
            <div class="content-selector-block">
                <div style="margin-left: 15px;">
                    <Breadcrumb>
                        <BreadcrumbItem to="/MainPage/myGroup">我的小组</BreadcrumbItem>
                        <BreadcrumbItem :to="{name: 'groupDetail', params: {id: team_id, group: group}}">小组详情</BreadcrumbItem>
                        <BreadcrumbItem :to="{name: 'groupDetail', params: {id: team_id, group: group}}">{{group.team_name}}</BreadcrumbItem>
                        <BreadcrumbItem>修改资料</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>

            <Divider></Divider>

            <div class="main-content">
                <div class="basic-informations">
                    <Form :label-width="120" style="margin-top:20px">
                        <FormItem label="Name">
                            <Input v-model="group.team_name" class="input-style" placeholder="Enter Group Name" disabled></Input>
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
                            <Tag type="border" color="primary" class="tags" v-for="item in group.teamlabels" :key="item.label" :name="item.label">{{ item.label }}</Tag>
                            <CheckboxGroup class="margin-left">
                                <Checkbox label="Music"></Checkbox>
                                <Checkbox label="Dance"></Checkbox>
                                <Checkbox label="Sports"></Checkbox>
                                <Checkbox label="Study"></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                    </Form>
                </div>

                <div class="logo-content">
                    <div class="logo-title">Logo</div>
                    <div class="logo-block">
                        <img class="logo-image" id="logo" :src="group.logo" alt="Group Logo">
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

            <div class="modify-block">
                <Button type="success" long class="button-modify" @click="modifyInfo">MODIFY</Button>
            </div>

            
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            team_id: '',
            group: '',

            screenWidth: document.body.clientWidth,

            currentInvitedMember: '',

            InvitedMemberList: [],

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
        },

        modifyInfo() {
            console.log(this.group.limit)
            let logo = document.getElementById('logo');
            this.group.logo = logo.src;
            this.$router.push({name: 'groupDetail', params: {id: this.team_id, group: this.group}})
        }
    },
    mounted: function() {
        this.team_id = this.$route.params.id;
        this.group = this.$route.params.group;

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

.content-selector-block {
    position:relative;
    z-index: 999;
    margin: 10px;
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

.logo-image:hover {
    cursor: pointer;
}

.tags {
    margin-left: 10px;
}

.modify-block {
    text-align: center;
}

.upload-block {
    text-align: center;
}

</style>
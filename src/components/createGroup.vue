/* eslint-disable */

<template>
    <div class="content-body">
        <div class="content"> 
            <div class="title">创建小组</div>

            <div class="main-content">
                <div class="basic-informations">
                    <Form ref="group" :label-width="120" style="margin-top:20px" :model="group" :rules="ruleValidate">
                        <FormItem label="Name" prop="team_name">
                            <Input v-model="group.team_name" class="input-style" placeholder="Enter Group Name" ></Input>
                        </FormItem>
                        <FormItem label="Description" prop="description">
                            <Input v-model="group.description" class="input-style" placeholder="Enter Group Description" type="textarea" :rows="4"></Input>
                        </FormItem>
                        <FormItem label="Limit" prop="limit">
                            <RadioGroup v-model="group.limit" class="margin-left" vertical>
                                <Radio label=0 style="width:80px">允许所有人</Radio>
                                <Radio label=1 style="width:80px">需要审核</Radio>
                                <Radio label=2 style="width:80px">禁止所有人</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="Tags">
                            <div class="div-flex" >
                                <Cascader style="width: 90%; margin-right: 10px" :data="defaultLabels" v-model="currentTeamLabel" :render-format="cascaderFormat" trigger="hover"></Cascader>
                                <Button icon="md-add" @click="addTeamLabels">Add</Button>
                            </div>
                            <Row>
                                <Tag type="border" color="primary" class="margin-left" v-for="item in teamlabels" :key="item" :name="item" closable @on-close="handleCloseLabels">{{ item }}</Tag>
                            </Row>
                        </FormItem>
                        <FormItem label="Invited Members" prop="invMem">
                            <div class="div-flex" >
                                <Input v-model="currentInvitedMember" placeholder="Enter Invited Member's ID" class="input-style2"></Input>
                                <Button icon="md-add" @click="addInvitedMember">Add</Button>
                            </div>
                            <Row>
                                <Tag type="border" color="primary" class="margin-left" v-for="item in InvitedMemberList" :key="item.member_username" :name="item.member_username" closable @on-close="handleCloseMembers">用户{{ item.member_username }}</Tag>
                            </Row>
                        </FormItem>
                    </Form>
                </div>

                <div class="logo-content">
                    <div class="logo-title">Logo</div>
                    <div class="logo-block">
                        <img class="logo-image" id="logo" :src="logoUrl" alt="Group Logo">
                        <div class="upload-block">
                            <input type="file" id="upload-input" multiple="false" accept="image/*" @change="previewImage">
                            <label for="upload-input" class="upload-box">
                                <Icon type="ios-camera" size="20"></Icon>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <Button type="success" long class="button-create" @click="createGroup('group')">CREATE</Button>
            
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

            logoUrl: 'http://139.196.79.193:3000/awesomeface.png',

            group: {
                team_name: '',
                leader: '',
                logo: '',
                description: '',
                limit: '',
                teamlabels: [],
                members: []
            },

            logoFile: '',

            defaultLabels: [
                {
                    value: '体育',
                    label: '体育',
                    children: [
                        {
                            value: '足球',
                            label: '足球'
                        },
                        {
                            value: '网球',
                            label: '网球'
                        },
                        {
                            value: '乒乓球',
                            label: '乒乓球'
                        },
                        {
                            value: '篮球',
                            label: '篮球'
                        },
                        {
                            value: '排球',
                            label: '排球'
                        },
                        {
                            value: '游泳',
                            label: '游泳'
                        },
                        {
                            value: '太极',
                            label: '太极'
                        },
                        {
                            value: '龙舟',
                            label: '龙舟'
                        },
                        {
                            value: '棒球',
                            label: '棒球'
                        },
                        {
                            value: '跆拳道',
                            label: '跆拳道'
                        },
                        {
                            value: '健美操',
                            label: '健美操'
                        },
                    ]
                },
                {
                    value: '学习',
                    label: '学习',
                    children: [
                        {
                            value: '专业',
                            label: '专业',
                            children: [
                                {
                                    value: '计算机类',
                                    label: '计算机类'
                                },
                                {
                                    value: '软件工程',
                                    label: '软件工程'
                                },
                                {
                                    value: '其他专业',
                                    label: '其他专业'
                                },
                            ]
                        },
                        {
                            value: '课程',
                            label: '课程',
                            children: [
                                {
                                    value: '高等数学',
                                    label: '高等数学'
                                },
                                {
                                    value: '线性代数',
                                    label: '线性代数'
                                },
                                {
                                    value: '其他课程',
                                    label: '其他课程'
                                },
                            ]
                        },
                    ]
                },
                {
                    value: '兴趣',
                    label: '兴趣',
                    children: [
                        {
                            value: '舞蹈',
                            label: '舞蹈'
                        },
                        {
                            value: '音乐',
                            label: '音乐'
                        },
                        {
                            value: '钢琴',
                            label: '钢琴'
                        },
                        {
                            value: '吉他',
                            label: '吉他'
                        },
                    ]
                }
            ],

            currentTeamLabel: [],

            teamlabels: [],

            ruleValidate: {
                    team_name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur'}
                    ],
                    description: [
                        { required: true, message: 'The description cannot be empty', trigger: 'blur'}
                    ],
                    limit: [
                        { required: true, message: 'Please select the limit', trigger: 'change'}
                    ],
                    teamlabels: [
                        { required: false, type: 'array', min: 1, message: 'Choose at least one tag', trigger: 'change'}
                    ],
                    invMem: [
                        { required: false }
                    ]
                }
        };
    },
    methods: {
        addInvitedMember() {
            if (this.currentInvitedMember !== '') {
                let index = -1;
                for (let i = 0, len = this.InvitedMemberList.length; i < len; i++) {
                    if (this.currentInvitedMember == this.InvitedMemberList[i]['member_username']) {
                        index = i;
                        break;
                    }
                }
                if (-1 == index) this.InvitedMemberList.push({member_username: this.currentInvitedMember});
            }
        },

        handleCloseMembers(event, name) {
            let index = -1;
            for (let i = 0, len = this.InvitedMemberList.length; i < len; i++) {
                if (name == this.InvitedMemberList[i]['member_username']) {
                    index = i;
                    break;
                }
            }
            if (index != -1) this.InvitedMemberList.splice(index, 1);
        },

        addTeamLabels() {
            console.log(this.currentTeamLabel);
            let len;
            if ((len = this.currentTeamLabel.length) != 0) {
                if (-1 == this.teamlabels.indexOf(this.currentTeamLabel[len - 1])) {
                    this.teamlabels.push(this.currentTeamLabel[len - 1]);
                    this.currentTeamLabel = [];
                }
            }
        },

        handleCloseLabels(event, name) {
            console.log(name);
            const index = this.teamlabels.indexOf(name);
            console.log(index);
            this.teamlabels.splice(index, 1);
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

        previewImage(e) {
            this.logoFile = e.target.files[0];
            if (!typeof FileReader != 'undefine') {
                let fr = new FileReader();
                fr.readAsDataURL(this.logoFile);
                fr.onload = (e) => {
                    this.logoUrl = fr.result;
                }
            }
        },

        uploadLogoImage() {
            let form = new FormData();
            form.append('file', this.logoFile);
            let p = new Promise((resolve, reject) => {
                this.$axios.post('/file/TeamLogo', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    console.log(res.data);
                    resolve(res.data.data);
                }).catch((err) => {
                    reject(err);
                })
            })

            return p;
        },

        uploadGroupInfo(logoUrl) {
            this.group.leader = "hyx";
            this.group.logo = logoUrl;
            this.group.members.push({member_username: this.group.leader});
            for (let i = 0, len = this.InvitedMemberList.length; i < len; i++) {
                this.group.members.push(this.InvitedMemberList[i]);
            }
            let len = this.teamlabels.length
            for (let i = 0; i < len; i++) {
                this.group.teamlabels.push({label: this.teamlabels[i]});
            }
            console.log(this.group);

            let p = new Promise((resolve, reject) => {
                this.$axios.post('/team', this.group)
                    .then(function(res) {
                        resolve(res.data);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            })

            return p;
        },

        createGroup(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log('Begin to upload');
                    
                    if (this.logoFile != '') {
                        this.uploadLogoImage()
                            .then((data) => {
                                return this.uploadGroupInfo('http://' + data.imgUrl);
                            })
                            .then((data) => {
                                console.log(data);
                                console.log('Create a new group successfully');
                                this.$router.push({name: 'groupDetail', params: {id: data.data.team_id}});
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    } else {
                        this.uploadGroupInfo(this.logoUrl)
                            .then((data) => {
                                console.log(data);
                                console.log('Create a new group successfully');
                                this.$router.push({name: 'groupDetail', params: {id: data.data.team_id}});
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                    
                } else {
                    this.$message.error('Fail!');
                }
            })
        },

        cascaderFormat(labels, selectedData) {
            const index = labels.length - 1;
            return labels[index];
        },
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
    margin: 10px 0;
}

.upload-block {
    text-align: center;
}

.upload-box {
    width: 58px;
    height: 58px;
    line-height: 58px;
    border: 1px dashed #dcdee2;
    border-radius: 5px;
    display: inline-block;
    background: #ffffff;
    cursor: pointer;
}

.upload-box:hover {
    border-color: #2d8cf0;
}

#upload-input {
    display: none;
}

</style>
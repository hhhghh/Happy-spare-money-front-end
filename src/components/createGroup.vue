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
                        <FormItem label="Tags" prop="teamlabels">
                            <CheckboxGroup class="margin-left" v-model="group.teamlabels">
                                <Checkbox label="Music"></Checkbox>
                                <Checkbox label="Dance"></Checkbox>
                                <Checkbox label="Sports"></Checkbox>
                                <Checkbox label="Study"></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem label="Tags2">
                            <Cascader class="margin-left" style="width: 90%" :data="defaultLabels" v-model="teamlabels" :render-format="cascaderFormat" trigger="hover"></Cascader>
                        </FormItem>
                        <FormItem label="Invited Members" prop="invMem">
                            <div class="div-flex" >
                                <Input v-model="currentInvitedMember" placeholder="Enter Invited Member's ID" class="input-style2"></Input>
                                <Button icon="md-add" @click="addInvitedMember">Add</Button>
                            </div>
                            <Row>
                                <Tag type="border" color="primary" class="margin-left" v-for="item in InvitedMemberList" :key="item.member_username" :name="item.member_username" closable @on-close="handleClose">用户{{ item.member_username }}</Tag>
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

            logoUrl: 'https://i.loli.net/2017/08/21/599a521472424.jpg',

            group: {
                team_name: '',
                leader: '',
                logo: '',
                description: '',
                limit: '',
                teamlabels: [],
                members: []
            },

            defaultLabels: [
                {
                    value: 'sports',
                    label: '体育',
                    children: [
                        {
                            value: 'football',
                            label: '足球'
                        },
                        {
                            value: 'tennis',
                            label: '网球'
                        },
                        {
                            value: 'tabeltennis',
                            label: '乒乓球'
                        },
                        {
                            value: 'basketball',
                            label: '篮球'
                        },
                        {
                            value: 'volleyball',
                            label: '排球'
                        },
                        {
                            value: 'swimming',
                            label: '游泳'
                        },
                        {
                            value: 'taiji',
                            label: '太极'
                        },
                        {
                            value: 'dragonboat',
                            label: '龙舟'
                        },
                        {
                            value: 'baseball',
                            label: '棒球'
                        },
                        {
                            value: 'taekwondo',
                            label: '跆拳道'
                        },
                        {
                            value: 'aerobics',
                            label: '健美操'
                        },
                    ]
                },
                {
                    value: 'study',
                    label: '学习',
                    children: [
                        {
                            value: 'major',
                            label: '专业',
                            children: [
                                {
                                    value: 'computer',
                                    label: '计算机类'
                                },
                                {
                                    value: 'softwareengine',
                                    label: '软件工程'
                                },
                                {
                                    value: 'othermajor',
                                    label: '其他专业'
                                },
                            ]
                        },
                        {
                            value: 'curriculum',
                            label: '课程',
                            children: [
                                {
                                    value: 'highermathematics',
                                    label: '高等数学'
                                },
                                {
                                    value: 'linearalgebra',
                                    label: '线性代数'
                                },
                                {
                                    value: 'othercurriculum',
                                    label: '其他课程'
                                },
                            ]
                        },
                    ]
                },
                {
                    value: 'interest',
                    label: '兴趣',
                    children: [
                        {
                            value: 'dance',
                            label: '舞蹈'
                        },
                        {
                            value: 'music',
                            label: '音乐'
                        },
                        {
                            value: 'piano',
                            label: '钢琴'
                        },
                        {
                            value: 'guitar',
                            label: '吉他'
                        },
                    ]
                }
            ],

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
                        { required: true, type: 'array', min: 1, message: 'Choose at least one tag', trigger: 'change'}
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
                if (-1 == this.InvitedMemberList.indexOf(this.currentInvitedMember))
                    //this.InvitedMemberList.push(this.currentInvitedMember);
                    this.InvitedMemberList.push({member_username: this.currentInvitedMember});
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

        createGroup(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log('create success');
                    this.group.leader = "hyx";
                    this.group.members.push({member_username: 'hyx'});
                    for (let i = 0, len = this.InvitedMemberList.length; i < len; i++) {
                        this.group.members.push(this.InvitedMemberList[i]);
                    }
                    let len = this.group.teamlabels.length
                    for (let i = 0; i < len; i++) {
                        this.group.teamlabels.push({label: this.group.teamlabels[i]});
                    }
                    for (let i = 0; i < len; i++) {
                        this.group.teamlabels.shift();
                    }
                    console.log(this.group);
                    
                    this.$axios.post('/team', this.group)
                        .then(function(res) {
                            console.log(res.data);
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
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
}

.upload-block {
    text-align: center;
}

</style>
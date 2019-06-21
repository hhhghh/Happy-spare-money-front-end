/* eslint-disable */

<template>
    <div class="content-body">
        <div class="content"> 
            <div class="title">创建小组</div>

            <div class="main-content">
                <div class="basic-informations">
                    <Form ref="group" :label-width="120" style="margin-top:20px" :model="group" :rules="ruleValidate">
                        <FormItem label="小组名字" prop="team_name">
                            <Input v-model="group.team_name" class="input-style" placeholder="请输入组名" ></Input>
                        </FormItem>
                        <FormItem label="描述" prop="description">
                            <Input v-model="group.description" class="input-style" placeholder="请输入小组描述" type="textarea" :rows="4"></Input>
                        </FormItem>
                        <FormItem label="进组权限" prop="limit">
                            <RadioGroup v-model="group.limit" class="margin-left" vertical>
                                <Radio label=0 style="width:80px">允许所有人</Radio>
                                <Radio label=1 style="width:80px">需要审核</Radio>
                                <Radio label=2 style="width:80px">禁止所有人</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="小组标签">
                            <div class="div-flex" >
                                <Cascader 
                                    style="width: 100%;" 
                                    :data="defaultLabels" 
                                    v-model="currentTeamLabel" 
                                    :render-format="cascaderFormat" 
                                    trigger="hover" 
                                    @on-change="addTeamLabels">
                                </Cascader>
                                <!-- <Button icon="md-add" @click="addTeamLabels">添加</Button> -->
                            </div>
                            <Row>
                                <Tag type="border" color="primary" class="margin-left" v-for="item in teamlabels" :key="item" :name="item" closable @on-close="handleCloseLabels">{{ item }}</Tag>
                            </Row>
                        </FormItem>
                        <FormItem label="邀请成员" prop="invMem">
                            <div class="div-flex" >
                                <Input v-model="currentInvitedMember" placeholder="请输入要邀请的用户ID" class="input-style2"></Input>
                                <Button icon="md-add" @click="addInvitedMember">添加</Button>
                            </div>
                            <Row>
                                <Tag type="border" color="primary" class="margin-left" v-for="item in InvitedMemberList" :key="item.member_username" :name="item.member_username" closable @on-close="handleCloseMembers">用户{{ item.member_username }}</Tag>
                            </Row>
                        </FormItem>
                    </Form>
                </div>

                <div class="logo-content">
                    <div class="logo-title">小组头像</div>
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

            <Button type="success" long class="button-create" @click="createGroup('group')">创建</Button>
            
        </div>
    </div>
</template>

<script>
export default {
    props: ['userInfo'],
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
            logoBlob: '',

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
                                    value: '法学',
                                    label: '法学'
                                },
                                {
                                    value: '经济学',
                                    label: '经济学'
                                },
                                {
                                    value: '数学',
                                    label: '数学'
                                },
                                {
                                    value: '物理',
                                    label: '物理'
                                },
                                {
                                    value: '工商管理',
                                    label: '工商管理'
                                },
                                {
                                    value: '临床医学',
                                    label: '临床医学'
                                },
                                {
                                    value: '传播学',
                                    label: '传播学'
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
                                    value: '大学物理',
                                    label: '大学物理'
                                },
                                {
                                    value: '大学英语',
                                    label: '大学英语'
                                },
                                {
                                    value: '程序设计',
                                    label: '程序设计'
                                },
                                {
                                    value: '数据结构与算法',
                                    label: '数据结构与算法'
                                },
                                {
                                    value: '计算机组成与原理',
                                    label: '计算机组成与原理'
                                },
                                {
                                    value: '计算机网络',
                                    label: '计算机网络'
                                },
                                {
                                    value: '公选',
                                    label: '公选'
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
                        {
                            value: '轮滑',
                            label: '轮滑'
                        },
                        {
                            value: '定向越野',
                            label: '定向越野'
                        },
                        {
                            value: '飞镖',
                            label: '飞镖'
                        },
                        {
                            value: '电竞',
                            label: '电竞'
                        },
                        {
                            value: '象棋',
                            label: '象棋'
                        },
                        {
                            value: '滑板',
                            label: '滑板'
                        },
                        {
                            value: '自行车',
                            label: '自行车'
                        },
                        {
                            value: '夜跑',
                            label: '夜跑'
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

        addTeamLabels(value, selectedData) {
            let len;
            if ((len = selectedData.length) != 0) {
                if (-1 == this.teamlabels.indexOf(selectedData[len - 1])) {
                    this.teamlabels.push(selectedData[len - 1].value);
                }
            }
        },

        handleCloseLabels(event, name) {
            const index = this.teamlabels.indexOf(name);
            this.teamlabels.splice(index, 1);
        },

        previewImage(e) {
            this.logoFile = e.target.files[0];
            if (!typeof FileReader != 'undefine') {
                let fr = new FileReader();
                fr.readAsDataURL(this.logoFile);
                fr.onload = (e) => {
                    this.logoUrl = fr.result;
                    let result = fr.result;
                    let img = new Image();
                    img.src = result;

                    img.onload = (e) => {
                        let data = this.compress(img);
                        this.imgUrl = result;
                        this.logoBlob = this.dataURItoBlob(data);
                    }
                }
            }
        },

        compress(img) {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let initSize = img.src.length;
            let width = img.width;
            let height = img.height;
            canvas.width = width;
            canvas.height = height;
            // 铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);

            //进行最小压缩
            let ndata = canvas.toDataURL("image/jpeg", 0.1);
            return ndata;
        },
        
        dataURItoBlob(base64Data) {
            var byteString;
            if (base64Data.split(",")[0].indexOf("base64") >= 0)
                byteString = atob(base64Data.split(",")[1]);
            else byteString = unescape(base64Data.split(",")[1]);
            var mimeString = base64Data
                .split(",")[0]
                .split(":")[1]
                .split(";")[0];
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], { type: mimeString });
        },

        uploadLogoImage() {
            let form = new FormData();
            form.append('file', this.logoBlob);
            let p = new Promise((resolve, reject) => {
                this.$axios.post('/api/v1/file/TeamLogo', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    resolve(res.data.data);
                }).catch((err) => {
                    reject(err);
                })
            })

            return p;
        },

        uploadGroupInfo(logoUrl) {
            this.group.leader = this.userInfo.username;
            this.group.logo = logoUrl;
            this.group.members = [];
            this.group.teamlabels = [];
            this.group.members.push({member_username: this.group.leader});
            this.addInvitedMember();
            for (let i = 0, len = this.InvitedMemberList.length; i < len; i++) {
                this.group.members.push(this.InvitedMemberList[i]);
            }
            let len = this.teamlabels.length
            for (let i = 0; i < len; i++) {
                this.group.teamlabels.push({label: this.teamlabels[i]});
            }

            let p = new Promise((resolve, reject) => {
                this.$axios.post('/api/v1/team', this.group)
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
                    if (this.logoFile != '') {
                        this.uploadLogoImage()
                            .then((data) => {
                                return this.uploadGroupInfo(data.imgUrl);
                            })
                            .then((data) => {
                                if (data.code == 200) {
                                    this.$Modal.info({
                                        title: '提示',
                                        content: '修改小组信息成功'
                                    });
                                    this.$router.push({name: 'groupDetail', params: {id: data.data.team_id}});
                                } else if (data.code == 213) {
                                    this.$Modal.error({
                                        title: '错误',
                                        content: '该小组不存在'
                                    });
                                }
                            })
                            .catch((err) => {
                                if (err.response.status == 401) {
                                    this.$router.push({name: 'login'});
                                    this.$Message.error('请登录');
                                }
                            })
                    } else {
                        this.uploadGroupInfo(this.logoUrl)
                            .then((data) => {
                                if (data.code == 200) {
                                    this.$Modal.info({
                                        title: '提示',
                                        content: '修改小组信息成功'
                                    });
                                    this.$router.push({name: 'groupDetail', params: {id: data.data.team_id}});
                                } else if (data.code == 213) {
                                    this.$Modal.error({
                                        title: '错误',
                                        content: '该小组不存在'
                                    });
                                }
                            })
                            .catch((err) => {
                                if (err.response.status == 401) {
                                    this.$router.push({name: 'login'});
                                    this.$Message.error('请登录');
                                }
                            })
                    }   
                }
            })
        },

        cascaderFormat(labels, selectedData) {
            const index = labels.length - 1;
            return labels[index];
        },

        sendToMainPage() {
            let data = {
                active: '2-3',
                open: '2'
            };
            this.$emit('menuSelected', data);
        },

        judge() {
            if (this.userInfo.type == 1) {
                this.$router.push({name:'orgGroupDetail', params: {name: this.userInfo.username}});
            }
        }
    },
    mounted () {
        this.sendToMainPage();
        this.judge();
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
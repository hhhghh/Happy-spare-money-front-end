/* eslint-disable */

<template>
    <div class="content-body">
        <div class="content"> 
            <div class="content-selector-block">
                <div style="margin-left: 15px;">
                    <Breadcrumb>
                        <BreadcrumbItem to="/MainPage/myGroup">我的小组</BreadcrumbItem>
                        <BreadcrumbItem :to="{name: 'groupDetail', params: {id: team_id, group: group}}">小组详情</BreadcrumbItem>
                        <BreadcrumbItem>{{group.team_name}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>

            <Divider></Divider>

            <div class="main-content">
                <div class="left-content">
                    <div class="logo-block">
                        <img class="logo-image" id="logo" :src="group.logo" alt="Group Logo">
                    </div>
                    <div class="group-name">{{group.team_name}}</div>

                    <div class="description-block">
                        <div class="property">Description: </div>
                        <div class="inline-block description">
                            <span class="span">{{group.description}}</span>
                        </div>
                    </div>
                    <div class="leader-block">
                        <div class="property">Leader: </div>
                        <div class="inline-block">{{group.leader}}</div>
                    </div>
                    <div class="limit-block">
                        <div class="property">Limit: </div>
                        <div class="inline-block">{{group.limit == 0 ? '允许所有人' : (group.limit == 1 ? '需要审核' : '禁止所有人')}}</div>
                    </div>
                    <div class="createAt-block">
                        <div class="property">Create Time: </div>
                        <div class="inline-block">{{group.createdAt}}</div>
                    </div>
                    <div class="tags-block">
                        <div class="property">Team Labels: </div>
                        <div class="tags-list">
                            <Tag type="dot" color="primary" class="tags" v-for="item in group.teamlabels" :key="item.label" :name="item.label">{{ item.label }}</Tag>
                        </div>
                    </div>

                    <div class="modify-info">
                        <Button class="button-modify" type="info" long :to="{name: 'modifyGroupInfo', params: {id: team_id, group: group}}">修改资料</Button>
                    </div>
                </div>


                <div class="middle-content">
                    <!-- <div class="description-block">
                        <div class="property">Description</div>
                        <div class="description">
                            <span class="span">{{group.description}}</span>
                        </div>
                    </div>
                    <div class="limit-block">
                        <div class="property">Limit: </div>
                        <div class="limit">{{group.limit == 0 ? '允许所有人' : (group.limit == 1 ? '需要审核' : '禁止所有人')}}</div>
                    </div>
                    <div class="createAt-block">
                        <div class="property">Create Time: </div>
                        <div class="createAt">{{group.createdAt}}</div>
                    </div>
                    <div class="tags-block">
                        <div class="property">Team Labels: </div>
                        <div class="tags-list">
                            <Tag type="dot" color="primary" class="tags" v-for="item in group.teamlabels" :key="item.label" :name="item.label">{{ item.label }}</Tag>
                        </div>
                    </div> -->
                    <div class="group-task-block">
                        <div class="group-task-title">
                            <span>组内发布的任务</span>
                        </div>
                        <div class="group-task-list">
                            <div v-for="item in defaultTaskList">
                                <div v-bind:class="{'task-card':true,'task-card-mouseenter': enterid == item.task_id, 'task-card-mouseleave':!(enterid == item.task_id)}"
                                v-on:mouseenter="enterid = item.task_id" v-on:mouseleave="enterid = 0" @click="getTaskItem(item.task_id)">
                                    <div class="task-title">
                                        <span>{{item.title}}</span>
                                    </div>
                                    <div class="task-simpleinfo"> 
                                        <span>{{item.introduction}} </span>
                                    </div>
                                    <div class="task-profit"> 
                                        <span>{{item.money}}</span>
                                    </div>
                                    <div class="task-detail">
                                        <span>数量:{{item.max_accepter_numbert}}</span>
                                        <span>发布人: {{item.publisher}}</span>
                                    </div>

                                    <Drawer 
                                        width="30" 
                                        :mask-closable="false" 
                                        :closable="false" 
                                        :transfer="false" 
                                        :inner="true" 
                                        :scrollable="false"
                                        :value="showTaskDrawer == item.task_id"
                                    >
                                        <div>
                                            <Button class="drawer-button" type="primary" @click="jumpToTaskDetail(item.task_id)">任务详情</Button>
                                            <Button class="drawer-button" type="error" @click="blacklist(item.task_id)">拉黑</Button>
                                        </div>
                                    </Drawer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="right-content">

                    <Tabs value="name1">
                        <TabPane label="成员列表" name="name1">
                            <div class="member-list">
                                <Scroll :on-reach-bottom="handleReachBottom" height="250">
                                    <div class="member-item" v-for="item in memberList" v-bind:key="item.username">
                                        <div class="profile">
                                            <Avatar :src="item.profile" size="small"/>
                                        </div>
                                        <div class="member-username">
                                            <span class="username-span">{{item.username}}</span>
                                        </div>
                                        <Button :class="{'hidden': !isLeader}" class="button-blacklist" @click="dislodge(item.username)">移除</Button>
                                        <Button class="button-blacklist" @click="blacklist(item.username)">拉黑</Button>
                                    </div>
                                </Scroll>
                                <div class="withdraw">
                                    <Button class="invite-button" type="dashed" long icon="ios-add" @click="showDrawer=true">Invite members</Button>
                                    <Button v-bind:class="{'withdraw-button': true, 'hidden': !isLeader}" type="primary" long @click="showTransferDrawer=true; selectMember=''">转让该小组</Button>
                                </div>
                                <Drawer 
                                    title="Invite users" 
                                    v-model="showDrawer" 
                                    width="100"
                                    :mask-closable="false"
                                    :transfer="false"
                                    :inner="true"
                                >
                                    <Form label-position="top">
                                        <FormItem label="Invited Members">
                                            <div class="div-flex" >
                                                <Input v-model="currentInvitedMember" placeholder="Enter Invited Member's ID" style="margin: 5px 0px"></Input>
                                                <Tag type="border" color="primary" class="margin-left" v-for="item in inviteList" :key="item" :name="item" closable @on-close="handleClose">用户{{ item }}</Tag>
                                            </div>
                                            <Row>
                                                <Button type="dashed" long icon="md-add" @click="addInvitedMember">Add</Button>
                                            </Row>
                                        </FormItem>
                                    </Form>
                                    <div class="invite-complete">
                                        <Button type="success" long @click="inviteMembersComplete">完成添加</Button>
                                    </div>
                                </Drawer>

                                <Drawer 
                                    title="Choose member" 
                                    v-model="showTransferDrawer" 
                                    width="100"
                                    :mask-closable="false"
                                    :transfer="false"
                                    :inner="true"
                                >
                                    <div v-for="item in memberList" v-bind:key="item.username">
                                        <div
                                            v-bind:class="{
                                                'member-item':true, 
                                                'user-item-mouseenter': enterUser == item.username && !(selectMember == item.username), 
                                                'user-item-mouseleave': !(enterUser == item.username) && !(selectMember == item.username),
                                                'user-item-selected': selectMember == item.username
                                                }"
                                            v-on:mouseenter="enterUser = item.username" 
                                            v-on:mouseleave="enterUser = ''" 
                                            @click="selectMember = item.username">
                                            <div class="profile">
                                                <Avatar :src="item.profile" size="small"/>
                                            </div>
                                            <div class="member-username">
                                                <span class="username-span">{{item.username}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="transfer-complete">
                                        <Button type="success" long @click="transferMembersComplete(selectMember)">确认转让</Button>
                                    </div>
                                </Drawer>

                            </div>
                        </TabPane>
                        <TabPane label="机构列表" name="name2">
                            <div class="member-list">
                                <Scroll :on-reach-bottom="handleReachBottom" height="330">
                                    <div class="member-item" v-for="item in memberList" v-bind:key="item.username">
                                        <div class="profile">
                                            <Avatar :src="item.profile" size="small"/>
                                        </div>
                                        <div class="member-username">
                                            <span class="username-span">{{item.username}}</span>
                                        </div>
                                        <Button :class="{'hidden': !isLeader}" class="button-blacklist" @click="dislodge(item.username)">移除</Button>
                                    </div>
                                </Scroll>
                            </div>
                        </TabPane>
                    </Tabs>
                    <Button v-bind:class="{'withdraw-button': true, 'hidden': isLeader}" type="error" long @click="withdrawGroup">退出该小组</Button>
                    <Button v-bind:class="{'withdraw-button': true, 'hidden': !isLeader}" type="error" long @click="dissolveGroup">解散该小组</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            team_id: '',
            
            groupList: [],
            group: {
                team_name: '',
                leader: '',
                logo: '',
                description: '',
                limit: '',
                teamlabels: [],
                members: []
            },  

            enterid: 0,
            enterUser: '',

            isLeader: true,

            showDrawer: false,
            showTransferDrawer: false,

            defaultMemberList: [
                {
                    username: 'hyx',
                    profile: 'http://b-ssl.duitang.com/uploads/item/201808/25/20180825233334_echth.jpeg'
                },
                {
                    username: 'hzhh',
                    profile: 'http://www.agri35.com/UploadFiles/img_1_579671978_1166151183_26.jpg'
                },
                {
                    username: 'HeChX',
                    profile: 'http://img.52z.com/upload/news/image/20180926/20180926115213_80873.jpg'
                },
                {
                    username: 'Howlyao',
                    profile: 'http://tx.haiqq.com/uploads/allimg/170507/0341262926-2.jpg'
                },
                {
                    username: 'GZQ',
                    profile: 'http://tx.haiqq.com/uploads/allimg/170426/095911JJ-9.jpg'
                },
                {
                    username: 'Huang-Junjie',
                    profile: 'http://image.biaobaiju.com/uploads/20180928/16/1538124093-ItGcboXyAe.jpg'
                },
            ],

            defaultTaskList: [
                {   
                    task_id: 1,
                    title: 'title1', 
                    introduction: '简介',
                    money: '10',
                    publisher: 'user1',
                    state: 'processing',
                    max_accepter_number: '10',
                    type: 2,
                    score: 4,
                    content: 'test'
                },
                {   
                    task_id: 2,
                    title: 'title2', 
                    introduction: '简介',
                    money: '10',
                    publisher: 'user1',
                    state: 'processing',
                    max_accepter_number: '10',
                    type: 2,
                    score: 4,
                    content: 'test'
                },
                {   
                    task_id: 3,
                    title: 'title3', 
                    introduction: '简介',
                    money: '10',
                    publisher: 'user1',
                    state: 'processing',
                    max_accepter_number: '10',
                    type: 2,
                    score: 4,
                    content: 'test'
                },
            ],

            memberList: [],

            currentInvitedMember: '',

            inviteList: [],

            showTaskDrawer: -1,

            loginUser: 'hyx',
        };
    },
    methods: {
        getGroupDetail(team_id) {

            let p = new Promise((resolve, reject) => {
                this.$axios.get('/team/Id?team_id=' + this.team_id)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })

            return p;
        },

        render(data) {
            if (data.data.data.length != 0) {
                this.group = data.data.data[0];
                if (this.group.leader == this.loginUser) this.isLeader = true;
                else this.isLeader = false;
                this.memberList = [];
                for (let i = 0, len = this.group.members.length; i < len; i++) {
                    this.memberList.push({username: this.group.members[i].member_username});
                    this.memberList[i]['profile'] = 'https://i.loli.net/2017/08/21/599a521472424.jpg';
                }
            }
        },

        addInvitedMember() {
            if (this.currentInvitedMember !== '') {
                if (-1 == this.inviteList.indexOf(this.currentInvitedMember))
                    this.inviteList.push(this.currentInvitedMember);
            }
        },

        handleClose(event, name) {
            const index = this.inviteList.indexOf(name);
            this.inviteList.splice(index, 1);
        },

        inviteMembersComplete() {
            this.showDrawer = false;
            let params = {};
            params['team_id'] = this.team_id;
            params['leader'] = "hyx";
            params['user'] = [];
            for (let i = 0, len = this.inviteList.length; i < len; i++) {
                params['user'].push({username: this.inviteList[i]});   
            }
            this.$axios.post('/team/Member/Invitation', params)
                .then(function(res) {
                    console.log(res.data);
                })
                .catch(function(error) {
                    console.log(error);
                })
        },

        getTaskItem(id_) {
            if (this.showTaskDrawer != id_) this.showTaskDrawer = id_;
            else this.showTaskDrawer = -1;
        },

        jumpToTaskDetail(id_) {
            this.$router.push({
                name: 'taskDetail',
                params: {
                    id:id_
                }
            });

        },

        dislodge(username) {
            if (this.isLeader) {
                if (this.loginUser != username) {
                    this.$Modal.confirm({
                        title: '确认',
                        content: '<p>是否确认移出用户' + username + '</p>',
                        onOk: () => {
                            let param = {team_id: this.team_id, leader: this.loginUser, username: username};
                            this.$axios.delete('/team/Member/Dislodge', {params: param})
                                .then((res) => {
                                    console.log(res.data);
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        }
                    })
                } else {
                    this.$Modal.info({
                        title: '提示',
                        content: '不能移除自己'
                    })
                }
                
            }
        },

        blacklist(name) {
            console.log("To be continue...");
        },

        selectMember(username) {
            this.selectMember = username;
        },

        transferMembersComplete(username) {
            console.log(username);
            if (username != '' && this.isLeader) {
                if (this.loginUser != username) {
                    this.$Modal.confirm({
                        title: '确认',
                        content: '<p>是否确认将该小组组长转让给' + username + '</p>',
                        onOk: () => {
                            this.$axios.post('/team/Leader', {team_id: this.team_id, leader: this.loginUser, username: username})
                                .then((res) => {
                                    console.log(res.data);
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        }
                    })
                    
                } else {
                    this.$Modal.warning({
                        title: '提示',
                        content: '<p>不能转让给自己</p>'
                    })
                }
                this.showTransferDrawer = false;
            } else if (username == '') {

            }
        }, 

        handleReachBottom() {

        },

        withdrawGroup() {
            if (!this.isLeader) {
                this.$Modal.confirm({
                    title: '确认',
                    content: '<p>确认退出该小组？</p>',
                    onOk: () => {
                        let param = {team_id: this.team_id, username: this.loginUser};
                        this.$axios.delete('/team/Member/Departure', {params: param})
                            .then((res) => {
                                console.log(res.data);
                                if (res.data.code == 200) {
                                    this.$router.push({
                                        name: 'myGroup'
                                    })
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                })
                // let param = {team_id: this.team_id, username: this.loginUser};
                // this.$axios.delete('/team/Member/Departure', {params: param})
                //     .then((res) => {
                //         console.log(res.data);
                //         if (res.data.code == 200) {
                //             this.$router.push({
                //                 name: 'myGroup'
                //             })
                //         }
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     })
            }
        },

        dissolveGroup() {
            if (this.isLeader) {
                this.$Modal.confirm({
                    title: '确认',
                    content: '<p>是否确认解散该小组？</p><p>（解散后不可恢复！）</p>',
                    onOk: () => {
                        let param = {team_id: this.team_id, leader: this.loginUser};
                        this.$axios.delete('/team', {params: param})
                            .then((res) => {
                                console.log(res.data);
                                if (res.data.code == 200) {
                                    this.$router.push({
                                        name: 'myGroup'
                                    })
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                })
            }
        },
    },
    mounted: function() {
        this.team_id = this.$route.params.id;
        //this.group = this.$route.params.group;
        console.log("test" + this.$route.params.id);

        this.getGroupDetail(this.team_id)
            .then((data) => {
                this.render(data);
            })
    },


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

.selector {
    position: relative;
    margin: 10px;
    width: 25%;
}

.content-selector-block {
    position:relative;
    z-index: 999;
    margin: 10px;
}

.main-content {
    display: flex;
    position: relative;
}

.flex-content {
    flex: 0 1 32%;
    margin: 0px 5px;
}


.left-content {
    flex: 1 1 25%;
    margin: 0px 5px;
}

.logo-block {
    width: 200px;
    height: 200px;
    margin: auto;
}

.group-name {
    margin: 10px auto;
    text-align: center;
    font-size: 15pt;
    width: 200px;
}

.logo-image {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.modify-info {
    margin: 10px auto;
    text-align: center;
}

.button-modify {
    margin: auto;
}

.middle-content {
    flex: 1 1 40%;
    margin: 0px 5px;
}

.property {
    display: inline-block;
    width: 30%;
    font-size: 12pt;
    margin: 5px;
}

.list-title {
    display: inline-block;
    font-size: 12pt;
    margin: 5px;
}

.description {
    border: 1px solid #dcdee2;
    border-radius: 5px;
    background-color: #ffffff;
    height: 96px;
    font-size: 10pt;
    padding: 5px;
    width: 60%;
    vertical-align: top;
}

.description2 {
    border: 1px solid #dcdee2;
    border-radius: 5px;
    background-color: #ffffff;
    height: 96px;
    font-size: 10pt;
    padding: 5px;
}

.span {
    font-size: 10pt;
}

.inline-block {
    display: inline-block;
}

.tags-list {
    display: inline-block;
    vertical-align: top;
}

/* .tags {
    display: block;
} */

.group-task-title {
    margin: 10px 30px;
    font-size: 15pt;
    
}

.task-card {
    position:relative;
    border: 1px solid #2d8cf0;
    height: 120px;
    width: 90%;
    margin: 10px 30px;
    float: left;  
}

.task-card-mouseenter {
    box-shadow: 4px 4px 10px #2b85e4;
}

.task-card-mouseleave {
    box-shadow: 4px 4px 10px #5cadff;
}

.task-title{
    font-size: 20px;
    margin: 10px;
}

.task-simpleinfo {
    font-size: 16px;
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

.drawer-button {
    margin: 5px;
    width: 100px;
}


.right-content {
    flex: 1 1 30%;
    margin: 0px 5px;
    padding-left: 50px;
    padding-right: 10px;
}

.member-list {
    background-color: #ffffff;
    padding: 5px;
    position: relative;
}

.member-item {
    height: 30px;
    margin: 5px 0px;
}

.hidden {
    display: none;

}

/* .member-item:hover {
    border-top: 1px solid #5cadff;
    border-bottom: 1px solid #5cadff;
} */

.profile {
    display: inline-block;
    height: 30px;
    width: 30px;
}

.profile-img {
    height: 24px;
    width: 24px;
}

.member-username {
    display: inline-block;
    vertical-align: middle;
}

.username-span {
    font-size: 12pt;
}

.button-blacklist {
    float: right;
    padding: 3px 15px;
    margin: 1.5px 3px;
}

.withdraw {
    margin-top: 20px;
}

.invite-button {
    margin: 5px 0;
}

.withdraw-button {
    margin: 5px 0;
}

.transfer-block {
    margin-top: 15px;
}

.user-item-mouseenter {
    background-color: #f8f8f9;
    cursor: pointer;
}

.user-item-mouseleave {
    background-color: #ffffff;
}

.user-item-selected {
    background-color: #5cadff;
}

.transfer-complete {
    margin-top: 20px;
}


</style>

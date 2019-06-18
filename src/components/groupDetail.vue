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
                    <div class="tags-block">
                        <div class="property">Team Labels: </div>
                        <div class="tags-list">
                            <Tag type="dot" color="primary" class="tags" v-for="item in group.teamlabels" :key="item.label" :name="item.label">{{ item.label }}</Tag>
                        </div>
                    </div>

                    <div class="modify-info">
                        <Button class="button-modify" v-bind:class="{'hidden': !isLeader}" type="info" long :to="{name: 'modifyGroupInfo', params: {id: team_id, group: group}}">修改资料</Button>
                    </div>
                </div>


                <div class="middle-content">
                    <div class="group-task-block">
                        <div class="group-task-title">
                            <span>组内发布的任务</span>
                        </div>
                        <Scroll :on-reach-bottom="handleReachBottom" height="500">
                            <div v-if="taskList.length != 0" class="group-task-list">
                                <div v-for="item in taskList">
                                    <div v-bind:class="{'task-card':true,'task-card-mouseenter': enterid == item.task_id, 'task-card-mouseleave':!(enterid == item.task_id)}"
                                    v-on:mouseenter="enterid = item.task_id" v-on:mouseleave="enterid = 0"  @click="jumpToTaskDetail(item.task_id)">
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
                                    </div>
                                </div>
                            </div>
                            <div v-else class="group-task-title">
                                <span style="font-size: 10pt">该小组还没有任务，赶紧去发布任务吧！</span>
                            </div>
                        </Scroll>   
                    </div>
                </div>

                <div class="right-content">

                    <Tabs value="name1">
                        <TabPane label="成员列表" name="name1">
                            <div class="member-list">
                                <Scroll :on-reach-bottom="handleReachBottom" height="250">
                                    <div class="member-item" v-for="item in group.members" v-bind:key="item.username">
                                        <div class="profile">
                                            <Avatar :src="item.avatar" size="small"/>
                                        </div>
                                        <div class="member-username">
                                            <span class="username-span">{{item.username}}</span>
                                        </div>
                                        <div class="buttonList">
                                            <Button :class="{'hidden': item.inBlacklist}" class="button-blacklist" @click="blacklist(item.username)">拉黑</Button>
                                            <Button :class="{'hidden': !item.inBlacklist}" class="button-blacklist" @click="cancelBlacklist(item.username)">取消拉黑</Button>
                                            <Button :class="{'hidden': !isLeader}" class="button-blacklist" @click="dislodge(item.username)">移除</Button>
                                        </div>
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
                                    <div v-for="item in group.members" v-bind:key="item.username">
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
                                                <Avatar :src="item.avatar" size="small"/>
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
                            <div v-if="organizationsList.length != 0" class="member-list">
                                <Scroll :on-reach-bottom="handleReachBottom" height="330">
                                    <div class="member-item" v-for="item in organizationsList" v-bind:key="item.username">
                                        <div class="profile">
                                            <Avatar :src="item.orgorganizationavatar" size="small"/>
                                        </div>
                                        <div class="member-username">
                                            <span class="username-span">{{item.orgorganizationname}}</span>
                                        </div>
                                        <Button :class="{'hidden': !isLeader}" class="button-blacklist" @click="dislodge(item.username)">移除</Button>
                                    </div>
                                </Scroll>
                            </div>
                            <div v-else class="member-list">
                                <Scroll :on-reach-bottom="handleReachBottom" height="330">
                                    <div class="no-organization">无机构</div>
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
    props: ['userInfo'],

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
                teamlabels: [{}],
                members: [{}]
            },  

            enterid: 0,
            enterUser: '',

            isLeader: true,

            showDrawer: false,
            showTransferDrawer: false,

            taskList: [],
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

            organizationsList: [],

            currentInvitedMember: '',

            inviteList: [],

            showTaskDrawer: -1,

            loginUser: 'HeChX',
        };
    },
    methods: {
        judge(team_id) {
            
            console.log(this.userInfo);
            let p = new Promise((resolve, reject) => {
                this.$axios.get('/api/v1/team/Member?team_id=' + team_id)
                    .then((res) => {
                        console.log(res);
                        if (res.data.code == 200) {
                            resolve(team_id);
                        } else if (res.data.code == 213) {
                            reject(213);
                        } else if (res.data.code == 211) {
                            reject(211);
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })

            return p;
        },

        getGroupDetail(team_id) {

            let p1 = new Promise((resolve, reject) => {
                this.$axios.get('/api/v1/team/Id?team_id=' + team_id + '&type=0')
                    .then((res) => {
                        if (res.data.code == 200 && res.data.data.length != 0) {
                            let param = {};
                            param['members'] = [];
                            for (let i = 0, len = res.data.data[0].members.length; i < len; i++) {
                                param['members'].push({username: res.data.data[0].members[i]['member_username']});
                            }
                            this.$axios.post('/api/v1/user/getteammembersavatat', param)
                                .then((response) => {
                                    if (response.data.code == 200) {
                                        res.data.data[0].members = [];
                                        for (let i = 0, len = response.data.data.length; i < len; i++) {
                                            res.data.data[0].members.push(response.data.data[i]);
                                        }
                                        console.log(res.data.data);
                                        this.$axios.get('/api/v1/user/getUserBlacklist')
                                            .then((response2) => {
                                                console.log(response2.data.data);
                                                if (response2.data.code == 200 && response2.data.data.length != 0) {
                                                    for (let i = 0, len = res.data.data[0].members.length; i < len; i++) {
                                                        for (let j = 0, len2 = response2.data.data.length; j < len2; j++) {
                                                            this.$forceUpdate();
                                                            if (res.data.data[0].members[i]['username'] == response2.data.data[j]['username']) {
                                                                res.data.data[0].members[i].inBlacklist = true;
                                                                break;
                                                            } else {
                                                                res.data.data[0].members[i].inBlacklist = false;
                                                            }
                                                        }
                                                    }
                                                }
                                            })
                                            .catch((error2) => {
                                                console.log(error2);
                                            })
                                        console.log(res.data.data);
                                        
                                        this.group = res.data.data[0];
                                        resolve(res);
                                    } else {
                                        reject(response);
                                    }
                                })
                                .catch((error) => {
                                    reject(error);
                                })
                        } else {
                            reject(res);
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    })
            });

            let p2 = new Promise((resolve, reject) => {
                this.$axios.get('/api/v1/user/getCanPublishTasksOrg?teamId=' + team_id)
                    .then((res) => {
                        this.organizationsList = res.data.data;
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    })
                
            });

            let p3 = new Promise((resolve, reject) => {
                this.$axios.get('/api/v1/team/Leader?team_id=' + team_id + '&leader=' + this.userInfo.username)
                    .then((res) => {
                        if (res.data.code == 200) {
                            this.isLeader = true;
                        } else if (res.data.code == 212) {
                            this.isLeader = false;
                        }
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    })
            });

            let p4 = new Promise((resolve, reject) => {
                this.$axios.get('/api/v1/task?type=all&range=' + team_id + '&username=' + this.userInfo.username)
                    .then((res) => {
                        this.taskList = res.data.data;
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    })
            });

            let p = Promise.all([p1, p2, p3, p4]);
            console.log(p);

            return p;
        },

        addInvitedMember() {
            if (this.currentInvitedMember !== '') {
                if (-1 == this.inviteList.indexOf(this.currentInvitedMember)) {
                    this.inviteList.push(this.currentInvitedMember);
                    this.currentInvitedMember = '';
                }
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
            params['user'] = [];
            for (let i = 0, len = this.inviteList.length; i < len; i++) {
                params['user'].push({username: this.inviteList[i]});   
            }
            this.$axios.post('/api/v1/team/Member/Invitation', params)
                .then((res) => {
                    console.log(res.data);
                    let param = {};
                    param['members'] = [];
                    for (let i = 0, len = this.group.members.length; i < len; i++) {
                        param['members'].push({username: this.group.members[i]['username']});
                    }
                    for (let i = 0, len = this.inviteList.length; i < len; i++) {
                        param['members'].push({username: this.inviteList[i]});
                    }
                    this.$axios.post('/api/v1/user/getteammembersavatat', param)
                        .then((response) => {
                            if (response.data.code == 200) {
                                console.log(response.data.data);
                                this.group.members = [];
                                for (let i = 0, len = response.data.data.length; i < len; i++) {
                                    this.group.members.push(response.data.data[i]);
                                }
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    
                    this.inviteList = [];
                })
                .catch(function(error) {
                    console.log(error);
                    this.inviteList = [];
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
                if (this.userInfo.username != username) {
                    this.$Modal.confirm({
                        title: '确认',
                        content: '<p>是否确认移出用户' + username + '</p>',
                        onOk: () => {
                            let param = {team_id: this.team_id, username: username};
                            this.$axios.delete('/api/v1/team/Member/Dislodge', {params: param})
                                .then((res) => {
                                    console.log(res.data);
                                    for (let i = 0, len = this.group.members.length; i < len; i++) {
                                        if (username == this.group.members[i]['username']) {
                                            this.group.members.splice(i, 1);
                                        }
                                    }
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
            if (name != this.userInfo.username) {
                this.$axios.post('/api/v1/user/userblacklist', {username1: name, username2: this.userInfo.username})
                    .then((res) => {
                        console.log(res);
                        if (res.data.code == 200) {
                            this.$Modal.info({
                                title: '提示',
                                content: '<p>拉黑成功</p>'
                            });
                            for (let i = 0, len = this.group.members.length; i < len; i++) {
                                this.$forceUpdate();
                                if (name == this.group.members[i]['username']) {
                                    this.group.members[i]['inBlacklist'] = true;
                                }
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.data.code == 406) {
                            this.$Modal.error({
                                title: '提示',
                                content: '<p>该用户已经在黑名单中</p>'
                            })
                        }
                    })
            } else {
                this.$Modal.error({
                    title: '提示',
                    content: '<p>不能拉黑自己</p>'
                });
            }
        },

        cancelBlacklist(name) {
            if (name != this.userInfo.username) {
                this.$axios.post('/api/v1/user/usercancelblack', {username1: name, username2: this.userInfo.username})
                    .then((res) => {
                        console.log(res);
                        if (res.data.code == 200) {
                            this.$Modal.info({
                                title: '提示',
                                content: '<p>取消拉黑成功</p>'
                            });
                            for (let i = 0, len = this.group.members.length; i < len; i++) {
                                this.$forceUpdate();
                                if (name == this.group.members[i]['username']) {
                                    this.group.members[i]['inBlacklist'] = false;
                                }
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },

        selectMember(username) {
            this.selectMember = username;
        },

        transferMembersComplete(username) {
            console.log(username);
            if (username != '' && this.isLeader) {
                if (this.userInfo.username != username) {
                    this.$Modal.confirm({
                        title: '确认',
                        content: '<p>是否确认将该小组组长转让给' + username + '</p>',
                        onOk: () => {
                            this.$axios.post('/api/v1/team/Leader', {team_id: this.team_id, username: username})
                                .then((res) => {
                                    console.log(res.data);
                                    this.group.leader = username;
                                    this.isLeader = false;
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
                        let param = {team_id: this.team_id};
                        this.$axios.delete('/api/v1/team/Member/Departure', {params: param})
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

        dissolveGroup() {
            if (this.isLeader) {
                this.$Modal.confirm({
                    title: '确认',
                    content: '<p>是否确认解散该小组？</p><p>（解散后不可恢复！）</p>',
                    onOk: () => {
                        let param = {team_id: this.team_id};
                        this.$axios.delete('/api/v1/team', {params: param})
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

        switchGroup() {
            this.team_id = this.$route.params.id;
            console.log(this.team_id);

            this.judge(this.team_id)
                .then((data) => {
                    console.log(data);
                    this.getGroupDetail(data)
                })
            //this.getGroupDetail(this.team_id)
                // .then((data) => {
                //     this.render(data);
                // })
                .then((data) => {
                    console.log(this.group);
                    this.getBlacklist();
                })
                .catch((err) => {
                    if (err == 213) {
                        this.$Modal.error({
                            title: '错误',
                            content: '没有该小组'
                        })
                        this.$router.push({
                            name: 'myGroup'
                        })
                    } else if (err == 211) {
                        this.$Modal.error({
                            title: '错误',
                            content: '<p>你不是该小组成员</p><p>无法查看该小组详情</p>'
                        })
                        this.$router.push({
                            name: 'myGroup'
                        })
                    }
                })
        },

        sendToMainPage() {
            let data = {
                active: '2-2',
                open: '2'
            };
            this.$emit('menuSelected', data);
        },
    },

    mounted: function() {
        this.sendToMainPage();
    },

    created: function() {
        this.switchGroup();
    },

    watch: {
        '$route.params': 'switchGroup'
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
    flex: 1 0 40%;
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

.task-card:hover {
    cursor: pointer;
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
    display: flex;
    justify-content: space-between;
}

.hidden {
    display: none;

}

/* .member-item:hover {
    border-top: 1px solid #5cadff;
    border-bottom: 1px solid #5cadff;
} */

.profile {
    /* display: inline-block; */
    height: 30px;
    width: 30px;
    flex: 0 1 10%;
}

.profile-img {
    height: 24px;
    width: 24px;
}

.member-username {
    display: inline-block;
    vertical-align: middle;
    margin: auto;
    overflow: hidden;
    flex: 0 1 50%;
}

.buttonList {
    flex: 0 1 40%;
    display: flex;
    justify-content: flex-end;
}

.username-span {
    font-size: 12pt;
}

.button-blacklist {
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

.no-organization {
    text-align: center;
}

/* .group-task-list {
    margin-right: 10px;
} */

</style>

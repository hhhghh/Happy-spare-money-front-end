/* eslint-disable */

<template>
    <div class="content-body">
        <div class="content"> 
            <div class="content-selector-block">
                <div style="margin-left: 15px;">
                    <Breadcrumb>
                        <BreadcrumbItem>专属小组</BreadcrumbItem>
                        <BreadcrumbItem>{{userInfo.username}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>

            <Divider></Divider>

            <div class="main-content">
                <div class="left-content">
                    <div class="logo-block">
                        <img class="logo-image" id="logo" :src="userInfo.avatar" alt="Organization Avatar">
                    </div>
                    <div class="group-name">{{userInfo.username}}</div>

                    <div class="description-block">
                        <div class="property">个性签名: </div>
                        <div class="inline-block description">
                            <span class="span">{{userInfo.signature}}</span>
                        </div>
                    </div>
                </div>


                <div class="middle-content">
                    <div class="group-task-block">
                        <div class="group-task-title">
                            <span>发布的任务</span>
                        </div>
                        <Scroll height="500">
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

                    <!-- <Tabs value="name1">
                        <TabPane label="关注的用户列表" name="name1"> -->
                            <div class="followingList">
                                <span class="listTitle">关注的用户列表</span>
                            </div>
                            <div v-if="followingList.length != 0" class="member-list">
                                <Scroll height="330">
                                    <div class="member-item" v-for="item in followingList" v-bind:key="item.username">
                                        <div class="profile pointer" @click="jumpToUserInfoPage(item.username)">
                                            <Avatar :src="item.avatar" size="small"/>
                                        </div>
                                        <div class="member-username">
                                            <span class="username-span">{{item.username}}</span>
                                        </div>
                                    </div>
                                </Scroll>
                            </div>
                            <div v-else class="member-list">
                                <Scroll height="330">
                                    <div class="no-organization">暂时还没有用户关注你哦</div>
                                </Scroll>
                            </div>
                        <!-- </TabPane>
                    </Tabs> -->
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
            orgName: '',
            
            group: {
                team_name: '',
                leader: '',
                logo: '',
                description: '',
                limit: '',
                teamlabels: [{}],
                members: [{}]
            },
            
            org: {
                avatar: '',
                name: '',
                signature: '',
                type: 1,
                username: '',
            },

            enterid: 0,

            taskList: [],

            organizationsList: [],

            followingList: [],

            userType: 1,
        };
    },
    methods: {
        
        getGroupDetail(orgName) {

            let p1 = new Promise((resolve, reject) => {
                this.$axios.get('/api/v1/task/findByOrg?orgname=' + orgName + '&&type=all')
                    .then((res) => {
                        console.log(res);
                        if (res.data.code == 200) {
                            resolve(res);
                        } else {
                            reject(res);
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    })
            });

            let p2 = new Promise((resolve, reject) => {
                this.$axios.get('/api/v1/user/getOrganizationalFollowersList')
                    .then((res) => {
                        console.log(res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    })
                
            });

            let p = Promise.all([p1, p2]);
            console.log(p);

            return p;
        },

        getData(name) {
            console.log(name);

            this.getGroupDetail(name)
                .then((data) => {
                    console.log(data);
                    this.taskList = data[0].data.data;
                    this.followingList = data[1].data.data;
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        jumpToUserInfoPage(username) {
            this.$router.push({path: `/user/` + username});
        },

        sendToMainPage() {
            let data = {
                active: '2-4',
                open: '2'
            };
            this.$emit('menuSelected', data);
        },
    },

    mounted: function() {
        this.userType = this.userInfo.type;
        let orgName = this.$route.params.name;
        console.log(this.userInfo);
        if (this.userType == 1) {
            this.getData(orgName);
        } else {
            this.$Modal.error({
                title: '错误',
                content: '<p>没有权限查看专属小组详情</p>'
            })
            this.$router.push({
                name: 'myGroup'
            })
        }
        this.sendToMainPage();
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
    flex: 1 0 25%;
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

.task-title {
    font-size: 20px;
    margin: 10px;
    overflow: hidden;
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

.followingList {
    text-align: center;
    margin: 5px;
}

.listTitle {
    font-size: 12pt;
    font-weight: bold;
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

.pointer:hover {
    cursor: pointer;
}

.member-username {
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
}

.username-span {
    font-size: 12pt;
}

.no-organization {
    text-align: center;
}

/* .group-task-list {
    margin-right: 10px;
} */

</style>

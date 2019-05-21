

<template>
    <div class="layout">
        <Layout>
            <Header class="layout-header" >
                <div class="layout-header-right">
                    <Avatar class="avatar" icon="ios-person" />
                    <a href="javascript:void(0)" v-show="!isLogin" v-on:click="isLogin = !isLogin" >
                        <span class="uniform-fontsize" style="margin: 7px; color:#2d8cf0;position: relative;top: 2px">登录</span>
                    </a>
                    <Dropdown v-show="isLogin">
                        <a href="javascript:void(0)" style="margin: 7px; ">
                            <Icon type="ios-arrow-down" size="24" style="color:#2d8cf0" v-on:click="isLogin = !isLogin"/>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem><div @click="jumpToPersonalPage()">{{ msg }}</div></DropdownItem>
                            <DropdownItem><div @click="jumpToMainPage()">主页</div></DropdownItem>
                            <DropdownItem><div @click="jumpToLoginPage()">注销</div></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                   
                </div>
            </Header>
            <Layout class="layout-bottom">
                <Sider :style="{background: '#fff'}" class="layout-sider" >
                    <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                               <Icon type="md-apps" size="24"/>
                                <span>任务管理</span>
                            </template>
                            <router-link to="/MainPage/taskSearch">
                                <MenuItem name="1-1" v-show="isUser">
                                    <Icon type="ios-search" />
                                    <span>任务搜索</span>
                                </MenuItem>
                            </router-link>
                            <router-link to="/MainPage/taskRelease">
                                <MenuItem name="1-2">
                                    <Icon type="ios-paper-outline" />
                                    <span>任务发布</span>
                                </MenuItem>
                            </router-link>
                            
                            <Submenu name="1-3">
                                <template slot="title">
                                    <Icon type="ios-paper" />
                                    <span>我的任务</span>
                                </template>
                                <router-link to="/MainPage/myAcceptTask" v-show="isUser">
                                     <MenuItem name="1-3-1">接受任务</MenuItem>
                                </router-link>
                                <router-link to="/MainPage/myReleaseTask">
                                     <MenuItem name="1-3-2">发布任务</MenuItem>
                                </router-link>
                               
                            </Submenu>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="md-people" size="24"/>
                                <span>小组管理</span>
                            </template>
                            <router-link to="/MainPage/groupSearch">
                                <MenuItem name="2-1">
                                    <Icon type="ios-search" />
                                    <span>小组搜索</span>
                                </MenuItem>
                            </router-link>
                            <router-link to="/MainPage/myGroup">
                                <MenuItem name="2-2">
                                    <Icon type="ios-people-outline" />
                                    <span>我的小组</span>
                                </MenuItem>
                            </router-link>
                            <router-link to="/MainPage/createGroup">
                                <MenuItem name="2-3">
                                    <Icon type="ios-create-outline" />
                                    <span>创建小组</span>
                                </MenuItem>
                            </router-link>
                           
                        </Submenu>
                    </Menu>
                </Sider>
                <div class="layout-content">
                    <div> 
                         <router-view> </router-view>   
                    </div>
                     <BackTop :height="0" :bottom="30" >
                        <div v-on:mouseenter="show=true" v-on:mouseleave="show=false" v-bind:class="{'back-top-btn-show':show, 'back-top-btn': !show}">
                            <Icon type="ios-arrow-up" size="24" />
                        </div>
                    </BackTop>
                </div>
            </Layout>
        </Layout>
       
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {	
                nickname: 'Name',	
                acount_state: 0	
            },	
            	
            isUser: false,	
            msg: '',
            show: false,
            isLogin: false,
            taskList: [
                {
                    value: 'All',
                    label: '全部'
                },
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
    },
    mounted() {	
        this.isUser = (this.user.acount_state == 0)	
        this.msg = this.isUser ? '个人信息' : '机构信息'	
    },
    methods: {
        jumpToPersonalPage: function () {
            if (this.isUser)
                this.$router.push({path: `/personalPage/personalInfo`})
            else 	
                this.$router.push({path: `/personalPage/organizationInf`})
        },
        jumpToMainPage: function() {
            this.$router.push({path: `/MainPage/taskSearch`})
        },
        jumpToLoginPage: function() {
            this.$router.push({path: `/login`})
        }

    }
}
</script>

/*eslint-disable*/
<style scoped>

span {
    margin:3px;
}
.uniform-fontsize {
    font-size: 16px;
}

a {
     color: #495060;
}

.layout{
    border-radius: 4px;
    background-color: #f8f8f9;
    height:auto;
}

.layout-bottom{
    position:absolute;
    top:70px;
    bottom:0px;
    left:0px;
    right:0px;
    height:auto;	
    over-flow:hidden;	
    min-width: 960px;
    background-color: #f8f8f9;    
}

.layout-header{
    right:0px;
    left:0px;
    position:fixed;
    z-index: 1000;
    vertical-align: middle;
    background: #ffffff;
    border: 1px solid #dcdee2;
    height: 70px;
    
}

.layout-header-right {
    float: right;
    vertical-align: middle;
    line-height: 70px;
}

.layout-sider {
    position:fixed;
    top:70px;
    bottom:0px;
    border: 1px solid #d7dde4;   
    z-index: 10;
}



.layout-content {
    position:absolute;
    left:200px;
    top:0px;
    bottom:0px;
    right:0px;
    
   
    
   
}


.avatar {
    position:relative;
    
    
}

.back-top-btn {
    background-color: rgba(0, 0, 0, 0.6);
    text-align: center;
    border-radius: 2px;
    box-shadow: 0px 1px 3px rgba(0,0,0,0.2);
}

.back-top-btn-show {
    background-color: rgba(0, 0, 0, 1);
    text-align: center;
    border-radius: 2px;
    box-shadow: 0px 1px 3px rgba(0,0,0,0.2); 
}
</style>

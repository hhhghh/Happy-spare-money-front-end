<template>
  <div class="layout">
    <Layout>
      <Header class="layout-header" >
        <div class="layout-header-right">
          <Badge :count="message.length" style="height: 32px; line-height: 32px; margin-right: 20px;">
            <Icon @click="showMsg=!showMsg" type="ios-notifications-outline" size="26" style="cursor: pointer"></Icon>
          </Badge>
          <div class="avatar" @click="jumpToUserInfoPage">
            <img class="avatarImg" :src="userInfo.avatar">
          </div>
          <Dropdown>
            <span>{{userInfo.username}}</span>
            <Icon type="ios-arrow-down" size="24" style="margin: 7px; color:#2d8cf0" />
            <DropdownMenu slot="list">
              <DropdownItem  @click.native="jumpToPersonalPage">
                <Icon type="md-person" /> {{ isUser ? '个人信息' : '机构信息' }}
              </DropdownItem>
              <DropdownItem @click.native="jumpToLoginPage">
                <Icon type="ios-power" /> 退出
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Message :message="message" v-show="showMsg"></Message>
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
            <router-view v-if="isRouterAlive" :userInfo="userInfo"></router-view>
          </div>
          <BackTop>
            <div v-on:mouseenter="inBackTop=true" v-on:mouseleave="inBackTop=false"
                 v-bind:class="['back-top-btn', {'back-top-btn-show': inBackTop}]">
              <Icon type="ios-arrow-up" size="24" />
            </div>
          </BackTop>
        </div>
      </Layout>
    </Layout>

  </div>
</template>
<script>
  import Message from './message.vue'

  export default {
    data() {
      return {
        userInfo: {},

        message: [],


        isUser: true,
        showMsg: false,
        inBackTop: false,
        isRouterAlive:true,

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
        range: '',


      };
    },
    mounted() {
      this.$axios.get('api/v1/user/getPersonalInfo')
        .then(msg => {
          if (msg.data.code == 200) {
            this.userInfo = msg.data.data;
            this.isUser = this.userInfo.type == 0;
          }
        })
        .catch(err => {
          if (err.response.status == 401) {
            this.$router.push({name: 'login'});
            this.$Message.error('请登录');
          }
        });


      this.$Notice.config({
        top: 100,
        duration: 3
      });

      this.$axios.get('/api/v1/toast')
        .then(msg => {
          if (msg.data.code == 200) {
            this.message = msg.data.data;
            this.message.sort((msg1, msg2) => {
              return msg1.type - msg2.type;
            });
          }
        });

    },

    methods: {
      jumpToPersonalPage() {
        if (this.isUser)
          this.$router.push({path: `/personalPage/personalInfo`});
        else
          this.$router.push({path: `/personalPage/organizationInf`});
      },

      jumpToUserInfoPage() {
        this.$router.push({path: `/user/` + this.userInfo.username});
      },

      jumpToLoginPage() {
        this.$axios.get('api/v1/user/logout').then(msg => {
          if (msg.data.code == 200) {
            this.$router.push({name: `login`});
            this.$Message.success('退出成功！');
          }
          else {
            this.$router.push({name: `login`});
            this.$Message.error(msg.data.msg);
          }
        }).catch(err => {
          this.$router.push({name: `login`});
          this.$Message.error(err.response.statusText);
        });
      },



      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function() {
          this.isRouterAlive = true;
        })
      }

    },

    provide() {
      return {
        reload: this.reload
      }
    },

    components: {
      Message
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
    width: 32px;
    height: 32px;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    border-radius: 50%;
    line-height: 32px;
    cursor: pointer;
  }

  .avatarImg {
    width: 32px;
    height: 32px;
  }

  .back-top-btn {
    background-color: rgba(0, 0, 0, 0.6);
    text-align: center;
    border-radius: 2px;
    box-shadow: 0px 1px 3px rgba(0,0,0,0.2);
  }

  .back-top-btn-show {
    background-color: rgba(0, 0, 0, 1);
  }


</style>

<template>
  <div class="layout">
    <Layout>
      <Header class="layout-header" >
        <div class="layout-header-right">
          <Badge :count="message.length" style="height: 32px; line-height: 32px; margin-right: 20px;">
            <Icon @click="showMsg=!showMsg" type="ios-notifications-outline" size="26" style="cursor: pointer"></Icon>
          </Badge>
          <div class="avatar">
            <img class="avatarImg" :src="user.avatar">
          </div>
          <Dropdown>
            <span>{{user.username}}</span>
            <Icon type="ios-arrow-down" size="24" style="margin: 7px; color:#2d8cf0" />
            <DropdownMenu slot="list">
              <DropdownItem><div @click="jumpToPersonalPage()"><Icon type="md-person" /> {{ msg }}</div></DropdownItem>
              <DropdownItem><div @click="jumpToLoginPage()"><Icon type="ios-power" /> 退出</div></DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="div-message" v-show="showMsg">
          <ul>
            <li v-for="(msg, index) in message" class="li-msg">
              <span style="display: inline-block; width: 300px">{{msg.message}}</span>
              <Icon @click="deleteMsg(index)" type="ios-close" size="24" style="vertical-align: top; cursor: pointer" />
            </li>
          </ul>
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
            <router-view v-if="isRouterAlive"></router-view>
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
  export default {
    data() {
      return {
        user: {
          username: 'hjj',
          avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          acount_state: 0
        },

        message: [
          {id: 1, message: "你已被踢出小组 public_team"},
          {id: 1, message: "你已被踢出小组 public_team"},
          {id: 1, message: "你已被踢出小组 public_team"},
          {id: 1, message: "你已被踢出小组 public_team"},
          {id: 2, message: "你发布的任务 buy food 已被 hyx 接受"},
          {id: 2, message: "你发布的任务 可能会发生这样的情况：当一个道具在激活状态时，另一个道具与挡板发生了接触。在这种情况下我们有超过1个在当前PowerUps容器中处于激活状态的道具。然后，当这些道具中的一个被停用时，我们不应使其效果失效因为另一个相同类型的道具仍处于激活状态。出于这个原因，我们使用isOtherPowerUpActive检查是否有同类道具处于激活状态。只有当它返回false时，我们才停用这个道具的效果。这样，给定类型的道具的持续时间就可以延长至最近一次被激活后的持续时间。 已被 hyx 接受"}
        ],

        showMsg: false,

        isUser: false,
        msg: '',
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
      this.isUser = (this.user.acount_state == 0);
      this.msg = this.isUser ? '个人信息' : '机构信息';
      this.$Notice.config({
        top: 100,
        duration: 3
      });

      this.$axios.get('/toast?username='+ this.$route.params.username)
        .then(msg => {
          if (msg.data.code == 200) {
            this.message = msg.data.data;
          }
        });

     
     
      this.$router.push({path: `/MainPage/taskSearch`});  
      
      
      

    },
    methods: {
      jumpToPersonalPage: function () {
        if (this.isUser)
          this.$router.push({path: `/personalPage/personalInfo`})
        else
          this.$router.push({path: `/personalPage/organizationInf`})
      },

      jumpToLoginPage: function() {
        this.$axios.get('api/v1/user/logout').then(msg => {
          if (msg.data.code == 200) {
            this.$router.push({path: `/login`});
            this.$Message.success('退出成功！');
          }
          else {
            this.$router.push({path: `/login`});
            this.$Message.error(msg.data.msg);
          }
        }).catch(err => {
          this.$Message.error(err.response.statusText);
        });
      },

      deleteMsg: function(index) {
        this.message.splice(index, 1);
        if (this.message.length == 0) this.showMsg = false;
        this.$axios.delete('/toast/'+ this.message[index].id)
          .then(msg => {
            if (msg.data.code == 200) {
              this.message.splice(index, 1);
              if (this.message.length == 0) this.showMsg = false;
            }
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
  }

  .avatarImg {
    width: 32px;
  }

  .div-message {
    width: 400px;
    max-height: 500px;
    position: absolute;
    right: 5px;
    top: 75px;
    background: #fff;
    border: 1px solid rgb(235, 235, 235);
    overflow: auto;
  }

  .li-msg {
    list-style: none;
    border-bottom: 1px solid rgb(235, 235, 235);
    padding: 20px;
    line-height: 24px;
    font-weight: 600;
  }

  .li-msg:last-child {
    border-bottom: none;
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

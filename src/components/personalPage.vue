<template>
    <div class="personal-page-body">
        <Layout>
            <div class="div-header">
                <Header class="layout-header" >
                    <div class="layout-header-right">
                        <div class="avatar">
                          <img class="avatarImg" :src="userInfo.avatar">
                        </div>
                        <Dropdown>
                            <Icon type="ios-arrow-down" size="24" style="margin: 7px; color:#2d8cf0"/>
                            <DropdownMenu slot="list">
                                <DropdownItem><div @click="jumpToPersonalPage()">{{userInfo.username}}</div></DropdownItem>
                                <DropdownItem><div @click="jumpToMainPage()">主站</div></DropdownItem>
                                <DropdownItem><div @click="jumpToLoginPage()">退出</div></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Header>
            </div>
                <Layout class="layout-bottom">
                    <Sider class="layout-sider">
                        <Menu active-name="1-1" theme="dark" width="auto" >
                          <router-link to="/personalPage/personalInfo">
                            <MenuItem name="1-1">个人信息</MenuItem>
                          </router-link>
                          <router-link to="/personalPage/deposit">
                            <MenuItem name="1-2">充值</MenuItem>
                          </router-link>
                          <router-link to="/personalPage/withdraw">
                            <MenuItem name="1-3">提现</MenuItem>
                          </router-link>
                        </Menu>
                    </Sider>
                        <div class="content">
                          <router-view></router-view>
                        </div>
                </Layout>
            </Layout>
    </div>
</template>
    
<script>
export default {
    data() {	
        return {
          userInfo: {
            username: 'hjj',
            avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          },
        }	
        
     },	
    	
    mounted() {
      this.$axios.get('api/v1/user/getPersonalInfo')
      .then(msg => {
        console.log(msg.data.code);
        if (msg.data.code == 200) {
          this.userInfo = msg.data.data;
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response.status == 401) {
          this.$router.push({name: 'login'});
        }
      });
    },

    methods: {
        jumpToMainPage: function() {	
            this.$router.push({path: `/MainPage`});
        },	
        jumpToLoginPage: function() {	
            this.$router.push({path: `/login`});
        },
        jumpToPersonalPage: function () {
          this.$router.push({path: `/personalPage/personalInfo`});
        }
        
     }
     
     
}
</script>


<style scoped>

.uniform-fontsize {
    font-size: 16px;
}
div {
    margin:0px;
    padding: 0px;
}

.div-header {	
    border-bottom: 1px solid #000000;	
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

.layout-header{
    right:0px;
    left:0px;
    position:fixed;
    z-index: 1000;
    vertical-align: middle;
    background: #363e4f;
    height:70px;
}

.layout-header-right {
    float: right;
    vertical-align: middle;
    line-height: 70px;
    position:relative;
    right: 30px;
}

.layout-bottom{
    position:relative;
    top:68px;
    width:auto;
    over-flow:hidden;
    text-align: center;
        
}

.layout-sider {
    position:fixed;
    top:70px;
    bottom:0px;
    left:-1px;
    border-top: 1px solid #000000;   
    z-index: 10;
}

.content {
    position:absolute;
    left:200px;
    right:0px;
}

</style>

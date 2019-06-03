<template>
  <div class="layout">
    <Layout>
      <Header class="layout-header">
        <span class="login-nav">
          <router-link to="/register">注册</router-link>
        </span>
      </Header>
      <Content>
        <div class="login-contain">
          <Tabs>
            <TabPane label="用户登录">
              <Form ref="userLoginForm" :rules="ruleValidate" :model="userLoginInfo">
                <FormItem prop="username">
                  <Input v-model="userLoginInfo.username" prefix="ios-contact" placeholder="username"/>
                </FormItem>
                <FormItem prop="password">
                  <Input v-model="userLoginInfo.password" type="password" prefix="ios-lock" placeholder="password"/>
                </FormItem>
                <FormItem>
                  <Button @click="login('userLoginForm', '0')" type="primary" long>登录</Button>
                </FormItem>
              </Form>
            </TabPane>
            <TabPane label="机构登录">
              <Form ref="orLoginForm" :rules="ruleValidate" :model="userLoginInfo">
                <FormItem prop="username">
                  <Input v-model="userLoginInfo.username" prefix="ios-contacts" placeholder="username"/>
                </FormItem>
                <FormItem prop="password">
                  <Input v-model="userLoginInfo.password" type="password" prefix="ios-lock" placeholder="password"/>
                </FormItem>
                <FormItem>
                  <Button @click="login('orLoginForm', '1')" type="primary" long>登录</Button>
                </FormItem>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  </div>


</template>
<script>
  var SHA256 = require("crypto-js/sha256");
  export default {
    data() {
      return {
        ruleValidate: {
          username: [
            {required: true, message: '请输入您的用户名',  trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入您的密码',  trigger: 'blur'}
          ],
        },

        userLoginInfo: {
          username: '',
          password: '',
        }

      };
    },
    methods: {
      login(name, type) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: "/api/v1/user/login",
              data: {
                type: type,
                username: this.userLoginInfo.username,
                password: SHA256(this.userLoginInfo.password).toString()
                // password: this.userLoginInfo.password
              }
            })
            .then(msg => {
              console.log(msg);
              if (msg.data.code == 200) {
                this.$Message.success(msg.data.msg);
                this.$router.push({name: 'MainPage'});
              }
              else {
                this.$Message.error(msg.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
              this.$Message.error(err.response.statusText);
            });
          }
          else {
            this.$Message.error('Fail!');
          }
        })
      }
    }
  }
</script>

<style>
.ivu-tabs-nav {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>

<style scoped>
.layout {
  min-height: 100%;
  background: #f5f7f9;
}

.login-contain {
  width: 400px;
  padding: 20px;
  border-radius: 3px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  border: 1px solid #eee;
  margin: 100px auto;
  background-color: #fff;
}

.login-head {
  text-align: center;
  margin-bottom: 20px;
}

.layout-header {
  background-color: #fff;
}

.login-nav {
  float: right;
}

.login-nav a {
  margin-left: 10px;
}


</style>

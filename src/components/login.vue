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
          <!--          <div class="login-head">登录</div>-->
          <Tabs>
            <TabPane label="用户登录">
              <Form :rules="ruleValidate" :model="formValidate">
                <FormItem prop="username">
                  <Input v-model="formValidate.username" prefix="ios-contact" placeholder="username"/>
                </FormItem>
                <FormItem prop="password">
                  <Input v-model="formValidate.password" type="password" prefix="ios-lock" placeholder="password"/>
                </FormItem>
<!--                <FormItem style="text-align: center;">-->
<!--                  <RadioGroup v-model="formValidate.userType">-->
<!--                    <Radio label='0'>user</Radio>-->
<!--                    <Radio label='1'>organization</Radio>-->
<!--                  </RadioGroup>-->
<!--                </FormItem>-->
                <FormItem>
                  <Button @click="loginSubmit" type="primary" long>登录</Button>
                </FormItem>
              </Form>
            </TabPane>
            <TabPane label="机构登录">
              <Form :rules="ruleValidate" :model="formValidate">
                <FormItem prop="username">
                  <Input v-model="formValidate.username" prefix="ios-contacts" placeholder="username"/>
                </FormItem>
                <FormItem prop="password">
                  <Input v-model="formValidate.password" type="password" prefix="ios-lock" placeholder="password"/>
                </FormItem>
                <FormItem>
                  <Button @click="loginSubmit" type="primary" long>登录</Button>
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
  export default {
    data() {
      return {
        ruleValidate: {
          username: [
            {required: true, message: 'The username cannot be empty',  trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'The password cannot be empty',  trigger: 'blur'}
          ],
        },

        formValidate: {
          username: '',
          password: '',
          userType: '0'

        }

      };
    },
    methods: {
      loginSubmit() {
        this.$Message.success('Success!');
        this.$Message.error('Fail!');
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

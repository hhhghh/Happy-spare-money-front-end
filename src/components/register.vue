<template>
  <div class="layout">
    <Layout>
      <Header class="layout-header">
        <span class="login-nav">
          <router-link to="/login">登录</router-link>
        </span>
      </Header>
      <Content>
        <Row>
          <Col span="5" offset="2">
            <div class="avatar-box">
              <img :src="avatarImg" />
              <label class="img-upload-box avatar-upload-box" for="fileInput">
                <Icon type="ios-camera" size="20"></Icon>
              </label>
              <input id="fileInput" type="file" @change="avatarImgUpload">
            </div>
            <Select v-model="userType" style="width:75%; float: left;">
              <Option value="0" label="用户注册"></Option>
              <Option value="1" label="机构注册"></Option>
            </Select>
          </Col>
          <Col span="13">
            <template v-if="userType=='0'">
              <Form ref="infoForm" :model="userInfo" :rules="userRuleValidate"
                    label-position="right" :label-width="90" key="user-form">
                <FormItem label="用户名" prop="username">
                  <Input v-model="userInfo.username" placeholder="username"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                  <Input v-model="userInfo.password" placeholder="password" type="password"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="confirmPassword">
                  <Input v-model="userInfo.confirmPassword" placeholder="confirm password" type="password"></Input>
                </FormItem>
                <FormItem label="姓名" prop="name">
                  <Input v-model="userInfo.name" placeholder="real name"></Input>
                </FormItem>
                <FormItem label="学校" prop="school">
                  <Input v-model="userInfo.school" placeholder="school"></Input>
                </FormItem>
                <FormItem label="年级" prop="grade">
                  <Select v-model="userInfo.grade">
                    <Option value="1">大一</Option>
                    <Option value="2">大二</Option>
                    <Option value="3">大三</Option>
                    <Option value="4">大四</Option>
                  </Select>
                </FormItem>
                <FormItem label="电话" prop="phone">
                  <Input v-model="userInfo.phone" placeholder="phone"></Input>
                </FormItem>
                <FormItem label="微信" prop="weChat">
                  <Input v-model="userInfo.weChat" placeholder="WeChat"></Input>
                </FormItem>
                <FormItem label="qq" prop="qq">
                  <Input v-model="userInfo.qq" placeholder="qq"></Input>
                </FormItem>
                <FormItem label="个性签名" prop="signature">
                  <Input v-model="userInfo.signature" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem>
                  <Button @click="userRegisterSubmit('infoForm')" type="primary">Submit</Button>
                  <Button @click="handleReset('infoForm')" style="margin-left: 8px">Reset</Button>
                </FormItem>
              </Form>
            </template>


            <template v-else>
              <Form ref="infoForm2" :model="orgInfo" :rules="orgRuleValidate"
                    label-position="right" :label-width="90" key="org-form">
                <FormItem label="机构名" prop="username">
                  <Input v-model="orgInfo.username" placeholder="username"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                  <Input v-model="orgInfo.password" placeholder="password" type="password"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="confirmPassword">
                  <Input v-model="orgInfo.confirmPassword" placeholder="confirm password" type="password"></Input>
                </FormItem>
                <FormItem label="负责人姓名" prop="name">
                  <Input v-model="orgInfo.name" placeholder="real name"></Input>
                </FormItem>
                <FormItem label="学校" prop="school">
                  <Input v-model="orgInfo.school" placeholder="school"></Input>
                </FormItem>
                <FormItem label="电话" prop="phone">
                  <Input v-model="orgInfo.phone" placeholder="phone"></Input>
                </FormItem>
                <FormItem label="微信" prop="weChat">
                  <Input v-model="orgInfo.weChat" placeholder="WeChat"></Input>
                </FormItem>
                <FormItem label="qq" prop="qq">
                  <Input v-model="orgInfo.qq" placeholder="qq"></Input>
                </FormItem>
                <FormItem label="个性签名" prop="signature">
                  <Input v-model="orgInfo.signature" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem>
                  <Button @click="userRegisterSubmit('infoForm2')" type="primary">Submit</Button>
                  <Button @click="handleReset('infoForm2')" style="margin-left: 8px">Reset</Button>
                </FormItem>
              </Form>
            </template>
          </Col>
        </Row>
      </Content>
    </Layout>
  </div>

</template>
<script>
  var SHA256 = require("crypto-js/sha256");
  export default {
    data() {
      const validateUserPassConf = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入您的密码'));
        } else if (value !== (this.userType == 0 ? this.userInfo.password : this.orgInfo.password)) {
          callback(new Error('两次密码不一致'));
        } else {
          callback();
        }
      };

      return {
        userRuleValidate: {
          username: [
            {required: true, message: '用户名不能为空',  trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空',  trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, validator: validateUserPassConf,  trigger: 'blur'}
          ],
          name: [
            {required: true, message: '姓名不能为空',  trigger: 'blur'}
          ],
          school: [
            {required: true, message: '学校不能为空',  trigger: 'blur'}
          ],
          grade: [
            {required: true, message: '年级不能为空',  trigger: 'blur'}
          ]
        },

        orgRuleValidate: {
          username: [
            {required: true, message: '机构名不能为空',  trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空',  trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, validator: validateUserPassConf,  trigger: 'blur'}
          ],
          name: [
            {required: true, message: '负责人姓名不能为空',  trigger: 'blur'}
          ],
          school: [
            {required: true, message: '学校不能为空',  trigger: 'blur'}
          ]
        },

        userType: '0',

        defaultAvatarImg: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        avatarImg: 'https://i.loli.net/2017/08/21/599a521472424.jpg',

        userInfo: {
          username: '',
          password: '',
          confirmPassword: '',
          name: '',
          school: '',
          grade: '1',
          phone: '',
          weChat: '',
          qq: '',
          signature: '',
        },

        orgInfo: {
          username: '',
          password: '',
          confirmPassword: '',
          name: '',
          school: '',
          phone: '',
          weChat: '',
          qq: '',
          signature: '',
        }


      };
    },

    methods: {
      dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
      },

      fileToDataURL(file, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {callback(e.target.result);};
        reader.readAsDataURL(file);
      },

      avatarImgUpload(event) {
        var imgFile = event.target.files[0];
        if (!imgFile) {
          this.avatarImg = this.defaultAvatarImg;
          return;
        }

        this.fileToDataURL(imgFile, (url) => {
          this.avatarImg = url;
        });
      },

      userRegisterSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let formData = new FormData();
            formData.append("type", this.userType);

            let info = this.userType == '0' ? this.userInfo : this.orgInfo;
            for(var key in info) {
              if (key == 'confirmPassword') continue;
              else if (key == 'password') {
                formData.append("password", SHA256(info.password).toString());
              }
              else {
                formData.append(key, info[key]);
              }
            }

            if (this.avatarImg != this.defaultAvatarImg) {
              let blob = this.dataURLtoBlob(this.avatarImg);
              formData.append("avatar", blob);
            }

            this.$axios({
              method: 'post',
              url: '/api/v1/user/create',
              data: formData,
              config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
              .then(msg => {
                if (msg.data.code == 200) {
                  this.$Message.success('注册成功！');
                  this.$router.push({name: 'login'});
                }
                else {
                  this.$Message.error(msg.data.msg);
                }
              })
              .catch(err => {
                this.$Message.error(err.response.statusText);
              });
          }
          else {
            this.$Message.error('Fail!');
          }
        })
      },

      handleReset (name) {
        this.$refs[name].resetFields();
      },
    }


  }
</script>


<style scoped>
  .layout {
    min-height: 100%;
    background: #f5f7f9;
    text-align: center;
  }

  .layout-header {
    background-color: #fff;
    margin-bottom: 40px;
  }

  .login-nav {
    float: right;
  }

  .login-nav a {
    margin-left: 10px;
  }

  .avatar-box {
    width: 75%;
    overflow: hidden;
    margin-bottom: 20px;
    position: relative;
  }

  .avatar-box img {
    width: 100%;
    border-radius: 6px;
  }


  .img-upload-box {
    width: 58px;
    height: 58px;
    line-height: 58px;
    cursor: pointer;
    background: #fff;
    border: 1px dashed #dcdee2;
    border-radius: 4px;
    display: inline-block;
  }

  .img-upload-box:hover {
    border-color: #2d8cf0;
  }

  .avatar-upload-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity:0.8;
  }

  #fileInput {
    display: none;
  }

</style>

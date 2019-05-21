<template>
  <div class="contain">
    <h1 class="div-border-bottom">Profile</h1>
    <div class="div-userinfo">
      <h2>Username</h2>
      <Input v-model="userInfo.username" disabled/>

      <h2>Password</h2>
      <Button type="primary" @click="isModifyPassword = !isModifyPassword">Modify</Button>
      <transition name="fade">
        <div class="div-password" v-if="isModifyPassword">
          <h3>Old Password</h3>
          <Input placeholder="Enter old password" v-model="passwdItems.oldPasswd" type="password" clearable/>
          <h3>New Password</h3>
          <Input placeholder="Enter new password" v-model="passwdItems.newPasswd" type="password" clearable/>
          <h3>Confirm Password</h3>
          <Input placeholder="confirm password" v-model="passwdItems.confirmPasswd" type="password" clearable/>
          <Alert class="alert-message" type="error" v-show="passwdItems.newPasswd != passwdItems.confirmPasswd" show-icon>
            两次密码不一致
          </Alert>
        </div>
      </transition>

      <div class="div-basicInf">
        <h1>Basic Information</h1>
        <h2>Name</h2>
        <Input v-model="userInfo.name" placeholder="Enter realname.." clearable  />

        <div style="width: 49%; float: left;">
          <h3>School</h3>
          <AutoComplete v-model="userInfo.school" :data="schools" :filter-method="filterMethod" placeholder="input here">
          </AutoComplete>
        </div>
        <div style="width: 49%; float: right;">
          <h3>Grade</h3>
          <Select v-model="userInfo.grade">
            <Option v-for="item in grades" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>

      <div class="div-otherInf">
        <h1>Contact Information</h1>
        <h2>Phone Number</h2>
        <Input v-model="userInfo.phone" placeholder="Enter phonenumber.." clearable  />
        <h2>Wechat</h2>
        <Input v-model="userInfo.weChat" placeholder="Enter webchat.." clearable  />
        <h2>QQ</h2>
        <Input v-model="userInfo.qq" placeholder="Enter QQ.." clearable  />
      </div>

      <Button type="success" style="margin: 5px 0px 5px 0px" @click="" long>Submit</Button>
    </div>

    <div class="div-avatar">
      <p style="font-size: 22px;">Avatar</p>
      <div style="position: relative;">
        <img :src="userInfo.avatar"/>
        <div class="div-edit-avatar">
          <Icon type="md-create" />
          Edit
        </div>
      </div>
      <Rate allow-half show-text v-model="userInfo.score" disabled>
        <span style="color: #f5a623;position:relative;bottom:2px;">{{ userInfo.score }}</span>
      </Rate>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      userInfo: {
        username: 'hjj',
        name: 'huangjj',
        school: '中山大学',
        grade: '3',
        phone: '123',
        weChat: '456',
        qq: '789',
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        score: 3.3,
      },

      passwdItems: {
        oldPasswd: '',
        newPasswd: '',
        confirmPasswd: ''
      },

      isModifyPassword: false,

      schools:[
        '中山大学'
      ],

      grades:[
        {
          value: '1',
          label: '大一'
        },
        {
          value: '2',
          label: '大二'
        },
        {
          value: '3',
          label: '大三'
        },
        {
          value: '4',
          label: '大四'
        },
      ]

    }

  },

  mounted() {

  },

  computed: {

  },

  methods: {
    filterMethod (value, option) {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },


  }
}
    

</script>


<style scoped>
.contain {
  margin: 15px;
  text-align: left;
  position: relative;
}

h1 {
  border-bottom: 1px solid #e1e4e8;
  padding-bottom: 10px;
}

h2, h3 {
  margin: 10px 0;
}

.div-userinfo {
  width: 80%;
  padding: 20px 50px 0 10px;
}

.div-password {
  border: 1px solid #2db7f5;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
}

.div-basicInf {
  border: 1px solid #ff9900;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  overflow:hidden;
}


.div-otherInf {
  border: 1px solid #19be6b;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
}

.div-avatar {
  position: absolute;
  right: 20px;
  top: 100px;
  width: 20%;
}

.div-avatar img {
  width: 100%;
}

.div-edit-avatar {
  background-color: #24292e;
  border-radius: 6px;
  position: absolute;
  color: #fff;
  bottom: 0;
  left:0;
  margin-left: 8px;
  margin-bottom: 8px;
  padding: 8px 4px;
}

@media screen and (max-width: 800px) {
  .div-avatar {
    display: none;
  }

  .div-userinfo {
    width: 100%;
  }
}


.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

.alert-message {
    margin-top:10px;
    margin-bottom: 10px;
}
</style>

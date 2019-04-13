<template>
    <div>
        <Form :model="userData" :label-width="80">
            <div class="div-border-bottom div-margin">
                <h1 class="text-class">Profile </h1>
                
            </div>
            <div class="userInf-body">
                <div class="div-profile">
                    <div class="div-profile-content div-margin"> 
                        <h2 class="text-class">Username</h2>
                        <Input v-model="userData.username" disabled  style="min-width: 400px"/>
                        <h2 class="text-class">Password</h2>
                        <Button type="primary" @click="display = !display; isModifyPassword = !isModifyPassword">Modify</Button>
                        
                        <transition name="fade">
                            <div class="div-password" v-show="display">
                                <h3>Old Password</h3>
                                <Input placeholder="Enter old password" type="password" prop="passwd" clearable/>
                                <h3>New Password</h3>
                                <Input placeholder="Enter new password" v-model="formItem.passwd" type="password" clearable/>
                                <Alert class="alert-message" type="error" v-show="passwordValidate.errorText != ''" show-icon>{{passwordValidate.errorText}}</Alert>
                                <h3>Confirm Password</h3>
                                <Input placeholder="confirm password" v-model="formItem.passwdCheck" type="password" clearable/>
                                <Alert class="alert-message" type="error" v-show="passwordCheckValidate.errorText != ''" show-icon>{{passwordCheckValidate.errorText}}</Alert>
                            </div>
                        </transition>
                        <div class="div-basicInf">
                            <h1 class="div-border-bottom">Basic Information</h1>
                            <h2 class="text-class">Real Name</h2>
                            <Input v-model="userData.realname" placeholder="Enter realname.." clearable  />
                            <div class="div-schoolInf">
                                <div class="div-schoolselect">
                                    <span class="text-class" style="font-weight: bold">School</span>
                                    <AutoComplete
                                        v-model="formItem.school"
                                        :data="schoolData"
                                        :filter-method="filterMethod"
                                        placeholder="input here"
                                        >
                                    </AutoComplete>
                                </div>
                                <div class="div-gradeselect">
                                    <span class="text-class" style="font-weight: bold">Grade</span>
                                    <Select v-model="formItem.grade">
                                        <Option v-for="item in gradeData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </div>

                            </div>
                           
                        </div>
                        <div class="div-otherInf">
                            
                            <h1 class="div-border-bottom">Other Information</h1>
                            <h2 class="text-class">Name</h2>
                            <Input v-model="userData.nickname" placeholder="Enter nickname.." clearable  />
                            <h2 class="text-class">Phone Number</h2>
                            <Input v-model="userData.phonenumber" placeholder="Enter phonenumber.." clearable  />
                            <h2 class="text-class">Wechat</h2>
                            <Input v-model="userData.wechat" placeholder="Enter webchat.." clearable  />
                            <h2 class="text-class">QQ</h2>
                            <Input v-model="userData.QQ" placeholder="Enter QQ.." clearable  />
                        </div>
                    </div>
                    <Button type="success" style="margin: 5px 0px 5px 0px" @click="" long>Submit</Button>
                </div>
                <div class="div-avatar" v-bind:class="{'avatar-minWidth': screenWidth < 840}">
                    <p class="p-avatar">Avatar</p>
                    <div class="div-image">
                        <img class="avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
                        <div class="div-edit-avatar">
                            <Icon type="md-create" />
                            Edit
                        </div>
                    </div>
                    <Rate allow-half show-text v-model="userData.score" disabled>
                        <span style="color: #f5a623">{{ userData.score }}</span>
                    </Rate>
                </div>
                
            </div>
            
        </Form>
    </div>
</template>


<script>
export default {
    data() {
        return {
            screenWidth: document.body.clientWidth,
      
            
            userData: {
                score: 3.3

            },
            formItem: {
                passwd: '',
                passwdCheck: ''
                    
            },
            isModify: false,
            isModifyPassword: false,
            display: false,

            schoolData:[
                '中山大学',
                '广州大学'
            ],
            gradeData:[
                {
                    value: 'grade_one',
                    label: '大一'
                },
                 {
                    value: 'grade_two',
                    label: '大二'
                },
                 {
                    value: 'grade_three',
                    label: '大三'
                },
                 {
                    value: 'grade_four',
                    label: '大四'
                },
            ]
          
        }

    },
    mounted() {
        const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }

    },
    watch: {
        screenWidth (val) {
            this.screenWidth = val
        }

    },
    computed: {
        passwordValidate: function() {
            var errorText;
            if(!/^[0-9A-Za-z]{6,15}$/.test(this.formItem.passwd)) {
                errorText = '密码少于6位'
            } else {
                errorText = ''
            }
            if(!this.passwordFlag) {
                errorText = ''
                this.passwordFlag = true
            }
            return {
                errorText
            }
        },
        passwordCheckValidate: function() {
            var errorText;
            if(this.formItem.passwdCheck != this.formItem.passwd ){
                errorText = '两次密码不匹配'
            }
            else {
                errorText = ''
            }
            
            if(!this.passwordFlag) {
                errorText = ''
                this.passwordFlag = true
            }
            return {
                errorText
            }
        },
       
    },

    methods: {
        filterMethod (value, option) {
            return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
        },

        userInfModify() {
            //http post
        }

    }
}
    

</script>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

div {
    text-align: left;
    position: relative;
}

h1,h2,h3 {
    margin:5px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0px;
}
.userInf-body {
    display:flex;
    position:relative;
}


.text-class {
    margin:5px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0px;
}

.div-profile {
    width: 66.66%;
    padding: 10px;
    min-width: 500px;
    overflow:hidden;
}

.div-border-bottom {
    border-bottom: 1px solid #e1e4e8;
    margin-bottom: 20px;
    margin-top: 20px;
}

.div-margin {
    margin-left:5px;
    margin-right:5px;
}
.div-password {
    border: 1px solid #2db7f5;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
    min-width: 400px;
    overflow:hidden;
}

.div-basicInf {
    border: 1px solid #ff9900;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
    min-width: 400px;
    overflow:hidden;

}



.div-schoolInf {
    margin-top:15px;
    margin-bottom: 15px;
    display: flex;

}

.div-schoolselect,.div-gradeselect {
    width: 50%;
    margin-right: 5px;
}

.div-otherInf {
    border: 1px solid #19be6b;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
    min-width: 400px;
    overflow:hidden;
                
}

.alert-message {
    margin-top:10px;
    margin-bottom: 10px;
}
.p-avatar {
    font-size: 22px;
}

.div-avatar {
    float:right;
    margin: 10px;
    text-align: left;
    position:relative;
    width:33.33%;
    
}

.avatar-minWidth {
    display: none;
}

.avatar {
    border-radius : 6px;
    line-height: 1;
    overflow: hidden;
    vertical-align: middle;
    width: 200px;
    height: 200px;
    position: relative;
}


.div-edit-avatar {
    background-color: #24292e;
    border-radius: 6px;
    position: absolute;
    color: #fff;
    bottom: 0px;
    left:0px;
    margin-left: 8px;
    margin-bottom: 8px;
    padding: 8px 4px 8px 4px;
}


</style>
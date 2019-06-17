<template>
  <div class="layout">
    <Layout>
      <Header class="layout-header">
        <span class="login-nav">
          <router-link to="/MainPage">主站</router-link>
        </span>
      </Header>
      <Content>
        <div class="content">
          <div class="h">
            <img :src="userInfo.avatar">
            <div class="username">
              {{userInfo.username}}
              <Rate allow-half show-text disabled v-model="userInfo.score">
                <span style="color: #f5a623">{{userInfo.score}}</span>
              </Rate>
            </div>
            <div class="action">
              <Dropdown>
                <a href="javascript:void(0)">
                  <Icon type="ios-more" size="24" color="white"/>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-if="userInfo.type==1" @click.native="follow">关注</DropdownItem>
                  <DropdownItem @click.native="addBlackList">加入黑名单</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>


          <Tabs value="info">
            <TabPane label="个人信息" name="info">
              <div class="info">
                <h2>个人信息</h2>
                <div v-if="userInfo.type==0" class="info-row">性名： <span>{{userInfo.name}}</span></div>
                <div v-else class="info-row">负责人： <span>{{userInfo.name}}</span></div>
                <div class="info-row">学校： <span>{{userInfo.school}}</span></div>
                <div v-if="userInfo.type==0" class="info-row">年级： <span>{{userInfo.grade}}</span></div>
                <div class="info-row">电话： <span>{{userInfo.phone}}</span></div>
                <div class="info-row">微信： <span>{{userInfo.wechat}}</span></div>
                <div class="info-row">qq： <span>{{userInfo.qq}}</span></div>
              </div>
            </TabPane>

            <TabPane label="正在发布的任务" name="publishingTasks">
              <ul>
                <li v-for="task in publishingTasks">
                  <router-link :to="'/MainPage/taskDetail/' + task.task_id">
                    <Row class="history">
                      <Col span="16">
                        <h2 style="margin-bottom: 10px;">
                          {{task.title}}
                          <span style="color:#ed4014; margin-left: 10px;">
                              {{task.money}}￥
                          </span>
                        </h2>
                        <p>{{task.introduction}}</p>
                      </Col>
                      <Col span="8" style="text-align: center; position: absolute; right: 0; bottom: 25px;">
                        <p>{{task.starttime}} ~</p>
                        <p>{{task.endtime}}&nbsp;&nbsp;&nbsp;</p>
                      </Col>
                    </Row>
                  </router-link>
                </li>
              </ul>
            </TabPane>

            <TabPane v-if="userInfo.type==0" label="正在完成的任务" name="finishingTasks">
              <ul>
                <li v-for="task in finishingTasks">
                  <router-link :to="'/MainPage/taskDetail/' + task.task_id">
                    <Row class="history">
                      <Col span="16">
                        <h2 style="margin-bottom: 10px;">
                          {{task.title}}
                          <span style="color:#ed4014; margin-left: 10px;">
                              {{task.money}}￥
                          </span>
                        </h2>
                        <p>{{task.introduction}}</p>
                      </Col>
                      <Col span="8" style="text-align: center; position: absolute; right: 0; bottom: 25px;">
                        <p>{{task.starttime}} ~</p>
                        <p>{{task.endtime}}&nbsp;&nbsp;&nbsp;</p>
                      </Col>
                    </Row>
                  </router-link>
                </li>
              </ul>
            </TabPane>

            <TabPane label="发布过的任务" name="publishedTasks">
              <ul>
                <li v-for="task in publishedTasks">
                  <router-link :to="'/MainPage/taskDetail/' + task.task_id">
                    <Row class="history">
                      <Col span="16">
                        <h2 style="margin-bottom: 10px;">
                          {{task.title}}
                          <span style="color:#ed4014; margin-left: 10px;">
                              {{task.money}}￥
                          </span>
                        </h2>
                        <p>{{task.introduction}}</p>
                      </Col>
                      <Col span="8" style="text-align: center; position: absolute; right: 0; bottom: 25px;">
                        <p>{{task.updatedAt}}</p>
                      </Col>
                    </Row>
                  </router-link>
                </li>
              </ul>
            </TabPane>

            <TabPane v-if="userInfo.type==0" label="已完成的任务" name="finishedTasks">
              <ul>
                <li v-for="task in finishedTasks">
                  <router-link :to="'/MainPage/taskDetail/' + task.task_id">
                    <Row class="history">
                      <Col span="16">
                        <h2 style="margin-bottom: 10px;">
                          {{task.title}}
                          <span style="color:#ed4014; margin-left: 10px;">
                              {{task.money}}￥
                          </span>
                        </h2>
                        <p>{{task.introduction}}</p>
                      </Col>
                      <Col span="8" style="text-align: center; position: absolute; right: 0; bottom: 10px;">
                        <p>{{task.updatedAt}}</p>
                        <Rate allow-half show-text disabled v-model="task.tr.score">
                          <span style="color: #f5a623">{{task.tr.score}}</span>
                        </Rate>
                      </Col>
                    </Row>
                  </router-link>
                </li>
              </ul>
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
        userInfo: {},
        publishingTasks: [],
        publishedTasks: [],
        finishingTasks: [],
        finishedTasks: []
      };
    },

    methods: {
      getInfo() {
        this.userInfo = {};
        this.publishingTasks = this.publishedTasks = [];
        this.finishingTasks = this.finishedTasks = [];

        this.$axios.get('/api/v1/user/getuser?username='+ this.$route.params.username)
          .then(msg => {
            if (msg.data.code == 200) {
              this.userInfo = msg.data.data;
            }
          })
          .catch(err => {
            this.$Message.error('用户不存在！');
          });


        this.$axios.get('/api/v1/task/findByPublisher?publisher='+ this.$route.params.username)
          .then(msg => {
            if (msg.data.code == 200) {
              this.publishingTasks = this.filterTaskType(msg.data.data, [0, 1, 2]);
              this.publishedTasks = this.filterTaskType(msg.data.data, [3]);
              this.addTaskTr(this.publishingTasks, this.$route.params.username);
              this.addTaskTr(this.publishedTasks, this.$route.params.username);
            }
          });

        this.$axios.get('/api/v1/task/findByAccepter?username='+ this.$route.params.username)
          .then(msg => {
            if (msg.data.code == 200) {
              this.finishingTasks = this.filterTaskType(msg.data.data, [1, 2]);
              this.finishedTasks = this.filterTaskType(msg.data.data, [3]);
              this.addTaskTr(this.finishingTasks, this.$route.params.username);
              this.addTaskTr(this.finishedTasks, this.$route.params.username);
            }
          });
      },


      filterTaskType(arr, states) {
        return arr.filter((task) => {
          return states.includes(task.state);
        });
      },

      addTaskTr(arr, username) {
        arr.forEach((task) => {
          task.tr = task.trs.find((tr) => {
            return tr.username == username;
          });
        });
      },

      addBlackList() {
        this.$axios({
          method: 'post',
          url: "/api/v1/user/userblacklist",
          data: {
            "username1": this.$route.params.username,
          }
        })
          .then(msg => {
            if (msg.data.code == 200) {
              this.$Message.success(msg.data.msg);
            }
            else {
              this.$Message.error(msg.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
            this.$Message.error(err.response.data.msg);
          });
      },

      follow() {
        this.$axios.post('/api/v1/user/follow', {
          ins_name: this.$route.params.username
        })
          .then(msg => {
            if (msg.data.code == 200) {
              this.$Message.success(msg.data.msg);
            }
            else {
              this.$Message.error(msg.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
            this.$Message.error(err.response.data.msg);
          });
      }
    },

    created() {
      this.getInfo();
    },

    watch: {
      '$route.params': 'getInfo'
    }

  }
</script>


<style scoped>
  .layout {
    min-height: 100%;
    background: #f5f7f9;
    text-align: left;
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

  .content {
    width: 80%;
    margin: 0 auto;
  }

  .h {
    /*background: #19be6b;*/
    overflow: hidden;
    position: relative;
    background-image: url(http://139.196.79.193:3000/userInfobg.png);
    background-size: cover;
    box-shadow: 0 0 0 1px #eee;
    border-radius: 4px;
  }

  .h img {
    float: left;
    width: 120px;
    height: 120px;
  }

  .h .username {
    margin: 20px;
    color: #fff;
    font-size: 24px;
    position: absolute;
    bottom: 0;
    left: 120px;
  }

  .name {
    margin-top: 16px;
  }

  .ivu-dropdown {
    color: #fff;
    float: right;
    margin: 5px 40px 0 0;
  }

  .info, .history {
    padding: 20px;
    border-radius: 10px;
    margin-top: 10px;
    min-width: 400px;
    overflow: hidden;
    background: #fff;
  }

  .info-row {
    margin-bottom: 20px;
  }

  .info h2, .history h2 {
    margin-bottom: 25px;
  }

  ul {
    list-style: none;
  }

  li {
    position: relative;
  }

  a {
    color: #515a6e;
  }

</style>

<style>
  .ivu-tabs-bar {
    margin-bottom: 0;
    margin-top: 16px;
  }
</style>

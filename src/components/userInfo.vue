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
            <img :src="userInfo.avatar" alt="">
            <div class="username">{{userInfo.username}}</div>
            <div class="action">
              <Dropdown>
                <a href="javascript:void(0)">
                  <Icon type="ios-more" size="24" color="white"/>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>加入黑名单</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>


          <Tabs value="info">
            <TabPane label="个人信息" name="info">
              <div class="info">
                <h2>个人信息</h2>
                <div class="info-row">性名： <span>{{userInfo.name}}</span></div>
                <div class="info-row">学校： <span>{{userInfo.school}}</span></div>
                <div class="info-row">年级： <span>{{userInfo.grade}}</span></div>
                <div class="info-row">电话： <span>{{userInfo.phone}}</span></div>
                <div class="info-row">微信： <span>{{userInfo.wechat}}</span></div>
                <div class="info-row">qq： <span>{{userInfo.qq}}</span></div>
              </div>
            </TabPane>

            <TabPane label="正在发布的任务" name="waitedTask">
              <ul>
                <li v-for="task in waitedTasks">
                  <router-link :to="'/MainPage/taskDetail/' + task.taskId">
                    <Row class="history">
                      <Col span="16">
                        <h2>历史任务</h2>
                        <h3 style="margin-bottom: 5px;">
                          {{task.title}}
                          <span style="color:#ed4014; margin-left: 10px;">
                              {{task.money}}￥
                            </span>
                        </h3>
                        <p>{{task.introduction}}</p>
                      </Col>
                      <Col span="8" style="text-align: center; position: absolute; right: 0; bottom: 40px;">
                        <p>{{task.starttime}} ~</p>
                        <p>{{task.endtime}}&nbsp;&nbsp;&nbsp;</p>
                      </Col>
                    </Row>
                  </router-link>
                </li>
              </ul>
            </TabPane>

            <TabPane label="发布过的任务" name="publishedFinishedTask">
              <ul>
                <li v-for="task in publishedFinishedTasks">
                  <router-link :to="'/MainPage/taskDetail/' + task.taskId">
                    <Row class="history">
                      <Col span="16">
                        <h2>历史任务</h2>
                        <h3 style="margin-bottom: 5px;">
                          {{task.title}}
                          <span style="color:#ed4014; margin-left: 10px;">
                              {{task.money}}￥
                            </span>
                        </h3>
                        <p>{{task.introduction}}</p>
                      </Col>
                      <Col span="8" style="text-align: center; position: absolute; right: 0; bottom: 10px;">
                        <p>{{task.endtime}} </p>
                        <Rate allow-half show-text disabled v-model="task.score">
                          <span style="color: #f5a623">{{task.score}}</span>
                        </Rate>
                      </Col>
                    </Row>
                  </router-link>
                </li>
              </ul>
            </TabPane>

            <TabPane label="已完成的任务" name="finishedTask">
                <ul>
                  <li v-for="task in finishedTasks">
                    <router-link :to="'/MainPage/taskDetail/' + task.taskId">
                      <Row class="history">
                        <Col span="16">
                          <h2>历史任务</h2>
                          <h3 style="margin-bottom: 5px;">
                            {{task.title}}
                            <span style="color:#ed4014; margin-left: 10px;">
                              {{task.money}}￥
                            </span>
                          </h3>
                          <p>{{task.introduction}}</p>
                        </Col>
                        <Col span="8" style="text-align: center; position: absolute; right: 0; bottom: 10px;">
                          <p>{{task.endtime}} </p>
                          <Rate allow-half show-text disabled v-model="task.score">
                            <span style="color: #f5a623">{{task.score}}</span>
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

        waitedTasks: [],

        publishedFinishedTasks: [],

        finishedTasks: []
      };
    },

    methods: {
      getInfo() {
        this.userInfo = {};
        this.waitedTasks = this.publishedFinishedTasks = this.finishedTasks = [];

        this.$axios.get('/api/v1/user/getuser?username='+ this.$route.params.username)
          .then(msg => {
            if (msg.data.code == 200) {
              this.userInfo = msg.data.data;
            }
          })
          .catch(err => {
            this.$Message.error('用户不存在！');
          });

        this.$axios.get('/api/v1/user/getAcceptedFinishedTasks?username='+ this.$route.params.username)
          .then(msg => {
            if (msg.data.code == 200) {
              this.finishedTasks = msg.data.data;
            }
          });

        this.$axios.get('/api/v1/user/getPublishedFinishedTasks?username='+ this.$route.params.username)
          .then(msg => {
            if (msg.data.code == 200) {
              this.publishedFinishedTasks = msg.data.data;
            }
          });

        this.$axios.get('/api/v1/user/getPublishedWaitedTasks?username='+ this.$route.params.username)
          .then(msg => {
            if (msg.data.code == 200) {
              this.waitedTasks = msg.data.data;
            }
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

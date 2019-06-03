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
                </li>
              </ul>
            </TabPane>

            <TabPane label="已完成的任务" name="finishedTask">
                <ul>
                  <li v-for="task in finishedTasks">
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
        userInfo: {
          username: 'hjj',
          name: 'huangjj',
          school: '中山大学',
          grade: '3',
          phone: '123',
          wechat: '456',
          qq: '789',
          avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          score: 3.3,
        },

        waitedTasks: [
          {
            "taskId": 1,
            "title": "问卷调查",
            "introduction": "可能会发生这样的情况：当一个道具在激活状态时，另一个道具与挡板发生了接触。在这种情况下我们有超过1个在当前PowerUps容器中处于激活状态的道具。然后，当这些道具中的一个被停用时，我们不应使其效果失效因为另一个相同类型的道具仍处于激活状态。出于这个原因，我们使用isOtherPowerUpActive检查是否有同类道具处于激活状态。只有当它返回false时，我们才停用这个道具的效果。这样，给定类型的道具的持续时间就可以延长至最近一次被激活后的持续时间。",
            "starttime": "2019-05-01 00:00:00",
            "endtime": "2019-05-02 00:00:00",
            "score": 3.5,
            "money": 12
          },
          {
            "taskId": 2,
            "title": "问卷调查",
            "introduction": "",
            "starttime": "2019-05-01 00:00:00",
            "endtime": "2019-05-02 00:00:00",
            "score": 3.5,
            "money": 12
          }
        ],
        publishedFinishedTasks: [
          {
            "taskId": 1,
            "title": "问卷调查",
            "introduction": "可能会发生这样的情况：当一个道具在激活状态时，另一个道具与挡板发生了接触。在这种情况下我们有超过1个在当前PowerUps容器中处于激活状态的道具。然后，当这些道具中的一个被停用时，我们不应使其效果失效因为另一个相同类型的道具仍处于激活状态。出于这个原因，我们使用isOtherPowerUpActive检查是否有同类道具处于激活状态。只有当它返回false时，我们才停用这个道具的效果。这样，给定类型的道具的持续时间就可以延长至最近一次被激活后的持续时间。",
            "starttime": "2019-05-01 00:00:00",
            "endtime": "2019-05-02 00:00:00",
            "score": 3.5,
            "money": 12
          }
        ],

        finishedTasks: [
          {
            "taskId": 2,
            "title": "问卷调查",
            "introduction": "",
            "starttime": "2019-05-01 00:00:00",
            "endtime": "2019-05-02 00:00:00",
            "score": 3.5,
            "money": 12
          }
        ]
      };
    },

    methods: {

    },

    created() {
      this.$axios.get('/user/getAcceptedFinishedTasks?username='+ this.$route.params.username)
      .then(msg => {
        if (msg.data.code == 200) {
          this.finishedTasks = msg.data.data;
        }
      });

      this.$axios.get('/user/getPublishedFinishedTasks?username='+ this.$route.params.username)
      .then(msg => {
        if (msg.data.code == 200) {
          this.publishedFinishedTasks = msg.data.data;
        }
      });

      this.$axios.get('/user/getPublishedWaitedTasks?username='+ this.$route.params.username)
      .then(msg => {
        if (msg.data.code == 200) {
          this.waitedTasks = msg.data.data;
        }
      });

      this.$axios.get('/user/getuser?username='+ this.$route.params.username)
      .then(msg => {
        if (msg.data.code == 200) {
          this.userInfo = msg.data.data;
        }
      });
    },

    mounted() {
       // $('ul').delegate('.ivu-rate-star', 'click', (e) => {
       //   console.log(e);
       // });
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
  background-image: url("http://pic41.nipic.com/20140519/18505720_094554360140_2.jpg");
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

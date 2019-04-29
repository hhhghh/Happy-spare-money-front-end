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
            <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" alt="">
            <div class="username">昵称</div>
            <div class="action">
              <Dropdown>
                <a href="javascript:void(0)">
                  <Icon type="ios-more" size="24" color="white"/>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>加入黑名单</DropdownItem>
                  <DropdownItem>举报</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div class="info">
            <h2>个人信息</h2>
            <div class="info-row">性名： <span>张三</span></div>
            <div class="info-row">学校： <span>中山大学</span></div>
            <div class="info-row">年级： <span>大三</span></div>
            <div class="info-row">电话： <span>123456789</span></div>
            <div class="info-row">微信： <span>123456789</span></div>
            <div class="info-row">qq： <span>123456789</span></div>
          </div>
          <div class="history">
            <h2>历史任务</h2>
            <ul>
              <li>
                <h3>xxxxxx问卷调查</h3>
                <div>2019-04-26 13:17:10</div>
                <Rate allow-half v-model="valueHalf" />
                <Divider />
              </li>
              <li>
                <h3>xxxxxx问卷调查</h3>
                <div>2019-04-26 13:17:10</div>
                <Rate allow-half v-model="valueHalf" />
                <Divider />
              </li>
            </ul>
          </div>
        </div>
      </Content>
    </Layout>
  </div>

</template>
<script>
  export default {
    data() {
      return {


      };
    },
    methods: {

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
</style>

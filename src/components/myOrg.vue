/* eslint-disable */

<template>
  <div class="content-body">
    <div class="content">
      <div class="content-selector-block">
        <div style="margin-left: 15px;">
          <Breadcrumb>
            <BreadcrumbItem to="/MainPage/myGroup">我的机构</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <Divider></Divider>

      <div v-if="orgList.length != 0" class="group-content">
        <div class="div-flex" v-for="org in orgList" :key="org.orgname">
          <div :class="['group-card', {'group-card-mouseenter': enterName == org.orgname}]"
               @mouseenter="enterName = org.orgname" @mouseleave="enterName = ''"
               @click="showOrgFollow(org.orgname)" >
            <div class="orgname-block">
              <div style="display: inline">
                <Avatar :src="org.orgavatar" />
              </div>
              <div class="org-name">
                <span>{{org.orgname}}</span>
              </div>
            </div>
            <div class="signature-block">
              <span>{{org.orgsignature}}</span>
            </div>

            <Drawer
              width="50"
              :mask-closable="false"
              :closable="false"
              :transfer="false"
              :inner="true"
              :scrollable="false"
              :value="showDrawer == org.orgname">
              <div class="button-block">
                <Button type="primary" @click="cancelfollow(org.orgname)">取消关注</Button>
              </div>
              <div class="button-block">
                <Button type="primary" @click="gotoOrg(org.orgname)">查看详情</Button>
              </div>
            </Drawer>
          </div>
        </div>
      </div>

      <div v-else class="group-content">
        <div class="search-result">
          你还没有关注机构，赶紧去关注吧！
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['userInfo'],
    data() {
      return {
        orgList: [],
        showDrawer: '',
        enterName: ''
      };
    },
    methods: {
      showOrgFollow(orgname) {
        if (this.showDrawer != orgname) this.showDrawer = orgname;
        else this.showDrawer = '';
      },

      getMyOrg() {
        this.$axios.get('/api/v1/user/getUsersFollowedOrganizationsList')
          .then(msg => {
            if (msg.data.code == 200) {
              this.orgList = msg.data.data;
            }
          })
      },

      gotoOrg(orgname) {
        this.$router.push({path: `/user/` + orgname});
      },

      cancelfollow(orgname) {
        this.$axios.post('/api/v1/user/cancelfollow', {
          ins_name: orgname
        })
          .then(msg => {
            if (msg.data.code == 200) {
              this.$Message.success(msg.data.msg);
              let i = this.orgList.findIndex((org) => {
                return org.orgname == orgname;
              });
              if (i != -1) this.orgList.splice(i, 1);
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

      sendToMainPage() {
        let data = {
          active: '3-2',
          open: '3'
        };
        this.$emit('menuSelected', data);
      },
    },
    mounted: function() {
      this.getMyOrg();
      this.sendToMainPage();
    }


  }
</script>

<style scoped>
  span {
    margin:3px;
  }

  .content {
    background:#f8f8f9;
    padding:15px;
  }

  .content-selector-block {
    position:relative;
    z-index: 999;
    margin: 10px;
  }


  .group-content {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width:100%;
  }

  .div-flex {
    flex-basis: 25%;
  }

  .group-card {
    position:relative;
    border: 1px solid #2d8cf0;
    border-radius: 5px;
    height: 160px;
    width: 90%;
    margin: 15px;
    float: left;
    box-shadow: 4px 4px 10px #80848f;
  }

  .group-card-mouseenter {
    box-shadow: 4px 4px 10px #1c2438;
  }

  .org-name{
    font-size: 20px;
    margin: 10px;
    vertical-align: middle;
    display: inline
  }


  .orgname-block {
    height: 30%;
    overflow: hidden;
  }

  .signature-block {
    height: 70%;
    overflow: auto;
  }

  .button-block {
    margin: 21px 0;
    text-align: center;
  }

  .search-result {
    margin: auto;
    font-size: 12pt;
  }


</style>

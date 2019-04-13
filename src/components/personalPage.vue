<template>
    <div class="personal-page-body">
        <div class="sider">
            <Layout>
                <Header class="layout-header" >
                    <div class="layout-header-right">
                        <Avatar class="avatar" icon="ios-person"  />
                        <a href="javascript:void(0)" v-show="!isLogin" v-on:click="isLogin = !isLogin" >
                            <span class="uniform-fontsize" style="margin: 7px; color:#2d8cf0;position: relative;top: 2px">登陆</span>
                        </a>
                        <Dropdown v-show="isLogin">
                            <a href="javascript:void(0)" style="margin: 7px;">
                                <Icon type="ios-arrow-down" size="24" style="color:#2d8cf0" v-on:click="isLogin = !isLogin"/>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem><div @click="jumpToPersonalPage()">个人信息</div></DropdownItem>
                                <DropdownItem><div @click="jumpToMainPage()">主页</div></DropdownItem>
                                <DropdownItem><div @click="jumpToLoginPage()">注销</div></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    
                    </div>
                </Header>
                <Layout class="layout-bottom">
                    <Sider class="layout-sider">
                        <Menu active-name="1-1" theme="dark" width="auto" >
                            <MenuItem name="1-1">
                                <span>个人信息</span>
                            </MenuItem>
                            <MenuItem name="1-2">
                                <span>充值</span>
                            </MenuItem>
                            <MenuItem name="1-3">
                                <span>提现</span>
                            </MenuItem>
                        </Menu>
                    </Sider>
                     <div class="content">
                        <router-view></router-view>
                    </div>
                </Layout>
            </Layout>

        </div>
       
    </div>
</template>

<script>
export default {

}
</script>


<style scoped>

.uniform-fontsize {
    font-size: 16px;
}
div {
    margin:0px;
    padding: 0px;
}

.layout-header{
    right:0px;
    left:0px;
    position:fixed;
    z-index: 1000;
    vertical-align: middle;
    background: #363e4f;
   
    height:70px;
    
}

.layout-header-right {
    float: right;
    vertical-align: middle;
    line-height: 70px;
    position:relative;
    right: 30px;
}

.layout-bottom{
    position:relative;
    top:68px;
    width:auto;
    over-flow:hidden;
    text-align: center;
        
}

.layout-sider {
    position:fixed;
    top:70px;
    bottom:0px;
    left:-1px;
    border-top: 1px solid #000000;   
    z-index: 10;
}

.content {
    position:absolute;
    left:200px;
    right:0px;

}

</style>
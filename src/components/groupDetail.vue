/* eslint-disable */

<template>
    <div class="content-body">
        <div class="content"> 
            <div class="content-selector-block">
                <div style="margin-left: 15px;">
                    <Breadcrumb>
                        <BreadcrumbItem to="/MainPage/myGroup">我的小组</BreadcrumbItem>
                        <BreadcrumbItem :to="{name: 'groupDetail', params: {id: team_id, group: group}}">小组详情</BreadcrumbItem>
                        <BreadcrumbItem>{{group.team_name}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>

            <Divider></Divider>

            <div class="main-content">
                <div class="left-content">
                    <div class="logo-block">
                        <img class="logo-image" id="logo" :src="group.logo" alt="Group Logo">
                    </div>
                    <div class="group-name">{{group.team_name}}</div>
                    <div class="modify-info">
                        <Button class="button-modify" type="info" :to="{name: 'modifyGroupInfo', params: {id: team_id, group: group}}">修改资料</Button>
                    </div>
                </div>
                <div class="middle-content">
                    <div class="description-block">
                        <div class="property">Description</div>
                        <div class="description">
                            <span class="span">{{group.description}}</span>
                        </div>
                    </div>
                    <div class="limit-block">
                        <div class="property">Limit: </div>
                        <div class="limit">{{group.limit == 0 ? '允许所有人' : (group.limit == 1 ? '需要审核' : '禁止所有人')}}</div>
                    </div>
                    <div class="createAt-block">
                        <div class="property">Create Time: </div>
                        <div class="createAt">{{group.createAt}}</div>
                    </div>
                    <div class="tags-block">
                        <div class="property">Team Labels: </div>
                        <div class="tags-list">
                            <Tag type="dot" color="primary" class="tags" v-for="item in group.teamlabels" :key="item.label" :name="item.label">{{ item.label }}</Tag>
                        </div>
                    </div>
                </div>

                <div class="right-content">
                    <div class="property">
                        <span>Member List</span>
                    </div>
                    <div class="member-list">
                        
                        <div class="member-item" v-for="item in memberList" v-bind:key="item.id">
                            <div class="profile">
                                <Avatar :src="item.profile" size="small"/>
                            </div>
                            <div class="member-username">
                                <span class="username-span">{{item.username}}</span>
                            </div>
                            <Button class="button-blacklist">移除</Button>
                            <Button class="button-blacklist">拉黑</Button>
                        </div>
                        <div class="withdraw">
                            <Button class="invite-button" type="dashed" long icon="ios-add" @click="showDrawer=true">Add</Button>
                            <Button class="withdraw-button" type="error" long>退出该小组</Button>
                        </div>
                        <Drawer 
                            title="Invite users" 
                            v-model="showDrawer" 
                            width="100"
                            :mask-closable="false"
                            :transfer="false"
                            :inner="true"
                        >
                            <Form label-position="top">
                                <FormItem label="Invited Members">
                                    <div class="div-flex" >
                                        <Input v-model="currentInvitedMember" placeholder="Enter Invited Member's ID" style="margin: 5px 0px"></Input>
                                        <Button type="dashed" long icon="md-add" @click="addInvitedMember">Add</Button>
                                    </div>
                                    <Row>
                                        <Tag type="border" color="primary" class="margin-left" v-for="item in inviteList" :key="item" :name="item" closable @on-close="handleClose">用户{{ item }}</Tag>
                                    </Row>
                                </FormItem>
                            </Form>
                            <div class="invite-complite">
                                <Button type="success" long @click="inviteMembersComplite">完成添加</Button>
                            </div>
                        </Drawer>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            team_id: '',

            group: '',  

            showDrawer: false,

            defaultMemberList: [
                {
                    username: 'hhyx',
                    profile: 'http://b-ssl.duitang.com/uploads/item/201806/09/20180609000003_ohnif.thumb.700_0.jpeg'
                },
                {
                    username: 'hzhh',
                    profile: 'http://b-ssl.duitang.com/uploads/item/201603/06/20160306000131_umz3e.thumb.700_0.jpeg'
                },
                {
                    username: 'HeChX',
                    profile: 'http://b-ssl.duitang.com/uploads/item/201712/13/20171213174628_LPhyB.jpeg'
                },
                {
                    username: 'Howlyao',
                    profile: 'http://b-ssl.duitang.com/uploads/item/201807/11/20180711023335_hdict.thumb.700_0.jpeg'
                },
                {
                    username: 'GZQ',
                    profile: 'http://img5.imgtn.bdimg.com/it/u=1695651906,2949326307&fm=26&gp=0.jpg'
                },
                {
                    username: 'Huang-Junjie',
                    profile: 'http://b-ssl.duitang.com/uploads/item/201807/11/20180711023311_exhzp.jpeg'
                },
            ],

            memberList: [],

            currentInvitedMember: '',

            inviteList: [],
        };
    },
    methods: {
        addInvitedMember() {
            if (this.currentInvitedMember !== '') {
                if (-1 == this.inviteList.indexOf(this.currentInvitedMember))
                    this.inviteList.push(this.currentInvitedMember);
            }
        },
        handleClose(event, name) {
            const index = this.inviteList.indexOf(name);
            this.inviteList.splice(index, 1);
        },
        inviteMembersComplite() {
            this.showDrawer = false;
        },
    },
    mounted: function() {
        this.team_id = this.$route.params.id;
        this.group = this.$route.params.group;

        this.memberList = [];
        for (let i = 0, len = this.group.members.length; i < len; i++) {
            for (let j = 0, len2 = this.defaultMemberList.length; j < len2; j++) {
                if (this.group.members[i].member_username == this.defaultMemberList[j].username) {
                    this.memberList.push(this.defaultMemberList[j]);
                    break;
                }
            }
        }
    },


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

.selector {
    position: relative;
    margin: 10px;
    width: 25%;
}

.content-selector-block {
    position:relative;
    z-index: 999;
    margin: 10px;
}

.main-content {
    display: flex;
}

.flex-content {
    flex: 0 1 32%;
    margin: 0px 5px;
}


.left-content {
    flex: 1 1 25%;
    margin: 0px 5px;
}

.logo-block {
    width: 200px;
    height: 200px;
    margin: auto;
}

.group-name {
    margin: 10px auto;
    text-align: center;
    font-size: 15pt;
    width: 200px;
}

.logo-image {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.modify-info {
    margin: 10px auto;
    text-align: center;
}

.button-modify {
    margin: auto;
    width: 50%;
}

.middle-content {
    flex: 1 1 40%;
    margin: 0px 5px;
}

.property {
    display: inline-block;
    width: 30%;
    font-size: 12pt;
    margin: 5px;
}

.description {
    border: 1px solid #dcdee2;
    border-radius: 5px;
    background-color: #ffffff;
    height: 96px;
    font-size: 10pt;
    padding: 5px;
}

.limit {
    display: inline-block;
}

.createAt {
    display: inline-block;
}

.tags-list {
    display: inline-block;
    vertical-align: top;
}

.tags {
    display: block;
}

.right-content {
    flex: 1 1 30%;
    margin: 0px 5px;
    padding-left: 50px;
    padding-right: 10px;
}

.member-list {
    background-color: #ffffff;
    padding: 5px;
    position: relative;
}

.member-item {
    height: 30px;
    margin: 5px 0px;
}

/* .member-item:hover {
    border-top: 1px solid #5cadff;
    border-bottom: 1px solid #5cadff;
} */

.profile {
    display: inline-block;
    height: 30px;
    width: 30px;
}

.profile-img {
    height: 24px;
    width: 24px;
}

.member-username {
    display: inline-block;
    vertical-align: middle;
}

.username-span {
    font-size: 12pt;
}

.button-blacklist {
    float: right;
    padding: 3px 15px;
    margin: 1.5px 3px;
}

.withdraw {
    margin-top: 20px;
}

.invite-button {
    margin: 5px 0;
}

.withdraw-button {
    margin: 5px 0;
}

</style>

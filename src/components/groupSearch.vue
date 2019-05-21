/* eslint-disable */

<template>
    <div class="content-body">
        <div class="content">
            <div class="content-selector-block">
                <div class="selector">
                    <Input v-model="input" placeholder="Search Group">
                        <Select v-model="groupAttribute" slot="prepend" style="width:80px" label="小组ID">
                            <Option v-for="item in groupAttributeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Button slot="append" icon="ios-search" @click="searchGroup"></Button>
                    </Input>
                </div>
            </div>

            <Divider>Group</Divider>

            <div v-if="teams.length != 0" class="group-content">
                <div class="div-flex" v-for="item in teams" v-bind:key="item.id">
                    <div v-bind:class="{'group-card':true,'group-card-mouseenter': enterid == item.team_id, 'group-card-mouseleave':!(enterid == item.team_id)}"
                    v-on:mouseenter="enterid = item.team_id" v-on:mouseleave="enterid = 0" @click="getGroupItem(item.team_id)" >
                        <div class="top-block">
                            <div class="group-image" style="display: inline">
                                <Avatar :src="item.logo" > U</Avatar>
                            </div>
                            <div class="group-name" style="display: inline">
                                <span>{{item.team_name}}</span>
                            </div>
                        </div>
                        <div class="middle-block">
                            <div class="group-description">
                                <span>{{item.description}}</span>
                            </div>
                        </div>
                        <div class="bottom-block">
                            <div class="group-tags" style="display: inline">
                                <Icon type="md-pricetags" />
                                <Tag type="border" class="tags" v-for="item in item.teamlabels" :key="item.label" :name="item.label">{{ item.label }}</Tag>
                            </div>
                            <div class="group-members" style="display: inline">
                                <Icon type="md-person" />
                                <span>{{item.members.length}}</span>
                            </div>
                        </div>
                        
                        <div class="group-simpleinfo"> 
                            <span>{{item.simpleinfo}} </span>
                        </div>
                        
                        <Drawer 
                            width="50" 
                            :mask-closable="false" 
                            :closable="false" 
                            :transfer="false" 
                            :inner="true" 
                            :scrollable="false"
                            :value="showDrawer == item.team_id"
                        >
                            <div class="applyJoin-block">
                                <Button type="primary" @click="applyJoinGroup(item.team_id)">申请进群</Button>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </div>        
            <div v-else class="group-content">
                <div class="search-result">
                    <span v-if="first">请输入想搜索的小组的条件</span>
                    <span v-else>{{errorMessage}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            groupAttributeList: [
                {
                    value: 'group_id',
                    label: '小组ID'
                },
                {
                    value: 'group_name',
                    label: '小组名字'
                },
                {
                    value: 'group_tag',
                    label: '小组标签'
                }
            ],
            groupAttribute: 'group_id',

            errorMessage: '',

            input: '',

            enterid: 0,

            first: true,

            default_teams: [
                {   
                    team_id: 1,
                    team_name: 'group1', 
                    leader: 'hhyx',
                    logo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556460005123&di=70167f3e40d02f2764db7079522fc646&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F09%2F11%2F2157d55a32f1e7f.jpg',
                    createAt: '2019-04-28 00:00:00',
                    description: 'This is group1',
                    limit: 0,
                    teamlabels: [
                        {
                            label: '羽毛球'
                        },
                        {
                            label: '足球'
                        }
                    ],
                    members: [
                        {
                            member_username: 'hhyx'
                        },
                        {
                            member_username: 'hzhh'
                        },
                        {
                            member_username: 'HeChX'
                        },
                        {
                            member_username: 'Howlyao'
                        },
                    ],
        

                },
                {   
                    team_id: 2,
                    team_name: 'group2',
                    leader: 'HeChX',
                    logo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2605489307,3834536344&fm=26&gp=0.jpg',
                    createAt: '2019-04-28 00:00:00',
                    description: 'This is group2',
                    limit: 0,
                    teamlabels: [
                        {
                            label: '乒乓球'
                        }
                    ],
                    members: [
                        {
                            member_username: 'HeChX'
                        },
                        {
                            member_username: 'hzhh'
                        },
                        {
                            member_username: 'Howlyao'
                        },
                    ],

                },
                {   
                    team_id: 3,
                    team_name: 'group3', 
                    leader: 'hzhh',
                    logo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556460204895&di=7617f2b558b0aa0fa511b000830eee0f&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F75%2F16%2F5a33804002831_610.jpg',
                    createAt: '2019-04-28 00:00:00',
                    description: 'This is group3',
                    limit: 0,
                    teamlabels: [
                        {
                            label: '羽毛球'
                        }
                    ],
                    members: [
                        {
                            member_username: 'hzhh'
                        },
                        {
                            member_username: 'HeChX'
                        },
                        {
                            member_username: 'Howlyao'
                        },
                        {
                            member_username: 'user1'
                        },
                        {
                            member_username: 'user2'
                        },
                    ],

                },
            ],

            teams: [],

            tags: ['sport'],

            showDrawer: -1,

            getGroupURLParams: '',

            loginUser: 'abc',
        };
    },
    methods: {
        getGroupItem(id_) {
            if (this.showDrawer != id_) this.showDrawer = id_;
            else this.showDrawer = -1;
        },

        searchGroup() {
            if (this.input != "") {
                console.log(this.groupAttribute);
                
                if (this.first) this.first = false;

                let searchType = '';
                switch(this.groupAttribute) {
                    case 'group_id': this.getGroupURLParams = '/Id?team_id=' + this.input; searchType = '小组ID'; break;
                    case 'group_name': this.getGroupURLParams = '/Name?team_name=' + this.input; searchType = '小组名字'; break;
                    case 'group_tag': this.getGroupURLParams = '/Label?label=' + this.input; searchType = '小组标签'; break;
                    default: break;
                }

                let t = this;
                t.teams = [];
                this.$axios.get('/team' + this.getGroupURLParams)
                    .then((response) => {
                        console.log(response.data);
                        switch(response.data.code) {
                            case 200:
                                let data = response.data.data;
                                for (let i = 0, len = data.length; i < len; i++) {
                                    t.teams.push(data[i]);
                                };
                                break;
                            case 213:
                                this.errorMessage = '抱歉，没有找到符合条件(' + this.groupAttribute + ' = ' + this.input + ')的小组，请确认' + searchType + '是否正确';
                                break;
                        }
                        
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.response) {
                            console.log(error.response.status);
                            if (error.response.status == 413) {
                                this.errorMessage = '抱歉，没有找到符合条件(' + this.groupAttribute + ' = ' + this.input + ')的小组，请确认' + searchType + '是否正确';
                                console.log(this.errorMessage);
                            }
                        } else if (error.request) {
                            console.log(error.request);
                        }
                    })
            }
        },

        applyJoinGroup(id_) {
            console.log(id_);
            let inGroup = false;
            for (let i = 0, len = this.teams.length; i < len; i++) {
                if (id_ == this.teams[i].team_id) {
                    for (let j = 0, len2 = this.teams[i].members.length; j < len2; j++) {
                        if (this.loginUser == this.teams[i].members[j].member_username) {
                            inGroup = true;
                            break;
                        }
                    }
                    break;
                }
            }

            let content = '';
            if (!inGroup) {
                this.$axios.post('/team/Member/Addition', {team_id: id_, username: this.loginUser})
                    .then((res) => {
                        console.log(res.data);
                        switch (res.data.code) {
                            case 200: 
                                this.$Modal.success({
                                    title: '提示',
                                    content: '<p>申请成功</p><p>你已经成功加入该小组</p>',
                                    onOk: () => {
                                        this.$router.push({name: 'groupDetail', params: {id: id_}});
                                    }
                                });
                                break;
                            case 210:
                                this.$Modal.error({
                                    title: '提示',
                                    content: '<p>申请失败</p><p>用户不存在</p>'
                                });
                                break;
                            case 211:
                                this.$Modal.info({
                                    title: '提示',
                                    content: '<p>你已经在该小组中了</p><p>不能再次加入</P>'
                                });
                                break;
                            case 213:
                                this.$Modal.error({
                                    title: '提示',
                                    content: '<p>申请失败</p><p>小组不存在</p>'
                                });
                                break;
                            case 214:
                                this.$Modal.info({
                                    title: '提示',
                                    content: '<p>申请已发送</p><p>等待小组组长审核</p>'
                                });
                                break;
                            case 215:
                                this.$Modal.info({
                                    title: '提示',
                                    content: '<p>申请失败</p><p>该小组禁止所有人加入</p>'
                                });
                                break;
                        }
                        // if (res.data.code == 200) {
                        //     this.$Modal.success({
                        //         title: '提示',
                        //         content: '<p>申请成功</p><p>你已经成功加入该小组</p>'
                        //     })
                        // }
                    })
                    .catch((err) => {
                        console.log(err);
                        // if (err.response) {
                        //     if (err.response.status == 413) {
                        //         this.$Modal.info({
                        //             title: '提示',
                        //             content: '<p>申请已发送</p><p>等待小组组长审核</p>'
                        //         })
                        //     } else if (err.response.status == 414) {
                        //         this.$Modal.error({
                        //             title: '提示',
                        //             content: '<p>申请失败</p><p>该小组禁止所有人加入</p>'
                        //         })
                        //     }
                        // } else if (err.request) {

                        // }
                    })
            } else {
                this.$Modal.info({
                    title: '提示',
                    content: '<p>你已经在该小组中了</p><p>不能再次加入</P>'
                })
            }
        }
    },
    mounted: function() {
        // for (let i = 0, len = this.default_teams.length; i < len; i++) {
        //     this.default_teams[i]['showDrawer'] = false;
        // }
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

.selector {
    float:left;
    margin: 10px;
}

.content-selector-block {
    position:relative;
    z-index: 999;
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
}

.group-card-mouseenter {
    box-shadow: 4px 4px 10px #1c2438;
}

.group-card-mouseleave {
    box-shadow: 4px 4px 10px #80848f;
}

.group-name{
    font-size: 20px;
    margin: 10px;
}

.group-simpleinfo {
    font-size: 18px;
    margin:10px;
}


.group-peopleCount {
    position:absolute;
    right:0px;
    bottom:0px;
    margin:10px;

}

.top-block {
    height: 30%;
    overflow: hidden;
}

.middle-block {
    height: 50%;
}

.bottom-block {
    height: 20%;
    position: relative;
}

.group-name {
    vertical-align: middle;
}

.group-tags {
    position: absolute;
    left: 5px;
    bottom: 0px;
}

.tags {
    vertical-align: middle;
}

.group-members {
    position: absolute;
    right: 5px;
    bottom: 5px;
}

.applyJoin-block {
    margin: 45px 0;
    text-align: center;
}

.search-result {
    margin: auto;
    font-size: 12pt;
}

</style>

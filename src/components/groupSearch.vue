/* eslint-disable */
<style scoped>
span {
    margin:3px;
}

.content {
    height: 2800px;
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
    position: relative;
    width:100%;
    
}

.group-card {
    position:relative;
    border: 1px solid #2d8cf0;
    height: 160px;
    width: 20%;
    margin: 30px;
    float: left;  
}

.group-card-mouseenter {
    box-shadow: 4px 4px 10px #1c2438;
}

.group-card-mouseleave {
    box-shadow: 4px 4px 10px #80848f;
}

.group-name{
    font-size: 24px;
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

</style>

<template>
    <div class="content-body">
        <div class="content">
            <div class="group-content">
                <div v-for="item in items">
                    <div v-bind:class="{'group-card':true,'group-card-mouseenter': enterid == item.id, 'group-card-mouseleave':!(enterid == item.id)}"
                    v-on:mouseenter="enterid = item.id" v-on:mouseleave="enterid = 0" @click="getGroupItem(item.id)">
                        <div class="group-image">
                            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" > U</Avatar>
                        </div>
                        <div class="group-name">
                            <span>{{item.name}}</span>
                        </div>
                        <div class="group-simpleinfo"> 
                            <span>{{item.simpleinfo}} </span>
                        </div>
                        <div class="group-detail">
                            <Icon type="md-person" />
                            <span>{{item.count}}</span>
                        </div>
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
            btn_show: false,
            enterid: 0,
            items: [
                {   
                    id: 1,
                    name: 'group1', 
        
                    creator: 'user1',
                    count:10

                },
                {id: 2,title:'title2'}
            ]
        };
    },
    methods: {
        getGroupItem(id_) {
            this.$router.push({
                name: 'groupDetail',
                params: {
                id:id_
                }
            });

        }
    }


}
</script>

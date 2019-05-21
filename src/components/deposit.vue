<template>
  <div class="contain">
    <p class="p-balance">
      账户余额：<span class="span-balance">{{balance}}</span> 元
    </p>
    <p class="p-amount">充值金额</p>
    <div style="overflow: hidden;">
      <div class="select-amount" :class="{'is-selected': money == '1'}" @click="money='1'">1元</div>
      <div class="select-amount" :class="{'is-selected': money == '5'}" @click="money='5'">5元</div>
      <div class="select-amount" :class="{'is-selected': money == '10'}" @click="money='10'">10元</div>
      <div class="select-amount" :class="{'is-selected': money == '20'}" @click="money='20'">20元</div>
      <div class="select-amount" :class="{'is-selected': money == '50'}" @click="money='50'">50元</div>
      <div class="select-amount" :class="{'is-selected': money == '100'}" @click="money='100'">100元</div>
      <div class="select-amount custom-amount" :class="{'is-selected': money == ''}">
        <input v-model="customInputMoney" placeholder="其他数量" @click="money=''"/>元
      </div>
    </div>
    <p class="pay-amount">支付金额：<span>￥{{money ? money : customInputMoney}}</span></p>
    <Button type="info" class="pay-button">立即充值</Button>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        money: '1',
        customInputMoney: '',
        balance: '36'
      }

    },

    mounted() {

    },

    computed: {

    },

    methods: {



    }
  }


</script>


<style scoped>
.contain {
  margin: 15px;
  text-align: left;
}

.p-balance {
  background: #f1f1f1;
  line-height: 36px;
  padding: 0 15px;
}

.span-balance {
  color: #ff9900;
  vertical-align: bottom;
  font-size: 24px;
  font-weight: 600;
}

.p-amount, .pay-amount{
  margin: 15px 8px;
  font-size: 14px;
  color: #99a2aa;
}

.select-amount {
  float: left;
  width: 200px;
  height: 80px;
  margin: 0 8px 16px 8px;
  border: 1px solid #e7ecf1;
  border-radius: 4px;
  line-height: 80px;
  text-align: center;
  font-size: 24px;
  cursor: pointer;
}

.custom-amount {
  width: 416px;
  text-align: left;
}

.custom-amount input {
  width: 80%;
  height: 80%;
  border: none;
  outline: none;
  padding-left: 20px;
}

.is-selected {
  border-color: #ff9900;
  color: #ff9900;
}


.pay-amount span {
  font-size: 32px;
  color: #ff9900;
}

.pay-button {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  font-size: 16px;
}
</style>

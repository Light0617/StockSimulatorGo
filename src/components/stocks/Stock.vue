<template>
  <div class='col-sm-6 col-md-4'>
    <div class='panel panel-success'>
      <div class='panel-heading'>
        <h3 class='panel-title'>
          {{ stock.symbol }}
          <small>(Price: {{ price }})</small>
        </h3>
      </div>
      <div class='panel-body'>
        <div class='pull-left'>
          <input
            type='number'
            class='form-control'
            placeholder='Quantity'
            v-model='quantity'
            :class='{danger : insufficientFunds}'>
        </div>
        <div class='pull-right'>
          <button 
            class='btn btn-success'
            @click='buyStock'
            :disabled='insufficientFunds || quantity <= 0 || this.quantity % 1 !== 0'>
            {{ insufficientFunds ? 'insufficientFunds' : 'Buy'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { setInterval } from 'timers';
export default {
  props: ['stock'],
  data() {
    return {
      quantity: 0
    }
  },
  mounted() { 
    if(this.price == 0) {
      setInterval(() => {
        this.$store.dispatch('fetchStockPrice', this.stock.symbol);
      }, 2000);
    } else {
      setInterval(() => {
        this.$store.dispatch('fetchStockPrice', this.stock.symbol);
      }, 5 * 60 * 1000);
    }
  },
  computed: {
    price() {
      if(this.$store.getters.stocks == null) return 0;
      const record = this.$store.getters.stocks.find(element => element.symbol == this.stock.symbol);
      return record.price;
    },
    funds(){
      return this.$store.getters.funds;
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    }
  },
  methods: {
    buyStock() {
      const order = {
        stockSymbol: this.stock.symbol,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      this.$store.dispatch('buyStock', order);
      this.quantity = 0;
    }
  }
}
</script>
<style scoped>
 .danger{
   border: 1px solid red;
 }
</style>

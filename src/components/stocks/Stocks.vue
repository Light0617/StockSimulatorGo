<template>
  <div>
    <h1>All Available Stocks</h1>
    <app-stock v-for='stock in stocks' :key='stock.symbol'  
      :stock='stock'></app-stock>
  </div>
</template>

<script>
import Stock from "./Stock.vue";
import { mapState } from 'vuex'

export default {
  components: {
    appStock: Stock
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    }
  }
};
</script>

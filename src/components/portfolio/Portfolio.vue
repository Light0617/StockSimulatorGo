<template>
  <div>
    <h1>The Portfolio Component</h1>
    <app-stock v-for='stock in stocks' :key='stock.id'  
      :stock='stock'></app-stock>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from './Stock.vue';

export default {
  computed: {
    stocks() {
      return this.$store.getters.stockPortfolio;
    }
  },
  components: {
    appStock: Stock
  }
}
</script>

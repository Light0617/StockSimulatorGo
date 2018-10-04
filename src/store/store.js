import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

import stocks from './modules/stocks';
import portfolio from "./modules/portfolio";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  modules: {
    stocks,
    portfolio
  }
})
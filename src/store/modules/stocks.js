import stocks from '../../data/stocks';

const state = {
  stocks: []
};

const mutations = {
  'SET_STOCKS' (state, stocks) {
    state.stocks = stocks;
  },
  'RND_STOCKS' (state) {
    state.stocks.forEach(stock => {
      //using stchastic process
      const annual_rate = 0.2;
      const annual_std = 0.2;
      const dialy_rate = annual_rate / 365;
      const std = annual_std * Math.sqrt(1 / 365);
      stock.price = Math.round(stock.price * (1 + dialy_rate + Math.random() * 4 * std - 2 * std));
    })
  }
};

const actions = {
  buyStock: ({commit}, order) => {
    commit('BUY_STOCK', order);
  },
  initStocks: ({commit}) => {
    commit('SET_STOCKS', stocks);
  },
  randomizeStocks: ({commit}) => {
    commit('RND_STOCKS');
  }
};

const getters = {
  stocks: state => {
    return state.stocks;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
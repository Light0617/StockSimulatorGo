import stocksName from '../../data/stocksName';
import axios from 'axios';

const state = {
  stocks: []
};

const mutations = {
  'ADD_STOCK' (state, stock) {
    state.stocks.push(stock);
  },
  'SET_STOCK_PRICE' (state, payload) {
    state.stocks = state.stocks.map(stock => {
      if (stock.symbol === payload.symbol) {
        return Object.assign({}, stock, { 'price' : payload.price } )
      }
      return stock;
    });
  },
  'INIT_STOCKS' (state) {
    stocksName.forEach(item => {
      const stock = {
        'symbol': item.symbol,
        'price': 0
      };
      state.stocks.push(stock);
    });
  }
};

const actions = {
  initStocks: ({ commit }) => {
    commit('INIT_STOCKS');
  },
  fetchStockPrice: ({ commit }, symbol) => {
    console.log('fetch');
    axios.get('query?function=TIME_SERIES_INTRADAY&symbol='+ symbol +'&interval=1min&apikey=TFMMQBROLJK126MV')
      .then(res => {
        let dataArray = res.data['Time Series (1min)'];
        let latestTime = Object.keys(dataArray).sort().slice(-1)[0];
        console.log('latestTime=' + latestTime);
        const price = dataArray[latestTime]['4. close'];
        const stock = {
          symbol: symbol,
          price: price
        }
        commit('SET_STOCK_PRICE', stock);
      })
      .catch(error => console.log(error));
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
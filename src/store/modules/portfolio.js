const state = {
  funds: 100000,
  stocks: []
};

const mutations = {
  BUY_STOCK(state, { stockSymbol, quantity, stockPrice }) {
    const record = state.stocks.find(element => element.symbol == stockSymbol);
    if (record) {
      record.quantity = +quantity + +record.quantity;
    } else {
      state.stocks.push({
        symbol: stockSymbol,
        quantity: quantity
      });
    }
    state.funds -= stockPrice * quantity;
  },
  SELL_STOCK(state, { stockSymbol, quantity, stockPrice }) {
    const record = state.stocks.find(element => element.symbol == stockSymbol);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += stockPrice * quantity;
  },
  SET_PORTFOLIO(state, portfolio) {
    state.funds = portfolio.funds;
    state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
  }
};

const actions = {
  sellStock: ({ commit }, order) => {
    commit("SELL_STOCK", order);
  },
  buyStock: ({ commit }, order) => {
    commit("BUY_STOCK", order);
  }
};

const getters = {
  stockPortfolio(state, getters) {
    return state.stocks.map(stock => {
      const record = getters.stocks.find(element => element.symbol == stock.symbol);
      return {
        symbol: stock.symbol,
        quantity: stock.quantity,
        price: record.price
      };
    });
  },
  funds(state) {
    return state.funds;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
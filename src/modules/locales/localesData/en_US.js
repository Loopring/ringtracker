const words = {
  all: 'All',
  time: 'Time',
  status: 'Status',
  statuses: 'Statuses',
  side: 'Side',
  sides: 'Sides',
  market: 'Market',
  markets: 'Markets',
  amount: 'Amount',
  type: 'Type',
  types: 'Types',
  gas: 'Gas',
  price: 'Price',
  total: 'Total',
  worth: "Worth",
  sell: 'Sell',
  buy: 'Buy',
  trade: 'Trade',
  more: 'More',
  format_amount: "{amount,number}",
  list: {
    no_data: 'No Data',
    no_data_custom: 'No {title}',
    loading: 'Loading...',
  },
  overview: 'Overview',
  trades: "Trades",
  goback: "Go Back",
  viewall: 'View All',
  ecosystem: "Ecosystem"
}
const types = {
  trade_side: {
    sell: words.sell,
    buy: words.buy,
  },
};

const validation_messages = {
  invalid_number: "Please provide a valid number value",
  invalid_integer: 'Please provide an integer value',
  token_not_select: "Please select token",
  invalid_eth_address: "Invalid Ethereum address",
  invalid_item: "Please provide a valid {item}"
}

const notifications = {
  title: {
    place_order_failed: "Whoops, order submission somehow failed!",
  },
  message: {
    wallet_locked: 'Your wallet seems locked yet, please unlock first',
  }
}

const actions = {
  resend: 'Resend',
}

const time_unit = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
}

export default {
  common: {
    ...words,
    ...validation_messages,
    ...time_unit,
  },
  notifications,
  actions,
  taps: {
    home: 'Home',
    trades: 'Trades',
    tokens: 'Tokens',
    relays: 'Relays',
    dexs: 'DEXs',
    rings: 'Rings'
  },
  overview: {
    "volume": "Volume",
    "trades": "Trades",
    "fees": "Fees"
  },
}

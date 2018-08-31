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
  ecosystem: "Ecosystem",
  recent_trades: 'Recent Trades',
  margin_split: "Margin Split",
  lrc_fee: 'LRC Fee',
  lrc_reward: 'LRC Reward',
  suc:'Succeed',
  fail:'Failed',
  pending:'Pending',
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
    "fees": "Fees",
    "trade":"Trade",
    "fee": "Fee"
  },
  dexs: {
    "title": "Dexs",
    "overview": "Dexs Overview"
  },
  dex: {
    name: "Name",
    website: "Website",
    trades: "Trades",
    volume: "Volume",
    options: "Options"
  },
  title: {
    lrc_fee: 'LRC Fee',
    created: 'Created',
    options: "Options",
    token: "Token",
    last_price: "Last Price",
    trades: "Trades",
    volume: "Volume",
  },
  options: {
    view_detail: "View Detail"
  },
  ring: {
    ringIndex: "RingIndex",
    ringHash: "RingHash",
    miner: "Miner",
    txHash: "TxHash",
    block: "Block",
    recipient: "Fee Recipient",
    total_lrc_fee: "Total Lrc Fee",
    total_lrc_reward: "Total Lrc Reward",
    total_margin_split: "Total Margin Split",
    time: words.time,
    protocol: "Protocol Address",
    delegate: "Delegate Address",
    fills: "Fills Amount",
    status:words.status,
    suc:words.suc,
    fail:words.fail,
    pending:words.pending,
  },
  ring_detail: {
    ring_detail: "Ring Detail",
    fill_table:"Trades of Fills"
  },
  search: {
    title: "Search Results"
  }
}

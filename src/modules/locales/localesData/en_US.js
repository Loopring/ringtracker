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
  advanced: "Advanced",
  worth: "Worth",
  lrc_fee: 'Trading Fee',
  lrc_fee_tips: 'xxxxx',
  lrc_reward: 'LRC Reward',
  lrc_reward_tips: 'xxxxx',
  ttl: 'Time to Live',
  block: 'Block',
  nonce: 'Nonce',
  sell: 'Sell',
  buy: 'Buy',
  buying: "You are buying",
  selling: "You are selling",
  actions: 'Actions',
  options: 'Options',
  balance: 'Balance',
  balances: 'Balances',
  send: 'Send',
  receive: 'Receive',
  convert: 'Convert',
  trade: 'Trade',
  password: 'Password',
  copy: "Copy",
  copy_suc: 'Copy Successfully',
  copy_fail: "Copy Failed",
  token: 'Token',
  margin_split: "Margin Split",
  format_amount: "{amount,number}",
  back: 'Return',
  cancel: 'Cancel',
  previous_page: 'Previous Page',
  next_page: 'Next Page',
  import: "Import",
  recipient: 'Recipient',
  help: 'Help',
  feedback: "Feedback",
  quit: 'Quit',
  asset: 'Asset',
  assets: 'Assets',
  order: 'Order',
  orders: 'Orders',
  fill: 'Fill',
  fills: 'Fills',
  yes: 'Yes',
  no: 'No',
  more: 'More',
  comingsoon: 'Coming Soon',
  depth: 'Depth',
  set: 'Set',
  helper: 'Helper',
  suc:'Succeed',
  fail:'Failed',
  pending:'Pending',
  list: {
    no_data: 'No Data',
    no_data_custom: 'No {title}',
    loading: 'Loading...',
  },
  overview: 'Overview'
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

}

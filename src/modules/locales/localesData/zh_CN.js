const words = {
  all: '全部',
  time: '时间',
  status: '状态',
  statuses: '状态',
  side: '方向',
  sides: '方向',
  market: '市场',
  markets: '市场',
  amount: '数量',
  type: '类型',
  types: '类型',
  gas: '油费',
  price: '价格',
  total: '总计',
  worth: "价值",
  sell: '卖出',
  buy: '买入',
  trade: '成交',
  more:'更多',
  format_amount: "{amount,number}",
  list:{
    no_data:'暂无数据',
    no_data_custom:'暂无{title}',
    loading:'加载中...',
  },
  overview: '概述',
  trades: "成交记录",
  goback: "返回",
  viewall: '详情',
  ecosystem: "生态",
  recent_trades: '最新成交',
  margin_split: "分润",
  lrc_fee: '手续费',
  lrc_reward: 'LRC 撮合奖励',
  suc:'成功',
  fail:'失败',
  pending:'确认中',
}

const types = {
  trade_side: {
    sell: words.sell,
    buy: words.buy,
  },
}

const validation_messages = {
  invalid_number: "请输入合法的数字",
  invalid_integer: '请输入合法的整数',
  token_not_select: "请选择代币",
  invalid_eth_address: "不合法的以太坊地址",
  invalid_item: "请输入合法的{item}"
}

const notifications = {
  title: {
    place_order_failed: "订单提交失败 !",
  },
  message: {
    wallet_locked: '您的钱包还未解锁，请先解锁后再继续操作',
  }
}

const actions = {
  resend:'重发',
}

const time_unit = {
  second: "秒",
  minute: "分钟",
  hour: "小时",
  day: "天",
  week: "周",
  month: "月",
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
    home: '主页',
    trades: '成交',
    tokens: '代币',
    relays: '中继',
    dexs: '交易所',
    rings: '撮合环路'
  },
  overview: {
    "volume": "成交规模",
    "trades": "成交数",
    "fees": "手续费",
    "trade":"成交数",
    "fee": "手续费",
    "date": "时间"
  },
  dexs: {
    "title": "交易所",
    "overview": "交易所概况"
  },
  dex: {
    name: "名称",
    website: "网址",
    trades: "交易数",
    volume: "成交规模",
    options: "选项"
  },
  title: {
    lrc_fee: 'LRC 撮合费',
    created: '提交时间',
    options: "操作",
    token: "代币",
    last_price: "最新成交",
    trades: "交易数",
    volume: "交易量",
  },
  options: {
    view_detail: "详情",
    goback: words.goback,
  },
  // ring
  // -----------
  ring: {
    ringIndex: "环路ID",
    ringHash: "环路哈希",
    miner: "矿工",
    txHash: "交易哈希",
    block: "块高度",
    recipient: "费用接收地址",
    total_lrc_fee: "总共的LRC fee",
    total_lrc_reward: "总共的LRC 奖励",
    total_margin_split: "总共的分润",
    time: words.time,
    protocol:"合约地址",
    delegate:"授权地址",
    fills: "交易数量",
    status:words.status,
    suc:words.suc,
    fail:words.fail,
    pending:words.pending,
  },
  ring_detail: {
    ring_detail:'环路详情',
    fill_table:"成交列表"
  },
  search: {
    title: "搜索结果"
  },
  protocol: {
    state_obsolete: "已废弃",
    state_alive: "可用",
    unknown: "未知合约"
  },
  trade: {
    title: "交易详情",
    transaction_hash: "交易哈希",
    order_hash: "订单哈希",
    date: "成交时间",
    relay: "撮合中继",
    protocol_version: "合约版本",
  }
}


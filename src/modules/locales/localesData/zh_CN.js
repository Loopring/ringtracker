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
  advanced: "高级",
  worth: "价值",
  lrc_fee: '手续费',
  lrc_fee_tips: 'xxxxx',
  lrc_reward: 'LRC 撮合奖励',
  lrc_reward_tips: 'xxxxx',
  ttl: '订单有效期',
  block: '区块',
  nonce: '随机数',
  sell: '卖出',
  buy: '买入',
  buying: "您正在购买",
  selling: "您正在出售",
  actions: '操作',
  options: '选项',
  balance: '余额',
  balances: '余额',
  send: '转出',
  receive: '转入',
  convert: '转换',
  trade: '买卖',
  password: '密码',
  copy: "复制",
  copy_suc: '复制成功',
  copy_fail: "复制失败",
  token: '代币',
  order_type: '订单类型',
  margin_split: "分润",
  format_amount: "{amount,number}",
  back: '返回',
  cancel: "取消",
  previous_page: '前一页',
  next_page: '后一页',
  import: "导入",
  recipient: '接收者',
  help:'帮助',
  feedback:"反馈",
  quit:'退出',
  asset:'资产',
  assets:'资产',
  order:'订单',
  orders:'订单',
  fill:'成交',
  fills:'成交',
  yes:'是',
  no:'否',
  more:'更多',
  comingsoon:'即将到来',
  set:'设置',
  helper:'助手',
  depth:'深度',
  suc:'成功',
  fail:'失败',
  pending:'确认中',
  list:{
    no_data:'暂无数据',
    no_data_custom:'暂无{title}',
    loading:'加载中...',
  },
  overview: '概述'
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

}


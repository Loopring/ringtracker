import React from 'react';
import {Icon} from 'antd';
import {toNumber, toBig} from "LoopringJS/common/formatter";
import config from "common/config";
import commonFm from "../formatter/common";
import TokenFm from "../tokens/TokenFm";
import {toFixed} from "LoopringJS/common/formatter";
import {formatter} from 'modules/formatter/FormatNumber'

export class FillFm {
  constructor(fill = {}) {
    this.fill = fill
  }

  getRingIndex() {
    return this.fill.ringIndex
  }

  getRingHash() {
    return this.fill.ringHash
  }

  getTxHash() {
    return this.fill.txHash
  }

  getShortTxHash() {
    return `${this.fill.txHash.substring(0, 6)}...${this.fill.txHash.substring(this.fill.txHash.length - 6, this.fill.txHash.length)}`
  }

  getMiner() {
    return this.fill.Miner
  }

  getShortMiner() {
    return `${this.fill.Miner.substring(0, 6)}...${this.fill.Miner.substring(this.fill.Miner.length - 6, this.fill.Miner.length)}`
  }

  getBlockNumber() {
    return this.fill.blockNumber
  }

  getFeeRecipient() {
    return this.fill.feeRecipient
  }

  getTotalLrcFee() {
    return commonFm.getFormatNum(toFixed(toBig(this.fill.lrcFee).div(1e18)), 6) + ' LRC'
  }

  getTotalSplitFee() {
    const token = this.fill.splitS ? this.fill.tokenS : this.fill.tokenB;
    const tokenFm = new TokenFm({symbol: token});
    const split = this.fill.splitS ? this.fill.splitS : this.fill.splitB;
    return commonFm.getFormatNum(tokenFm.toPricisionFixed(tokenFm.getUnitAmount(split))) + ' '
  }

  getAmount() {
    const fmS = this.fill.side.toLowerCase() === 'buy' ? new TokenFm({symbol: this.fill.tokenB}) : new TokenFm({symbol: this.fill.tokenS});
    const amount = this.fill.side.toLowerCase() === 'buy' ? fmS.getUnitAmount(this.fill.amountB) : fmS.getUnitAmount(this.fill.amountS);
    const symbol = this.fill.side === 'buy' ? this.fill.tokenB : this.fill.tokenS
    // return commonFm.getFormatNum(fmS.toPricisionFixed(amount)) + '' + symbol
    return formatter(toBig(amount), 4).d
  }

  getSide() {
    return this.fill.side
  }

  getTotal() {
    const fmS = this.fill.side.toLowerCase() === 'buy' ? new TokenFm({symbol: this.fill.tokenS}) : new TokenFm({symbol: this.fill.tokenB});
    const amount = this.fill.side.toLowerCase() === 'buy' ? fmS.getUnitAmount(this.fill.amountS) : fmS.getUnitAmount(this.fill.amountB);
    const symbol = this.fill.side === 'buy' ? this.fill.tokenS : this.fill.tokenB
    return commonFm.getFormatNum(fmS.toPricisionFixed(amount))
  }

  getBuy() {
    const fm = new TokenFm({symbol: this.fill.tokenB});
    const amount = fm.getUnitAmount(this.fill.amountB);
    return `${formatter(toBig(amount), 4).d} ${this.fill.tokenB}`
  }

  getSell() {
    const fm = new TokenFm({symbol: this.fill.tokenS});
    const amount = fm.getUnitAmount(this.fill.amountS);
    return `${formatter(toBig(amount), 4).d} ${this.fill.tokenS}`
  }

  getPrice() {
    const tokenB = new TokenFm({symbol: this.fill.tokenB});
    const tokenS = new TokenFm({symbol: this.fill.tokenS});
    const market = config.getMarketByPair(this.fill.market);
    const price = this.fill.side.toLowerCase() === 'buy' ? tokenS.getUnitAmount(this.fill.amountS).div(tokenB.getUnitAmount(this.fill.amountB)) :
      tokenB.getUnitAmount(this.fill.amountB).div(tokenS.getUnitAmount(this.fill.amountS));
    return commonFm.getFormatNum(toFixed(price, market.pricePrecision, true))
  }

  getLRCFee() {
    const fmLrc = new TokenFm({symbol: 'LRC'});
    return commonFm.getFormatNum(fmLrc.toPricisionFixed(fmLrc.getUnitAmount(this.fill.lrcFee))) + ' LRC'
  }

  getLRCReward() {
    const fmLrc = new TokenFm({symbol: 'LRC'});
    return commonFm.getFormatNum(fmLrc.toPricisionFixed(fmLrc.getUnitAmount(this.fill.lrcReward))) + ' LRC'
  }

  getCreateTime() {
    return commonFm.getFormatTime(toNumber(this.fill.createTime) * 1e3, 'YYYY-MM-DD HH:mm:ss')
  }
}

export default {
  FillFm
}

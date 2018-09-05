import moment from 'moment'
import intl from 'react-intl-universal';
import {toBig, toFixed} from 'LoopringJS/common/formatter'

const schema = [
  {
    title: () => intl.get('ring.ringIndex'),
    name: 'ringIndex',
  },
  {
    title:() => intl.get('ring.ringHash'),
    description:'The ring hash',
    name:'ringHash',
  },
  {
    title: () => intl.get('ring.fills'),
    description: 'The fills number int the ring.',
    name: 'tradeAmount',
  },
  {
    title: () => intl.get('ring.miner'),
    description: 'The miner that submit match orders.',
    name: 'miner',
  },

  {
    title:() => intl.get('ring.txHash'),
    description:' The ring match transaction hash.',
    name:'txHash',
  },
  {
    title: () => intl.get('ring.block'),
    description: 'The number of the block which contains the transaction.',
    name: 'blockNumber',
  },
  {
    title: () => intl.get('ring.total_lrc_fee'),
    description: 'The total lrc fee.',
    name: 'totalLrcFee',
    formatter: (item) => !!item ? toFixed(toBig(item).div(1e18), 6) + ' LRC' : ""
  },
  {
    title: () => intl.get('ring.total_margin_split'),
    description: 'The total margin split fee.',
    name: 'totalSplitFee',
  },

  {
    title:() => intl.get('ring.protocol'),
    name:'protocol',
  },
  {
    title:() => intl.get('ring.delegate'),
    name:'delegateAddress',
  },
  {
    title: () => intl.get('ring.status'),
    description: 'The ring status.',
    name: 'status',
    formatter: (item) => {
      switch (item) {
        case 1:
          return intl.get('ring.pending');
        case 0:
        case 2:
          return intl.get('ring.suc');
        default:
          return intl.get('ring.fail')
      }
    }
  },
  {
    title: () => intl.get('ring.time'),
    description: 'The ring matched time',
    name: 'timestamp',
    formatter: (item) => !!item ? moment(item * 1e3).format('YYYY-MM-DD HH:mm:ss') : ""
  },
];
export default schema

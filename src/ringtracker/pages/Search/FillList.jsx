import React, {Component} from 'react';
import FillTable from './FillTable';
import {getTrades} from 'common/utils/relay'
import intl from 'react-intl-universal'
import {Pagination} from "antd";
import settings from 'modules/storage/settings'

export default class FillList extends Component {
  static displayName = 'FillList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      trades: [],
      page: {
        total: 0,
        size: 10,
        current: 1
      },
      loading: false
    };
  }

  componentDidMount() {
    const search = this.props.match.params.keyword;
    if(search) {
      this.loadDatas(1, search)
    }
  }

  componentWillReceiveProps(nextProps) {
    const search = nextProps.match.params.keyword;
    if(search) {
      this.loadDatas(1, search)
    }
  }

  loadDatas(pageIndex, search) {
    const currency = settings.getCurrency()
    this.setState({loading:true})
    getTrades({
      pageIndex,
      pageSize:this.state.page.size,
      search,
      currency
    }).then(resp => {
      if(resp.result) {
        this.setState({
          trades:resp.result.data,
          page:{ //pageIndex, pageSize, total
            total: resp.result.total,
            size:10,
            current:resp.result.pageIndex
          },
          loading:false
        })
      }
    })
  }

  render() {
    const keyword = this.props.match.params.keyword;
    return (
      <div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">{intl.get('search.title')}</div>
            <div className="ui buttons basic mr10">
              <button className="ui button"></button>
            </div>
          </div>
          <div className="ui segment p20">
            <FillTable fills={{items: this.state.trades, loading: this.state.loading}}/>
            <Pagination className="fs14 s-small mt30 text-right mr50" total={this.state.page.total}
                        current={this.state.page.current} onChange={(page) => {
              const search = this.props.match.params.keyword;
              this.loadDatas(page, search)
            }}/>
          </div>
        </div>
      </div>
    );
  }
}

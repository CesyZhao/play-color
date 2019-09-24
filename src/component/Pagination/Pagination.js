import React, { Component } from 'react'
import Proptypes from 'prop-types'
import './Pagination.less'


class Pagination extends Component {
  static Proptypes = {
    total: Proptypes.number.isRequired,
    onPageChange: Proptypes.func.isRequired
  }
  state = {
    current: 0,
    pageSize: 5,
    showTotal: false,
    jumpable: false
  }
  render () {
    const { current, pageSize, showTotal, jumpable } = this.state
    const { total } = this.props
    return (
      <div className="pc-pagination">
        {
          showTotal && <span className="pc-pagination-total"> 共 { total } 条</span>
        }
        <i className="iconfont icon-fanhui"></i>
        {
          [current, current + 1, current + 2].map(item => {
            return <span> { item } </span>
          })
        }
        <span> ... </span>
        <span> { total / pageSize } </span>
        <i className="iconfont icon-gengduo"></i>
        {
          jumpable && <span className="pc-pagination-to"> 前往第 <input></input> 页 </span>
        }
      </div>
    )
  }
}

export default Pagination
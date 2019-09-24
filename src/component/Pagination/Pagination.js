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
    pageSize: 5
  }
  render () {
    const { current, pageSize } = this.state
    const { total } = this.props
    return (
      <div className="pc-pagination">
        <i className="iconfont icon-fanhui"></i>
        {
          [current, current + 1, current + 2].map(item => {
            return <span> { item } </span>
          })
        }
        <span> ... </span>
        <span> { total / pageSize } </span>
        <input></input>
        <i className="iconfont icon-gengduo"></i>
      </div>
    )
  }
}

export default Pagination
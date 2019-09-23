import React, { Component } from 'react'
import Proptypes from 'prop-types'


class Pagination extends Component {
  static Proptypes = {
    total: Proptypes.number.isRequired,
    pageSize: Proptypes.number.isRequired,
    onPageChange: Proptypes.func.isRequired
  }
  state = {
    current: 0
  }
  render () {
    const { current, total } = this.state
    return (
      <div className="pc-pagination">
        <i className="iconfont icon-fanhui"></i>
        {
          [current, current + 1, current + 2].map(item => {
            return <span> { item } </span>
          })
        }
        <span> ... </span>
        <span> { total } </span>
        <input></input>
        <i className="iconfont icon-gengduo"></i>
      </div>
    )
  }
}

export default Pagination
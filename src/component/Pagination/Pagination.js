import React, { Component, Fragment } from 'react'
import Proptypes from 'prop-types'
import './Pagination.less'


class Pagination extends Component {
  static Proptypes = {
    total: Proptypes.number.isRequired,
    onPageChange: Proptypes.func.isRequired
  }
  state = {
    current: 1,
    pageSize: 5,
    showTotal: false,
    jumpable: true
  }
  handlePageClick = (e, page) => {
    this.setState({
      current: page
    })
  }
  render () {
    const { current, pageSize, showTotal, jumpable } = this.state
    const { total } = this.props
    const totalPage = total / pageSize
    return (
      <div className="pc-pagination">
        {
          showTotal && <span className="pc-pagination-total"> 共 { total } 条</span>
        }
        <i className="iconfont icon-fanhui pc-pagination-option"></i>
        {
          current < 1 + 3
          ? [1, 2, 3, 4].map(item => {
              return <span key={ item } className={ `pc-pagination-option ${current === item ? 'current' : ''}` } onClick={ (e) => this.handlePageClick(e, item) }> { item } </span>
            })
          : <span className={ `pc-pagination-option ${current === 1 ? 'current' : ''}` } onClick={ (e) => this.handlePageClick(e, 1) }> 1 </span>
        }
        <span> ... </span>
        {
          current >= 1 + 3 && current <= totalPage - 3 &&
          <Fragment>
            {
              [ current - 1, current , current + 1].map(item => {
                return <span key={ item } className={ `pc-pagination-option ${current === item ? 'current' : ''}` } onClick={ (e) => this.handlePageClick(e, item) }> { item } </span>
              })
            }
            <span> ... </span>
          </Fragment>
        }
        {
          current > totalPage - 3 && current <= totalPage
          ? [totalPage - 3 ,totalPage - 2 , totalPage - 1, totalPage].map(item => {
              return <span key={ item } className={ `pc-pagination-option ${current === item ? 'current' : ''}` } onClick={ (e) => this.handlePageClick(e, item) }> { item } </span>
            })
          : <span className={ `pc-pagination-option ${current === totalPage ? 'current' : ''}` } onClick={ (e) => this.handlePageClick(e, totalPage) }> { totalPage } </span>
        }
        <i className="iconfont icon-gengduo pc-pagination-option"></i>
        {
          jumpable && <span className="pc-pagination-to"> 前往第 <input></input> 页 </span>
        }
      </div>
    )
  }
}

export default Pagination
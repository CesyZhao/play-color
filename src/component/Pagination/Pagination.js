import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import './Pagination.less'

const PAGE_OFFSET = 3
class Pagination extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
    showTotal: PropTypes.bool,
    jumpable:  PropTypes.bool
  }
  state = {
    current: 1
  }
  handlePageClick = (e, page) => {
    const { total, pageSize = 5 } = this.props
    const totalPage = total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1
    if (page < 1 || page > totalPage) return
    this.setState({
      current: page
    })
    this.props.onPageChange(page)
  }
  handleInput = (e) => {
    this.handlePageClick(e, +e.target.value)
  }
  render () {
    const { current } = this.state
    const { total, pageSize = 5, showTotal = false, jumpable = true } = this.props
    const totalPage = total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1
    return (
      <div className="pc-pagination">
        {
          showTotal && <span className="pc-pagination-total"> 共 { total } 条</span>
        }
        <i className={`iconfont icon-fanhui pc-pagination-option ${current >= 1 ? 'disabled' : ''}`} onClick={ (e) => this.handlePageClick(e, current - 1) }></i>
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
        <i className={`iconfont icon-gengduo pc-pagination-option ${current === totalPage ? 'disabled' : ''}`} onClick={ (e) => this.handlePageClick(e, current + 1) }></i>
        {
          jumpable && <span className="pc-pagination-to"> 前往第 <input onInput={ this.handleInput }></input> 页 </span>
        }
      </div>
    )
  }
}

export default Pagination
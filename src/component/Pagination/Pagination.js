import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Pagination.less'

class Pagination extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
    showTotal: PropTypes.bool,
    jumpable: PropTypes.bool,
    pagerCount: PropTypes.number
  }
  state = {
    current: 1,
    showNextMore: false,
    showPrevMore: false
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
  render() {
    const { current } = this.state
    const { total, pageSize = 5, showTotal = false, jumpable = true, pagerCount = 5 } = this.props
    const totalPage = total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1
    const pagers = []
    const halfPagerCount = (pagerCount - 1) / 2
    let showPrevMore = false
    let showNextMore = false
    if (totalPage > pagerCount) {
      if (current > pagerCount - halfPagerCount) {
        showPrevMore = true
      }
      if (current < totalPage - halfPagerCount) {
        showNextMore = true
      }
    }
    if (showPrevMore && !showNextMore) {
      const startPage = totalPage - (pagerCount - 2)
      for (let i = startPage; i < totalPage; i++) {
        pagers.push(i)
      }
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < pagerCount; i++) {
        pagers.push(i)
      }
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(pagerCount / 2) - 1
      for (let i = current - offset ; i <= current + offset; i++) {
        pagers.push(i)
      }
    } else {
      for (let i = 2; i < totalPage; i++) {
        pagers.push(i)
      }
    }


    return (
      totalPage > 1 &&
      <div className="pc-pagination">
        {
          showTotal && <span className="pc-pagination-total"> 共 {total} 条</span>
        }
        <i className={`iconfont icon-fanhui pc-pagination-option ${current === 1 ? 'disabled' : ''}`} onClick={(e) => this.handlePageClick(e, current - 1)}></i>
        <i className={`pc-pagination-option ${ current === 1 ? 'current-page' : '' }`} onClick={(e) => this.handlePageClick(e, 1)}>1</i>
        {
          showPrevMore &&
          <i className="iconfont icon-diandiandianshu icon-more pc-pagination-option"></i>
        }
        {
          pagers.map(pager => {
            return (
              <i key={pager} className={`pc-pagination-option ${ current === pager ? 'current-page' : '' }`} onClick={(e) => this.handlePageClick(e, pager)}> {pager} </i>
            )
          })
        }
        {
          showNextMore &&
          <i className="iconfont icon-diandiandianshu icon-more pc-pagination-option"></i>
        }
        <i className={`pc-pagination-option ${ current === totalPage ? 'current-page' : '' }`} onClick={(e) => this.handlePageClick(e, totalPage)}> {totalPage} </i>
        <i className={`iconfont icon-gengduo pc-pagination-option ${current === totalPage ? 'disabled' : ''}`} onClick={(e) => this.handlePageClick(e, current + 1)}></i>
        {
          jumpable && <span className="pc-pagination-to"> 前往第 <input onInput={this.handleInput}></input> 页 </span>
        }
      </div>
    )
  }
}

export default Pagination
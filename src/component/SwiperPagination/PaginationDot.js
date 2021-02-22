import React from 'react'
import PropTypes from 'prop-types'
import './index.less'

class PaginationDot extends React.Component {
  handleClick = event => {
    this.props.onClick(event, this.props.index)
  }

  render() {
    const { active } = this.props

    return (
      <button type="button" className="swiper-pagination-button" onClick={this.handleClick}>
        <div className={`swiper-pagination-dot ${active ? 'active' : ''}`} />
      </button>
    )
  }
}

PaginationDot.propTypes = {
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default PaginationDot
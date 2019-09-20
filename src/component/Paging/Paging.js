import React, { Component } from 'react'
import Proptypes from 'prop-types'


class Paging extends Component {
  static Proptypes = {
    total: Proptypes.number.isRequired,
    pageSize: Proptypes.number.isRequired,
    onPageChange: Proptypes.func.isRequired
  }
  render () {
    return (
      <div>

      </div>
    )
  }
}

export default Paging
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class InifiteScroll extends Component {

  static propTypes = {
    dataFetcher: PropTypes.func.isRequired,
    dataFetcherParam: PropTypes.object.isRequired,
    itemRenderer: PropTypes.func.isRequired
  }

  state = {
    currentItems: [],
    cachedItems: [],
    padding: 0,
    currentIndex: 0
  }

  fetchData = (dataFetcher, dataFetcherParam) => {
    try {
      const { data } = dataFetcher(dataFetcherParam)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <ul className="pc-infinite-list">
        {
          this.state.currentItems.map(item => {
            return (
              <li key={item.id}>
                {this.props.itemRenderer(item)}
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default InifiteScroll
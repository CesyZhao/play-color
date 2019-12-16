import React, { Component } from 'react'
import PropTypes from 'prop-types'

class InifiteScroll extends Component {

  static propTypes = {
    dataFetcher: PropTypes.func.isRequired,
    dataFetcherParam: PropTypes.object.isRequired,
    itemRenderer: PropTypes.func.isRequired,
    threshold: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      currentItems: [],
      cachedItems: [],
      padding: 0,
      currentIndex: 0
    }
    this.startElement = React.createRef()
    this.endElement = React.createRef()
    this.observer = null
  }

  componentDidMount() {
    this.initScrollObserver()
  }

  initScrollObserver = () => {
    this.observer = new IntersectionObserver(this.callback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    })
  }

  callback = () => {
    
  }

  handleScroll = (e) => {
    console.log(e)
  }

  fetchData = (dataFetcher, dataFetcherParam) => {
    try {
      const { data } = dataFetcher(dataFetcherParam)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  getRef = (index) => {

  }

  render() {
    return (
      <ul className="pc-infinite-list" ref="infiniteScroller" onScroll={this.handleScroll}>
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
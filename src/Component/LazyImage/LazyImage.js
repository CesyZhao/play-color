import React, {Component} from 'react'
import PropTypes from 'prop-types'

class LazyImage extends Component{
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired
  }
  static defaultProps = {
    shape: 'squared'
  }

  render() {
    const style = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`
    }
    return (
      <div className={`pl-lazy-image-wrapper ${this.props.shape}`} style={ style }>

      </div>
    )
  }
}

export default LazyImage
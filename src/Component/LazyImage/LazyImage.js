import React, {Component} from 'react'
import PropTypes from 'prop-types'
import logo from '../../../logo.png'

class LazyImage extends Component{
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired
  }
  static defaultProps = {
    shape: 'squared',
    width: 100,
    height: 100
  }
  state = {
    imageReady: false
  }

  render() {
    const style = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`
    }
    return (
      <div className={`pl-lazy-image-wrapper ${this.props.shape}`} style={ style }>
        {
          this.state.imageReady ? 
            <img src={this.props.imgUrl} className="pl-lazy-image" /> :
            <img src={logo}  className="pl-lazy-image" />
        }
      </div>
    )
  }
}

export default LazyImage
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import logo from '../../Asset/logo_no_des.png'
import './LazyImage.less'

/**
 * 懒加载图片,默认加载 logo 图片
 * 等目标图片加载完成之后，切换至目标图片
 * */
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
            <img src={this.props.imgUrl} className="pl-lazy-image" alt=""/> :
            <img src={logo}  className="pl-lazy-image" alt=""/>
        }
      </div>
    )
  }
}

export default LazyImage
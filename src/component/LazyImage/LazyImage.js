import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
    width: 150,
    height: 150
  }
  // componentWillMount () {
  //   this.setState({preImageUrl: this.props.imgUrl.replace(/\?.*$/, `?param=${this.props.width}y${this.props.height}`)})
  // }
  state = {
    preImageUrl: `${this.props.imgUrl}?param=${this.props.width}y${this.props.height}`
  }
  imageLoaded = () => {
    this.state.preImageUrl.includes('?param') && this.setState({ preImageUrl: this.props.imgUrl })
  }

  render() {
    return (
      <img src={this.state.preImageUrl} alt="lazyImage" onLoad={ this.imageLoaded }/>
    )
  }
}

export default LazyImage

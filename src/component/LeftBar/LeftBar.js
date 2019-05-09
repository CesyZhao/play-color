import React, {Component} from 'react'
import './LeftBar.less'
import LazyImage from '../LazyImage/LazyImage'
import {connect} from 'react-redux'
import EventBus from '../../events'

@connect(
  state => {
    return {
      user: state.user
    }
  }
)
class LeftBar extends Component {

  handleNickNameClick = () => {
    EventBus.emit('toggleLogin')
  }

  render () {
    const { userInfo } = this.props.user
    return (
      <div className='pc-leftBar'>
        <div className='pc-leftBar-user'>
          <LazyImage  width={64} height={64}/>
          <div className='pc-leftBar-user-nickname'>
            <span onClick={this.handleNickNameClick}>
              {
                userInfo ? userInfo.nickname : '未登录'
              }
            </span>
            <i className='iconfont icon-iconmore' />
          </div>
        </div>
      </div>
    )
  }
}

export default LeftBar

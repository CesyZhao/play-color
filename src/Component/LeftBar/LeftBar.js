import React, {Component} from 'react'
import './LeftBar.less'
import LazyImage from '../LazyImage/LazyImage'
import more from '../../Asset/more.png'
import {connect} from 'react-redux'

@connect(
  state => {
    return {
      user: state.user
    }
  }
)
class LeftBar extends Component {
  render () {
    const { userInfo } = this.props.user
    return (
      <div className='pc-leftBar'>
        <div className='pc-leftBar-user'>
          <LazyImage  width={64} height={64}/>
          <div className='pc-leftBar-user-nickname'>
            <span>
              {
                userInfo ? userInfo.nickname : '未登录'
              }
            </span>
            <img src={more} alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default LeftBar
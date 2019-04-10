import React, {Component} from 'react'
import './LeftBar.less'
import LazyImage from '../LazyImage/LazyImage'
import more from '../../Asset/more.png'
import {connect} from 'react-redux'

@connect(
  state => state
)
class LeftBar extends Component {
  render () {
    return (
      <div className='pl-leftBar'>
        <div className='pl-leftBar-user'>
          <LazyImage  width={64} height={64}/>
          <div className='pl-leftBar-user-nickname'>
            <span>未登录</span>
            <img src={more} alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default LeftBar
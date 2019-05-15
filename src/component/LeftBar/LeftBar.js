import React, {Component} from 'react'
import './LeftBar.less'
import logo from '../../asset/daydream.png'

class LeftBar extends Component {

  render () {
    return (
      <div className='pc-leftBar'>
        <div className='pc-leftBar-logo'>
          <img src={logo} alt="logo"/>
          PLAY COLOR
        </div>
      </div>
    )
  }
}

export default LeftBar

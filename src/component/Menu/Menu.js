import React, {Component} from 'react'
import './Menu.less'
import logo from '../../asset/daydream.png'
import menu from './menus'
import { Link, withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import EventBus from '../../events'
import {connect} from "react-redux"
import FM from '../../entity/FM'

@withRouter
@connect(({user}) => ({
  user
}))
class Leftbar extends Component {
  state = {
    showMenu: false
  }
  toggleLogin = () => {
    const {profile} = this.props.user
    !profile && EventBus.emit('toggleLogin')
  }
  componentDidMount () {
    EventBus.on('toggleMenu', () => {
      this.toggleMenu()
    })
  }
  toggleMenu = async (name) => {
    this.setState({
      showMenu: !this.state.showMenu
    })
    EventBus.emit('closeMenu')
    if (name === '私人 FM') {
      await FM.initFM()
      EventBus.emit('togglePlayingPanel')
    } else if (name === '搜索') {
      EventBus.emit('toggleSearch', true)
    }
  }
  render () {
    const {profile}  = this.props.user
    return (
      <CSSTransition in={this.state.showMenu} timeout={300} unmountOnExit classNames="pc-leftbar">
        <div className='pc-leftbar'>
          <svg width="968" height="669" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4E8291" stop-opacity="1"/>
              <stop offset="100%" stop-color="#51416B" stop-opacity="1"/>
            </linearGradient>
            <filter id="blur-2px">
              <feOffset result="offOut" in="SourceAlpha" dx="-5" dy="0" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="15" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <g>
            <path id="svg_2" fill="url(#orange_red)" filter="url(#blur-2px)" d="m967.5,-0.04688l-216.5,0.04688c37,221.66667 9,448.33333 -111,668l329,0c-0.5,-222.68229 -1,-445.36458 -1.5,-668.04688z"/>
          </g>
          </svg>
          <div className="menuWrapper">
            {
              menu.map((category,index) => {
                const item = category.list.map(item => 
                  <Link to={item.link}  key={item.name} onClick={ () => this.toggleMenu(item.name) }>
                    <div className='pc-leftbar-category-item'>
                      <i className={`iconfont ${item.icon}`} />
                      <span>{item.name}</span>
                    </div>
                  </Link> )
                return (
                  <div className='pc-leftbar-category' key={index}>
                    {category.name && <div className='pc-leftbar-category-label'>{ category.name }</div>} 
                    { item }
                  </div>
                )
              })
            }
            <div className='pc-leftbar-logo'>
              { profile ? 
                <React.Fragment>
                  <img src={profile.avatarUrl} alt="用户头像" className="pc-user-avatar"  onClick={ this.toggleLogin }/>
                  <span  onClick={ this.toggleLogin }>{profile.nickname}</span>
                </React.Fragment>
                : <React.Fragment>
                    <img src={logo} alt="logo" onClick={ this.toggleLogin }/>
                    <span onClick={ this.toggleLogin }>PLAY COLOR</span> 
                  </React.Fragment>
              }
            </div>
          </div>
        </div>
        </CSSTransition>
    )
  }
}

export default Leftbar

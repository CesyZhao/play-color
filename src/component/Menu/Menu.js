import React, {Component} from 'react'
import './Menu.less'
import logo from '../../asset/daydream.png'
import menu from './menus'
import { Link, withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import EventBus from '../../events'
import {connect} from "react-redux"
import http from '../../config/http'
import {formatList} from '../../util/audio'
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
  toggleMenu = (name) => {
    if (name === '私人 FM') {
      FM.getPersonalFM()
    }
    this.setState({
      showMenu: !this.state.showMenu
    }, () => {
      if (this.state.showMenu) {
        const canvas = document.querySelector('#menuCanvas')
        const context = canvas.getContext('2d')
        let grad = context.createLinearGradient(740, 0, 964, 608)//创建一个渐变色线性对象
        grad.addColorStop(0,"#4E8291")             //定义渐变色颜色
        grad.addColorStop(1,"#51416B")
        context.moveTo( 964, 0 )
        context.lineTo( 740, 0 )
        context.quadraticCurveTo(800, 304, 664, 608)
        context.lineTo( 964, 608 )
        context.fillStyle = grad
        context.shadowBlur = 30
        context.shadowColor = "#51416B"
        context.fill()
      }
    })
    EventBus.emit('closeMenu')
  }
  render () {
    const {profile}  = this.props.user
    return (
      <CSSTransition in={this.state.showMenu} timeout={300} unmountOnExit classNames="pc-leftbar">
        <div className='pc-leftbar'>
          <canvas id="menuCanvas" width="964" height="608"></canvas>
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

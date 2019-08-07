import React, {Component} from 'react'
import './Leftbar.less'
import logo from '../../asset/daydream.png'
import menu from './menu'
import { Link, withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import EventBus from '../../events'
import {connect} from "react-redux"

@withRouter
@connect(({user}) => ({
  user
}))
class Leftbar extends Component {
  state = {
    showMenu: false
  }
  toggleLogin = () => {
    console.log(11111111)
    const {profile} = this.props.user
    !profile && EventBus.emit('toggleLogin')
  }
  componentDidMount () {
    EventBus.on('toggleMenu', () => {
      this.toggleMenu()
    })
  }
  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }
  render () {
    const {profile}  = this.props.user
    return (
      <CSSTransition in={this.state.showMenu} timeout={300} unmountOnExit classNames="pc-leftbar">
        <div className='pc-leftbar'>
          <div className='pc-leftbar-logo'>
            {/* <Link to="/" onClick={ this.toggleMenu }>
              <img src={logo} alt="logo"/>
              <span>PLAY COLOR</span> 
            </Link> */}
            { profile ? 
              <React.Fragment onClick={ this.toggleLogin }>
                <img src={profile.avatarUrl} alt="用户头像" className="pc-user-avatar"/>
                <span>{profile.nickname}</span>
              </React.Fragment>
              : <React.Fragment>
                  <img src={logo} alt="logo" onClick={ this.toggleLogin }/>
                  <span onClick={ this.toggleLogin }>PLAY COLOR</span> 
                </React.Fragment>
             }
          </div>
          {
            menu.map((category,index) => {
              const item = category.list.map(item => 
                <Link to={item.link}  key={item.name} onClick={ this.toggleMenu }>
                  <div className='pc-leftbar-category-item'>
                    <i className={`iconfont ${item.icon}`} />
                    <span>{item.name}</span>
                  </div>
                </Link> )
              return (
                <div className='pc-leftbar-category' key={index}>
                  {/* {category.name && <div className='pc-leftbar-category-label'>{ category.name }</div>}  */}
                  { item }
                </div>
              )
            })
          }
        </div>
        </CSSTransition>
    )
  }
}

export default Leftbar

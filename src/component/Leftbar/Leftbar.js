import React, {Component} from 'react'
import './Leftbar.less'
import logo from '../../asset/daydream.png'
import menu from './menu'
import { Link, withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import EventBus from '../../events'
import {connect} from "react-redux"
import http from '../../config/http'
import {formatList} from '../../util/audio'

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
  toggleMenu = (name) => {
    if (name === '私人 FM') {
      http.get('/personal_fm')
      .then(({data}) => {
        let playlist = {}
        console.log(data.data)
        playlist.tracks = formatList(data.data)
        console.log(playlist)
      })
    }
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

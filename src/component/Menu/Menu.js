import React, {Component} from 'react'
import './Menu.less'
import menu from './menus'
import { Link, withRouter } from 'react-router-dom'
import EventBus from '../../events'
import {connect} from 'react-redux'
import FM from '../../entity/FM'
import _ from 'lodash'

@withRouter
@connect(({user}) => ({
  user
}))
class Leftbar extends Component {

  toggleLogin = () => {
    const {profile} = this.props.user
    _.isEmpty(profile) && EventBus.emit('toggleLogin')
  }

  toggleMenu = async (name, e) => {
    EventBus.emit('closeMenu')
    if (name === '私人 FM') {
      await FM.initFM()
      EventBus.emit('togglePlayingPanel')
    } else if (name === '搜索') {
      e.preventDefault()
      EventBus.emit('toggleSearch', true)
    }
  }

  render() {
    const { profile } = this.props.user
    return (
      <div className="pc-leftbar" onClick={this.toggleMenu}>
        <div className="menuWrapper">
          <div></div>
          {
            menu.map((category, index) => {
              const item = category.list.map(item =>
                <Link to={item.link} key={item.name} onClick={(e) => this.toggleMenu(item.name, e)}>
                  <div className={`pc-leftbar-category-item ${item.link === window.location.pathname ? 'active' : ''}`}>
                    <span>{item.name}</span>
                  </div>
                </Link>)
              return (
                <div className="pc-leftbar-category" key={index}>
                  {/* {category.name && <div className="pc-leftbar-category-label">{category.name}</div>} */}
                  {item}
                </div>
              )
            })
          }
          <div>
            {/* <Navigator></Navigator> */}
            <div className="pc-leftbar-logo" onClick={this.toggleLogin}>
              {!_.isEmpty(profile) ?
                <Link to={`/user/${profile.userId}`}>
                  <img src={profile.avatarUrl} alt="用户头像" className="pc-user-avatar" />
                  {/* <span onClick={this.toggleLogin}>{profile.nickname}</span> */}
                </Link>
                : <i className="iconfont icon-user11"></i>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Leftbar

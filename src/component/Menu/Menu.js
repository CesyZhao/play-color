import React, {Component} from 'react'
import './Menu.less'
import logo from '../../asset/daydream.png'
import menu from './menus'
import { Link, withRouter } from 'react-router-dom'
import EventBus from '../../events'
import {connect} from 'react-redux'
import FM from '../../entity/FM'

@withRouter
@connect(({user}) => ({
  user
}))
class Leftbar extends Component {

  toggleLogin = () => {
    const {profile} = this.props.user
    !profile && EventBus.emit('toggleLogin')
  }

  toggleMenu = async (name) => {
    EventBus.emit('closeMenu')
    if (name === '私人 FM') {
      await FM.initFM()
      EventBus.emit('togglePlayingPanel')
    } else if (name === '搜索') {
      EventBus.emit('toggleSearch', true)
    }
  }

  render() {
    const { profile } = this.props.user
    return (
      <div className="pc-leftbar" onClick={this.toggleMenu}>
        <div className="menuWrapper">
          {
            menu.map((category, index) => {
              const item = category.list.map(item =>
                <Link to={item.link} key={item.name} onClick={() => this.toggleMenu(item.name)}>
                  <div className="pc-leftbar-category-item">
                    <i className={`iconfont ${item.icon}`} />
                    {/* <span>{item.name}</span> */}
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
          <div className="pc-leftbar-logo">
            {profile ?
              <Link to={`/user/${profile.userId}`}>
                <img src={profile.avatarUrl} alt="用户头像" className="pc-user-avatar" onClick={this.toggleLogin} />
                {/* <span onClick={this.toggleLogin}>{profile.nickname}</span> */}
              </Link>
              : <React.Fragment>
                <img src={logo} alt="logo" onClick={this.toggleLogin} />
              </React.Fragment>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Leftbar

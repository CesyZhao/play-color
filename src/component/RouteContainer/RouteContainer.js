import React, { Component } from 'react'
import {Route, withRouter} from 'react-router-dom'
import Home from '../Home/Home'
import Albums from '../Albums/Albums'
import './RouteContainer.less'
import {connect} from "react-redux"
import EventBus from '../../events'

@withRouter
@connect(({user}) => ({
  user
}))
class RouteContainer extends Component{

  toggleLogin = () => {
    const {profile} = this.props.user
    !profile && EventBus.emit('toggleLogin')
  }

  render() {
    const {profile}  = this.props.user
    return(
      <div className="pc-route-container">
        <div className="pc-tool-bar">
          <div className="pc-tool-bar-tools">
            <i className="iconfont icon-fanhui"/>
            <i className="iconfont icon-gengduo"/>
          </div>
          <div className='pc-tool-bar-search'>
            <input placeholder='Search something....'></input>
            <i className='iconfont icon-sousuo1'></i>
          </div>
          <div className="pc-tool-bar-tools" onClick={this.toggleLogin}>
            {
              profile && profile.nickname
            }
            {
              profile ? <img src={profile.avatarUrl} alt="用户头像" className="pc-user-avatar"/> : <i className="iconfont icon-user11 pc-user-avatar" />
            }
          </div>
        </div>
        <div className="pc-routes">
          <Route path="/" exact component={Home} />
          <Route path="/albums" component={Albums} />
        </div>
      </div>
    )
  }
}

export default RouteContainer

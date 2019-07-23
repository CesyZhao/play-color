import React, { Component } from 'react'
import {Route, withRouter} from 'react-router-dom'
import Home from '../Home/Home'
import Album from '../Album/Album'
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

  handleHistory = (index) => {
    window.history.go(index)
  }

  render() {
    const {profile}  = this.props.user
    return(
      <div className="pc-route-container">
        <div className="pc-tool-bar">
          <div className="pc-tool-bar-tools">
            <i className="iconfont icon-fanhui" onClick={ () => this.handleHistory(-1) }/>
            <i className="iconfont icon-gengduo" onClick={ () => this.handleHistory(1) }/>
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
          <Route path="/album/:id" component={Album} />
          <Route path="/albums" component={Albums} />
        </div>
      </div>
    )
  }
}

export default RouteContainer

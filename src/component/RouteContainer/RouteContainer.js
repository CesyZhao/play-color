import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Home from '../Home/Home'
import './RouteContainer.less'
import {connect} from "react-redux"
import EventBus from '../../events'

@connect(({user}) => ({
  user
}))
class RouteContainer extends Component{

  toggleLogin = () => {
    const { userInfo } = this.props.user
    !userInfo && EventBus.emit('toggleLogin')
  }

  render() {
    const { userInfo } = this.props.user
    return(
      <div className="pc-route-container">
        <div className="pc-tool-bar">
          <div className="pc-tool-bar-tools">
            <i className="iconfont icon-fanhui"/>
            <i className="iconfont icon-gengduo"/>
          </div>
          <div className="pc-tool-bar-tools" onClick={this.toggleLogin}>
            {/*<i className="iconfont icon-shezhi"/>*/}
            {
              userInfo ? <img src={userInfo.picUrl} alt="用户头像" className="pc-user-avatar"/> : <i className="iconfont icon-user11 pc-user-avatar" />
            }
          </div>
        </div>
        <div className="pc-routes">
          <Route path="/" exact component={Home} />
        </div>
      </div>
    )
  }
}

export default RouteContainer

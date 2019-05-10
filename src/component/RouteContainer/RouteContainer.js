import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Home from '../Home/Home'
import './RouteContainer.less'

class RouteContainer extends Component{

  render() {
    return(
      <div className="pc-route-container">
        <div className="pc-tool-bar">
          <div className="pc-tool-bar-tools">
            <i className="iconfont icon-fanhui"/>
            <i className="iconfont icon-gengduo"/>
          </div>
          <div className="pc-tool-bar-tools">
            <i className="iconfont icon-shezhi"/>
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

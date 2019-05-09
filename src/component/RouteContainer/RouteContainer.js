import React, { Component } from 'react'
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
      </div>
    )
  }
}

export default RouteContainer

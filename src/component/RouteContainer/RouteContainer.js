import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Home from '../Home/Home'
import Album from '../Album/Album'
import Albums from '../Albums/Albums'
import './RouteContainer.less'
import EventBus from '../../events'


class RouteContainer extends Component{

  state = {
    menuDisplayed: false
  }

  componentDidMount () {
    EventBus.on('closeMenu', () => {
      this.setState({
        menuDisplayed: false
      })
    })
  }

  toggleMenu = () => {
    EventBus.emit('toggleMenu')
    this.setState({
      menuDisplayed: !this.state.menuDisplayed
    })
  }

  handleHistory = (index) => {
    window.history.go(index)
  }

  render() {
    return(
      <div className="pc-route-container">
        <div className="pc-tool-bar">
          <div className="pc-tool-bar-tools">
            <i className="iconfont icon-fanhui" onClick={ () => this.handleHistory(-1) }/>
            <i className="iconfont icon-gengduo" onClick={ () => this.handleHistory(1) }/>
          </div>
          <div className="pc-tool-bar-tools" >
            <i className={ `iconfont icon-diandiandianshu ${this.state.menuDisplayed ? 'icon-you' : 'icon-menu'}` } onClick={ this.toggleMenu }></i>
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

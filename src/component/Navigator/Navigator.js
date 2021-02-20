import React, { Component } from 'react'
import './Navigator.less'
import { createBrowserHistory } from 'history'

class Navigator extends Component{
  state = {
    history: createBrowserHistory()
}

  handleHistory = (index) => {
    this.state.history.go(index)
  }

  render() {
    const { history } = this.state
    console.log(history.length, history.index)
    return (
      <div className="pc-navigator">
        <div className="pc-navigator-tools">
          <i className={`iconfont icon-fanhui ${history.index === 0 && 'disabled'}`} onClick={() => this.handleHistory(-1)} />
          <i className={`iconfont icon-gengduo ${history.index === history.length - 1 && 'disabled'}`} onClick={() => this.handleHistory(1)} />
        </div>
      </div>
    )
  }
}

export default Navigator
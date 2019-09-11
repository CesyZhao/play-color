import React, { Component } from 'react'
import './Search.less'

class Search extends Component {
  render () {
    return (
      <div className="pc-search">
        <div className="pc-search-input-wrapper">
          <input className="pc-search-input" placeholder="输入搜索关键字"></input>
          <i className="iconfont icon-sousuo1"></i>
        </div>
      </div>
    ) 
  }
}

export default Search
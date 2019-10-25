import React, { Component } from 'react'
import './RankingList.less'
import {Link} from 'react-router-dom'
import http from '../../config/http'

class RankingList extends Component {
  state = {
    rankingList: []
  }
  
  componentWillMount () {
    http.get('/toplist/detail')
    .then(({data}) => {
      this.setState({
        rankingList: data.list
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render () {
    return (
      <div className="pc-ranking-list">
        {
          this.state.rankingList.map(item => {
            return (
              <Link to={ `/album/${item.id}` }>
                <div className="pc-ranking-list-item">
                  <img src={ item.coverImgUrl } alt="榜单封面"></img>
                  <span className="pc-ranking-list-item-count"> 
                    <i className="iconfont icon-bofangqi-bofang"></i>
                    <span> { Math.round(item.playCount / 10000).toFixed(0) }万 </span>
                  </span>
                  <span className="pc-ranking-list-item-name"> {item.name} </span>
                </div>
              </Link>
            )
          })
        }
      </div>
    )
  }
}

export default RankingList
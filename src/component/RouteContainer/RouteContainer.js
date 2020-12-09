import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Home from '../Home/Home'
import Album from '../Album/Album'
import Albums from '../Albums/Albums'
import Artist from '../Artist/Artist'
import User from '../User/User'
import RankingList from '../RankingList/RankingList'
import Comment from '../Comment/Comment'
import Moments from '../Moments/Moments'
import './RouteContainer.less'


class RouteContainer extends Component{

  render() {
    return(
      <div className="pc-route-container">
        <Route path="/" exact component={Home} />
        <Route path="/album/:id" component={Album} />
        <Route path="/albums" component={Albums} />
        <Route path="/artist/:id" component={Artist}></Route>
        <Route path="/user/:id" component={User}></Route>
        <Route path="/rankingList" component={RankingList}></Route>
        <Route path="/comment" component={Comment}></Route>
        <Route path="/moments" component={Moments}></Route>
      </div>
    )
  }
}

export default RouteContainer

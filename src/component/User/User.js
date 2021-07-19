import React, { Component } from 'react'
import './User.less'
import _ from 'lodash'
import Pagination from '../Pagination/Pagination'
import { Link } from 'react-router-dom'
import api from '../../config/api'
import {connect} from 'react-redux'
import { doLogout } from '../../store/action/user'

const createdListPageSize = 20
const subListPageSize = 20

@connect()
class User extends Component {
  state = {
    user: {},
    createdList: [],
    subList: [],
    currentCreatedListPage: 0,
    currentSubListPage: 0
  }
  async componentWillMount() {
    const { id } = this.props.match.params
    const { data } = await api.user.getUserDetail({ uid: id })
    const { data: playlist } = await api.user.getUserPlaylist({ uid: id })
    const createdList = []
    const subList = []
    playlist.playlist.forEach(album => {
      if (album.creator.userId === data.profile.userId) {
        createdList.push(album)
      } else {
        subList.push(album)
      }
    })
    this.setState({ user: data, createdList, subList})
  }
  handleLogout = () => {
    this.props.dispatch(doLogout())
  }
  render() {
    const { user, createdList, subList, currentCreatedListPage, currentSubListPage } = this.state
    console.log(user)
    return (
      !_.isEmpty(user)
      ?
      <div className="pc-user">
        <div className="pc-user-profile">
          <div className="pc-user-avatar">
            <img src={user.profile.avatarUrl}></img>
          </div>
          <div className="pc-user-info">
            <span className="pc-user-nickname">
              <span>{user.profile.nickname}</span>
              <span className="iconfont icon-tubiaozhizuomoban-" title="登出" onClick={this.handleLogout}></span>
            </span>
            <span>
              <span className="pc-user-level">Lv.{user.level} </span>
              <span className="pc-user-level"><i className={`iconfont ${ user.profile.gender === 1 ? 'icon-nan male' : 'icon-nv female' }`}></i> </span>
              <span className="pc-user-signature"> {user.profile.signature} </span>
            </span>
          </div>
        </div>
        <div className="pc-user-playlists">
          <div className="pc-user-createdList">
            <div className="pc-user-list-header">
              <span> PLAYLISTS {createdList.length} </span>
              <Pagination pageSize={createdListPageSize} jumpable={false} total={createdList.length} onPageChange={(page) => this.setState({currentCreatedListPage: page - 1})}></Pagination>
            </div>
            <div className="pc-user-list">
              {
                createdList.slice(currentCreatedListPage * createdListPageSize, (currentCreatedListPage + 1) * createdListPageSize ).map(item => {
                  return (
                    <div className="pc-user-list-item" key={item.id}>
                      <Link to={`/album/${item.id}`} >
                        <img src={item.coverImgUrl} alt="歌单封面"></img>
                        <div> {item.name} </div>
                        <div> {item.trackCount} </div>
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="pc-user-subList">
            <div className="pc-user-list-header">
              <span> COLLECTIONS {subList.length} </span>
              <Pagination pageSize={subListPageSize} jumpable={false} total={subList.length} onPageChange={(page) => this.setState({currentSubListPage: page - 1})}></Pagination>
            </div>
            <div className="pc-user-list">
              {
                subList.slice(currentSubListPage * subListPageSize, (currentSubListPage + 1) * subListPageSize ).map(item => {
                  return (
                    <div className="pc-user-list-item" key={item.id}>
                      <Link to={`/album/${item.id}`} >
                        <img src={item.coverImgUrl} alt="歌单封面"></img>
                        <div> {item.name} </div>
                        <div> {item.trackCount} </div>
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      :
      <div></div>
    )
  }
}

export default User

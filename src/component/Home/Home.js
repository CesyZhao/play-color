import React, {Component} from 'react'
import './Home.less'
import http from '../../config/http'
// eslint-disable-next-line no-unused-vars
import LazyImage from '../LazyImage/LazyImage'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import _ from 'lodash'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import scripts from '../../config/scripts'
import { updatePlayingSong, updatePlayingAlbum } from '../../store/action/controller'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

@connect()
class Home extends Component {

  state = {
    albumList: [],
    banners: [],
    newest: [],
    loading: true
  }

  async componentWillMount() {
    let albumRes = await http.get('/personalized')
    let bannerRes = await http.get('/banner')
    let topRes = await http.get('/top/song?type=0')
    this.setState({
      albumList: _.take(albumRes.data.result, 12),
      banners: bannerRes.data.banners,
      newest: _.take(topRes.data.data, 10)})
    setTimeout(() => {
      this.setState({loading: false})
    }, 2000)
  }

  handleSongClick = (song) => {
    this.props.dispatch(updatePlayingSong(song))
    this.props.dispatch(updatePlayingAlbum({ tracks: this.state.newest, id: 'findMusic', name: '发现音乐' }))
  }

  render() {
    return (
      this.state.loading
        ? <div className="pc-home loading">
            <svg className="loading" viewBox="25 25 50 50">
              <circle cx="50" cy="50" r="20"></circle>
            </svg>
            <span>
              {scripts[Math.floor(Math.random() * scripts.length)]}
            </span>
          </div>
        :
        <div className="pc-home">
          <div className="pc-home-category-left">
            <div>
              <div className="pc-home-banner">
                <AutoPlaySwipeableViews>
                {
                  this.state.banners.map((banner, index) => <img alt="banner" key={banner.encodeId + index} src={banner.imageUrl}></img>)
                }
                </AutoPlaySwipeableViews>
              </div>
            </div>
            <div>
              <div className="pc-home-category-title">
                <Link to="/albums">
                  推荐歌单 <i className="iconfont icon-gengduo"></i>
                </Link>
              </div>
              <div className="pc-home-recommand">
                {
                  this.state.albumList.map(album => {
                    return (
                      <Link key={album.id} to={{pathname: `/album/${album.id}`}}>
                        <div className="pc-personalized-album" data-name={album.name}>
                          <LazyImage imgUrl={album.picUrl} />
                        </div>
                      </Link>
                    )
                  })
                }
              </div>
          </div>
        </div>
        <div className="pc-home-category-right">
          <div className="pc-home-category-title">最新音乐</div>
          <div className="pc-home-newest">
              {
                this.state.newest.map((song, index) => {
                  return (
                    <div className="pc-home-newest-song" key={song.id} onClick={() => this.handleSongClick(song)}>
                      {/* <img src={song.album.picUrl} alt='songCover'/> */}
                      <LazyImage imgUrl={song.album.picUrl} />
                      <span>{index + 1}</span>
                      <span>{song.name}</span>
                    </div>
                  )
                })
              }
          </div>
        </div>
      </div>
    )
  }
}

export default Home

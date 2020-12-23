import React, {Component} from 'react'
import './Home.less'
// eslint-disable-next-line no-unused-vars
import LazyImage from '../LazyImage/LazyImage'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import _ from 'lodash'
import { formatDuration } from '../../util/audio'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import scripts from '../../config/scripts'
import { updatePlayingSong, updatePlayingAlbum } from '../../store/action/controller'
import api from '../../config/api'
import EventBus from '../../events'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

@connect()
class Home extends Component {

  state = {
    albumList: [],
    banners: [],
    newest: [],
    calendarEvents: [],
    loading: true
  }

  async componentWillMount() {
    const personalizedPromise = api.home.getPersonalized()
    const bannerPromise = api.home.getBanner()
    const topPromise = api.home.getTopSong()
    const now = new Date().valueOf()
    const offset = 24 * 60 * 1000
    const startTime = now - offset
    const endTime = now + offset
    const calendarPromise = api.home.getCalendar({ startTime, endTime })
    let albumRes = await personalizedPromise
    let bannerRes = await bannerPromise
    let topRes = await topPromise
    let calendarRes = await calendarPromise
    this.setState({
      albumList: _.take(albumRes.data.result, 8),
      banners: bannerRes.data.banners,
      newest: _.take(topRes.data.data, 5),
      calendarEvents: calendarRes.data.data.calendarEvents
    }),
    setTimeout(() => {
      this.setState({loading: false})
      EventBus.emit('content-loaded')
    }, 2000)
  }

  handleSongClick = (song) => {
    this.props.dispatch(updatePlayingSong(song))
    this.props.dispatch(updatePlayingAlbum({ tracks: this.state.newest, id: 'findMusic', name: '发现音乐' }))
  }

  today = new Date()

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
          <div>
            <div className="pc-home-category-left">
              <div className="pc-home-banner">
                <AutoPlaySwipeableViews resistance className="pc-home-banner-swiper">
                  {
                    this.state.banners.map((banner, index) => <img alt="banner" key={banner.encodeId + index} src={banner.imageUrl}></img>)
                  }
                </AutoPlaySwipeableViews>
              </div>
            </div>
            <div className="pc-home-calendar">
              <div className="pc-home-calendar-header">
                <span className="pc-home-calendar-date"> {this.today.getDate()} </span>
                /
                <span> {this.today.getMonth() + 1} </span>
              </div>
              <div className="pc-home-calendar-content">
                {
                  this.state.calendarEvents.length > 0 ?
                    <AutoPlaySwipeableViews resistance className="pc-home-banner-swiper" axis="y">
                      {
                        this.state.calendarEvents.map(event => <img alt="banner" key={event.id} src={event.imgUrl}></img>)
                      }
                    </AutoPlaySwipeableViews> :
                    <div> 暂无事件 </div>
                }
              </div>
            </div>
          </div>
          <div>
            <div className="pc-home-category-right">
              <div className="pc-home-category-title">最新音乐</div>
              <div className="pc-home-newest">
                {
                  this.state.newest.map(song => {
                    console.log(song)
                    return (
                      <div className="pc-home-newest-song" key={song.id} onClick={() => this.handleSongClick(song)}>
                        <LazyImage imgUrl={song.album.picUrl} />
                        <div>
                          <div>{song.name}</div>
                          <div>
                            <span>{song.artists.map(ar => ar.name).join('/')}</span>
                            <span>{formatDuration(song.duration)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
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
                      <Link key={album.id} to={{ pathname: `/album/${album.id}` }}>
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
        </div>
    )
  }
}

export default Home

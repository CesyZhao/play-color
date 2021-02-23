import React, {Component} from 'react'
import './Home.less'
// eslint-disable-next-line no-unused-vars
import LazyImage from '../LazyImage/LazyImage'
import SwipeableViews from 'react-swipeable-views'
import Pagination from '../SwiperPagination/Pagination'
import { autoPlay } from 'react-swipeable-views-utils'
import _ from 'lodash'
import { formatDuration } from '../../util/audio'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import scripts from '../../config/scripts'
import { updatePlayingSong, updatePlayingAlbum } from '../../store/action/controller'
import { updateHomeContent } from '../../store/action/home'
import api from '../../config/api'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

@connect(({ controller, user, home }) => ({
  controller,
  user,
  home
}))
class Home extends Component {

  state = {
    albumList: [],
    banners: [],
    newest: [],
    calendarEvents: [],
    loading: true,
    index: 0
  }

  static async getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user && prevState.user && nextProps.user.userId !== prevState.user.userId) {
      const startTime = new Date().setHours(0, 0, 0, 0)
      const endTime = new Date().setHours(23, 59, 59, 0)
      const calendarPromise = api.home.getCalendar({ startTime, endTime })
      const personalizedPromise = api.home.getPersonalized()
      let albumRes = await personalizedPromise
      const albumList = _.take(albumRes.data.result, 8)
      let calendarEvents
      try {
        const calendarRes = await calendarPromise
        calendarEvents = calendarRes.data.data.calendarEvents
      } catch (e) {
        calendarEvents = []
      }
      return {
        albumList,
        calendarEvents
      }
    }
    return null
  }

  componentDidMount() {
    const { content } = this.props.home
    this.setState({
      loading: !content
    })
    if (content) {
      const { albumList, banners, newest } = content
      this.setState({
        albumList,
        banners,
        newest
      })
    }
    this.getNewHomeContent()
    // 图片等内容的渲染
    setTimeout(() => {
      this.setState({loading: false})
    }, 2000)
  }

  getNewHomeContent = async () => {
    const personalizedPromise = api.home.getPersonalized()
    const bannerPromise = api.home.getBanner()
    const topPromise = api.home.getTopSong()
    const startTime = new Date().setHours(0, 0, 0, 0)
    const endTime = new Date().setHours(23, 59, 59, 0)
    const calendarPromise = api.home.getCalendar({ startTime, endTime })
    let albumRes = await personalizedPromise
    let bannerRes = await bannerPromise
    let topRes = await topPromise
    let calendarEvents
    try {
      const calendarRes = await calendarPromise
      calendarEvents = calendarRes.data.data.calendarEvents
    } catch (e) {
      calendarEvents = []
    }
    const { controller, user } = this.props
    const { song } = controller
    const albumList = _.take(albumRes.data.result, 8)
    const banners = bannerRes.data.banners
    const newest = _.take(topRes.data.data, 5)
    if (_.isEmpty(song) || _.isEmpty(user.profile)) {
      this.handleSongClick(newest[0])
    }
    this.setState({
      albumList,
      banners,
      newest,
      calendarEvents
    }),
    this.props.dispatch(updateHomeContent({ content: { albumList, banners, newest } }))
  }

  handleSongClick = (song) => {
    this.props.dispatch(updatePlayingSong(song))
    this.props.dispatch(updatePlayingAlbum({ tracks: this.state.newest, id: 'findMusic', name: '发现音乐' }))
  }

  handleChangeIndex = index => {
    this.setState({
      index
    })
  }

  today = new Date()

  render() {
    const { index } = this.state
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
                <AutoPlaySwipeableViews resistance className="pc-home-banner-swiper" interval={10000} index={index} onChangeIndex={this.handleChangeIndex}>
                  {
                    this.state.banners.map((banner, index) => <img alt="banner" key={banner.encodeId + index} src={banner.imageUrl}></img>)
                  }
                </AutoPlaySwipeableViews>
                <Pagination dots={this.state.banners.length} index={index} onChangeIndex={this.handleChangeIndex} />
              </div>
            </div>
            <div className="pc-home-calendar">
              <div className="pc-home-calendar-header">
                <span className="pc-home-calendar-date"> {this.today.getDate()} </span>
                /
                <span className="pc-home-calendar-month"> {this.today.getMonth() + 1} </span>
              </div>
              <div className="pc-home-calendar-content">
                {
                  this.state.calendarEvents.length > 0 ?
                    <AutoPlaySwipeableViews resistance className="pc-home-calendar-swiper" axis="y" slideStyle={{ height: '100%' }} containerStyle={{ height: '100%' }} interval={10000}>
                      {
                        this.state.calendarEvents.map(event => {
                          return (
                            <div className="pc-home-calendar-event" key={event.id} >
                              <img alt="banner" src={event.imgUrl}></img>
                              <div> {event.title} </div>
                            </div>
                          )
                        })
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

import React, {Component} from 'react'
import './Home.less'
// eslint-disable-next-line no-unused-vars
import LazyImage from '../LazyImage/LazyImage'
// import SwipeableViews from 'react-swipeable-views'
// import Pagination from '../SwiperPagination/Pagination'
// import { autoPlay } from 'react-swipeable-views-utils'
import _ from 'lodash'
// import { formatDuration } from '../../util/audio'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import scripts from '../../config/scripts'
import { updateHomeContent } from '../../store/action/home'
import { formatCount } from '../../util/index'
import api from '../../config/api'

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

@connect(({ controller, user, home }) => ({
  controller,
  user,
  home
}))
class Home extends Component {

  state = {
    albumList: [],
    displayAlbums: [],
    loading: true,
    index: 3
  }

  static async getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user && prevState.user && nextProps.user.userId !== prevState.user.userId) {
      const personalizedPromise = api.home.getPersonalized()
      let albumRes = await personalizedPromise
      const albumList = _.take(albumRes.data.result, 8)
      return {
        albumList
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
      const { albumList } = content
      this.setState({
        albumList
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
    let albumRes = await personalizedPromise
    const albumList = _.take(albumRes.data.result, 10)
    const displayAlbums = [albumList[0], ..._.takeRight(albumList, 2)]
    this.setState({
      albumList,
      displayAlbums,
      index: 0
    }),
    this.props.dispatch(updateHomeContent({ content: { albumList } }))
  }

  handleIndeChange = direction => {
    const { index, albumList } = this.state
    let nextIndex = index + direction
    if (nextIndex < 0) {
      nextIndex = albumList.length - 1
    } else if (nextIndex === albumList.length) {
      nextIndex = 0
    }
    this.setState({
      index: nextIndex
    })
  }

  today = new Date()

  getClass = (i) => {
    const { index, albumList } = this.state
    if (i === index) {
      return 'current'
    }
    if ((index === 0 && albumList.length - i === 1) || index - i === 1) {
      return 'prev'
    }
    if ((index === 0 && albumList.length - i === 2) || (index === 1 && albumList.length - i === 1) || index - i === 2) {
      return 'prev-2'
    }
    if (index + 1 === i || (index === albumList.length - 1 && i === 0)) {
      return 'next'
    }
  }

  render() {
    const { albumList, index } = this.state
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
        : <div className="pc-home-recommand-wrapper">
            <div className="switch-button prev" onClick={() => this.handleIndeChange(-1)}> <i className="iconfont icon-fanhui"></i> </div>
            <div className="pc-home-recommand">
            {
              albumList.map((album, i) => {
                return (
                  <div key={album.id} className={`pc-personalized-album ${this.getClass(i)}`}>
                    <LazyImage imgUrl={album.picUrl} />
                  </div>
                )
              })
            }
            </div>
          <div className="current-album-info">
            <div className="name">{albumList[index].name}</div>
            <div className="info">
              <span> <span className="number">{formatCount(albumList[index].playCount)}</span> PLAY COUNTS</span>
              <span> <span className="number">{albumList[index].trackCount}</span>  TRACKS</span> </div>
            <div className="buttons">
              <span className="button">PLAY NOW</span>
              <Link to={{ pathname: `/album/${albumList[index].id}` }}>
                <span className="button album">
                  ALBUM
                </span>
              </Link>
            </div>
          </div>
          <div className="switch-button next" onClick={() => this.handleIndeChange(1)}> <i className="iconfont icon-gengduo"></i>  </div>
        </div>
        // <div className="pc-home">
        //   <div>
        //     <div className="pc-home-category-left">
        //       <div className="pc-home-banner">
        //         <AutoPlaySwipeableViews resistance className="pc-home-banner-swiper" interval={10000} index={index} onChangeIndex={this.handleChangeIndex}>
        //           {
        //             this.state.banners.map((banner, index) => <img alt="banner" key={banner.encodeId + index} src={banner.imageUrl}></img>)
        //           }
        //         </AutoPlaySwipeableViews>
        //         <Pagination dots={this.state.banners.length} index={index} onChangeIndex={this.handleChangeIndex} />
        //       </div>
        //     </div>
        //     <div className="pc-home-calendar">
        //       <div className="pc-home-calendar-header">
        //         <span className="pc-home-calendar-date"> {this.today.getDate()} </span>
        //         /
        //         <span className="pc-home-calendar-month"> {this.today.getMonth() + 1} </span>
        //       </div>
        //       <div className="pc-home-calendar-content">
        //         {
        //           this.state.calendarEvents.length > 0 ?
        //             <AutoPlaySwipeableViews resistance className="pc-home-calendar-swiper" axis="y" slideStyle={{ height: '100%' }} containerStyle={{ height: '100%' }} interval={10000}>
        //               {
        //                 this.state.calendarEvents.map(event => {
        //                   return (
        //                     <div className="pc-home-calendar-event" key={event.id} >
        //                       <img alt="banner" src={event.imgUrl}></img>
        //                       <div> {event.title} </div>
        //                     </div>
        //                   )
        //                 })
        //               }
        //             </AutoPlaySwipeableViews> :
        //             <div> 暂无事件 </div>
        //         }
        //       </div>
        //     </div>
        //   </div>
        //   <div>
        //     <div className="pc-home-category-right">
        //       <div className="pc-home-category-title">最新音乐</div>
        //       <div className="pc-home-newest">
        //         {
        //           this.state.newest.map(song => {
        //             return (
        //               <div className="pc-home-newest-song" key={song.id} onClick={() => this.handleSongClick(song)}>
        //                 <LazyImage imgUrl={song.album.picUrl} />
        //                 <div>
        //                   <div>{song.name}</div>
        //                   <div>
        //                     <span>{song.artists.map(ar => ar.name).join('/')}</span>
        //                     <span>{formatDuration(song.duration)}</span>
        //                   </div>
        //                 </div>
        //               </div>
        //             )
        //           })
        //         }
        //       </div>
        //     </div>
        //     <div>
        //       <div className="pc-home-category-title">
        //         <Link to="/albums">
        //           推荐歌单 <i className="iconfont icon-gengduo"></i>
        //         </Link>
        //       </div>
        //       <div className="pc-home-recommand">
        //         {
        //           this.state.albumList.map(album => {
        //             return (
        //               <Link key={album.id} to={{ pathname: `/album/${album.id}` }}>
        //                 <div className="pc-personalized-album" data-name={album.name}>
        //                   <LazyImage imgUrl={album.picUrl} />
        //                 </div>
        //               </Link>
        //             )
        //           })
        //         }
        //       </div>
        //     </div>
        //   </div>
        // </div>
    )
  }
}

export default Home

import React, {Component} from 'react'
import './Home.less'
import http from '../../config/http'
// eslint-disable-next-line no-unused-vars
import LazyImage  from '../LazyImage/LazyImage'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import _ from 'lodash'
import {UPDATE_PLAYING_SONG} from '../../store/Action/actions'
import {connect} from 'react-redux'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

@connect()
class Home extends Component {

  state = {
    albumList: [],
    banners: [],
    newest: [],
    loading: true
  }

  async componentWillMount () {
    let albumRes = await http.get('/personalized')
    let bannerRes = await http.get('/banner')
    let topRes = await http.get('/top/song?type=0')
    this.setState({
      albumList: _.take(albumRes.data.result, 8),
      banners: bannerRes.data.banners,
      newest: _.take(topRes.data.data, 10)})
    setTimeout(() => {
      this.setState({loading: false})
    }, 2000)
  }

  handleSongClick = (song) => {
    this.props.dispatch({
      type: UPDATE_PLAYING_SONG,
      song
    })
  }

  render() {
    return (
      this.state.loading
        ? <div className="pc-home">
            <svg viewBox="25 25 50 50">
              <circle cx="50" cy="50" r="20"></circle>
            </svg>
        </div>
        : <div className="pc-home">
        <div className='pc-home-category-left'>
          <div>
            <div className='pc-home-category-title'>Today's Topic</div>
            <div className='pc-home-banner'>
              <AutoPlaySwipeableViews>
                {
                  this.state.banners.map((banner,index) => <img src={banner.imageUrl} alt='banner' key={banner.encodeId + index}></img>)
                }
              </AutoPlaySwipeableViews>
            </div>
          </div>
          <div>
            <div className='pc-home-category-title'>Recommand Albums</div>
            <div className='pc-home-recommand'>
              {
                this.state.albumList.map(album => {
                  return (
                    <div className='pc-personalized-album' key={album.id} data-name={album.name}>
                      {/* <img src={album.picUrl} alt='albumPic'/> */}
                      <LazyImage imgUrl={album.picUrl} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className='pc-home-category-right'>
          <div className='pc-home-category-title'>Newest</div>
          <div className='pc-home-newest'>
              {
                this.state.newest.map((song,index) => {
                  return (
                    <div key={song.id} className='pc-home-newest-song' onClick={() => this.handleSongClick(song)}>
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

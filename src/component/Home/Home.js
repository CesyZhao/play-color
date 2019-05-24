import React, {Component} from 'react'
import './Home.less'
import http from '../../config/http'
// eslint-disable-next-line no-unused-vars
import LazyImage  from '../LazyImage/LazyImage'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class Home extends Component {

  state = {
    albumList: [],
    banners: []
  }

  async componentWillMount () {
    let res = await http.get('/personalized')
    this.setState({albumList: res.data.result})
    let bannerRes = await http.get('/banner')
    this.setState({banners: bannerRes.data.banners})
    console.log(bannerRes)
  }

  render() {
    return (
      <div className="pc-home">
        <div className='pc-home-category-left'>
          <div className='pc-home-category-title'>Today's Topic</div>
          <div className='pc-home-banner'>
            <AutoPlaySwipeableViews>
              {
                this.state.banners.map(banner => <img src={banner.imageUrl} alt='banner'></img>)
              }
            </AutoPlaySwipeableViews>
          </div>
        </div>
        <div className='pc-home-category-right'>
          <div className='pc-home-category-title'>Newest</div>
        </div>
        {
          this.state.albumList.map(album => {
            return (
              <div className='pc-personalized-album' key={album.id}>

              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Home

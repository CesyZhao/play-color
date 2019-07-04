import React, {Component} from 'react'
import http from '../../config/http'
import LazyImage from '../LazyImage/LazyImage'
import './Album.less'

class Album extends Component {
  state = {
    album: null
  }

  async componentDidMount () {
    try {
      const { data } = await http.get(`/playlist/detail?id=${this.props.match.params.id}`)
      console.log(data.playlist)
      this.setState({ album: data.playlist })
    } catch (error) {
      console.log(error)
    }
  }
  
  render() {
    const { album } = this.state
    console.log( album )
    return (
      album &&
      <div className='pc-album'>
        <div className='pc-album-info'>
          <div className='pc-album-cover'>
            <LazyImage imgUrl={ album.coverImgUrl  }></LazyImage>
          </div>
          <div className='pc-album-detail'>
            <div className='pc-album-text'> { album.name } </div>  
            <div className='pc-album-text pc-album-creator'> 
              <span className='pc-album-creator-avatar'>
                <LazyImage imgUrl={ album.creator.avatarUrl }></LazyImage>
              </span>
              <span className='pc-album-creator-nickname'>{ album.creator.nickname }</span>
            </div>
            <div className='pc-album-text pc-album-tags'>
              { album.tags.join('/') }
            </div>
            <div className='pc-album-counts'>
              <span className='pc-album-play-all'> <i className='iconfont icon-bofangqi-bofang'></i> 播放全部 </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Album
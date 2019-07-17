import React, {Component} from 'react'
import http from '../../config/http'
import LazyImage from '../LazyImage/LazyImage'
import './Album.less'
import Playlist from '../PlayList/PlayList'

const fields = [
  {
    name: 'name',
    title: '歌名',
    flex: 2
  },
  {
    name: 'ar',
    alias: 'artists',
    title: '歌手',
    flex: 2
  },
  {
    name: 'al',
    alias: 'album',
    title: '专辑',
    flex: 2
  },
  {
    name: 'dt',
    alias: 'duration',
    title: '时长',
    flex: 1
  }
]
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
            <div className='pc-album-tags'>
              <span className='pc-album-text'> { album.tags.join('/') } </span>
              <span className='pc-album-text'> 播放量: { (album.playCount / 10000).toFixed(2) } 万</span>
              <span className='pc-album-text'> { album.tracks.length } 首</span>
            </div>
            <div className='pc-album-counts'>
              <span className='pc-album-play-all'> <i className='iconfont icon-bofangqi-bofang'></i> 播放全部 </span>
            </div>
          </div>
        </div>
        <Playlist fields={ fields } list={ album.tracks } className='pc-album-list'>

        </Playlist>
      </div>
    )
  }
}

export default Album
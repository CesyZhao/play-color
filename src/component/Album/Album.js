import React, {Component} from 'react'
import http from '../../config/http'
import LazyImage from '../LazyImage/LazyImage'
import './Album.less'
import Playlist from '../PlayList/PlayList'
import {formatList} from '../../util/audio'
import AlbumLoader from '../Loaders/AlbumLoader'

const fields = [
  {
    name: 'name',
    title: '歌名',
    flex: 2
  },
  {
    name: 'artists',
    alias: 'artists',
    title: '歌手',
    flex: 2
  },
  {
    name: 'album',
    alias: 'album',
    title: '专辑',
    flex: 2
  },
  {
    name: 'duration',
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
      let { playlist } = data
      let songs = formatList(playlist.tracks)
      playlist.tracks = songs
      this.setState({ album: playlist })
    } catch (error) {
      console.log(error)
    }
  }
  
  render() {
    const { album } = this.state
    return (
      album ?
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
              <div className='pc-album-text'> { album.tags.join('/') } </div>
              <div className='pc-album-text'> 播放量: { (album.playCount / 10000).toFixed(2) } 万</div>
              <div className='pc-album-text'> { album.tracks.length } 首</div>
            </div>
            <div className='pc-album-counts'>
              <div className='pc-album-play-all'> <i className='iconfont icon-bofangqi-bofang'></i> 播放全部 </div>
            </div>
          </div>
        </div>
        <Playlist fields={ fields } album={ album } className='pc-album-list'>

        </Playlist>
      </div>
      :
     <AlbumLoader></AlbumLoader>
    )
  }
}

export default Album
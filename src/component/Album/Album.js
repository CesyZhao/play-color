import React, {Component} from 'react'
import http from '../../config/http'
import LazyImage from '../LazyImage/LazyImage'
import './Album.less'
import Playlist from '../PlayList/PlayList'
import {formatList} from '../../util/audio'
import ContentLoader from "react-content-loader"

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
      <ContentLoader 
        height={512}
        width={964}
        speed={1}
        primaryColor="#fffff"
        secondaryColor="#4E8291"
        primaryOpacity="0.3"
        secondaryOpacity="0.3"
        className="pc-loader"
      >
        <rect x="12" y="0" rx="0" ry="0" width="940" height="196" /> 
        <rect x="12" y="204" rx="0" ry="0" width="940" height="46" /> 

        <rect x="12" y="264" rx="0" ry="0" width="42" height="30" /> 
        <rect x="78" y="264" rx="0" ry="0" width="226" height="30" /> 
        <rect x="328" y="264" rx="0" ry="0" width="226" height="30" /> 
        <rect x="580" y="264" rx="0" ry="0" width="226" height="30" /> 
        <rect x="837" y="264" rx="0" ry="0" width="113" height="30" />

        <rect x="12" y="306" rx="0" ry="0" width="42" height="30" /> 
        <rect x="78" y="306" rx="0" ry="0" width="226" height="30" /> 
        <rect x="328" y="306" rx="0" ry="0" width="226" height="30" /> 
        <rect x="580" y="306" rx="0" ry="0" width="226" height="30" /> 
        <rect x="837" y="306" rx="0" ry="0" width="113" height="30" />

        <rect x="12" y="348" rx="0" ry="0" width="42" height="30" /> 
        <rect x="78" y="348" rx="0" ry="0" width="226" height="30" /> 
        <rect x="328" y="348" rx="0" ry="0" width="226" height="30" /> 
        <rect x="580" y="348" rx="0" ry="0" width="226" height="30" /> 
        <rect x="837" y="348" rx="0" ry="0" width="113" height="30" />

        <rect x="12" y="390" rx="0" ry="0" width="42" height="30" /> 
        <rect x="78" y="390" rx="0" ry="0" width="226" height="30" /> 
        <rect x="328" y="390" rx="0" ry="0" width="226" height="30" /> 
        <rect x="580" y="390" rx="0" ry="0" width="226" height="30" /> 
        <rect x="837" y="390" rx="0" ry="0" width="113" height="30" />

        <rect x="12" y="432" rx="0" ry="0" width="42" height="30" /> 
        <rect x="78" y="432" rx="0" ry="0" width="226" height="30" /> 
        <rect x="328" y="432" rx="0" ry="0" width="226" height="30" /> 
        <rect x="580" y="432" rx="0" ry="0" width="226" height="30" /> 
        <rect x="837" y="432" rx="0" ry="0" width="113" height="30" />

        <rect x="12" y="474" rx="0" ry="0" width="42" height="30" /> 
        <rect x="78" y="474" rx="0" ry="0" width="226" height="30" /> 
        <rect x="328" y="474" rx="0" ry="0" width="226" height="30" /> 
        <rect x="580" y="474" rx="0" ry="0" width="226" height="30" /> 
        <rect x="837" y="474" rx="0" ry="0" width="113" height="30" />
      </ContentLoader>
    )
  }
}

export default Album
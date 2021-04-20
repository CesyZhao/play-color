import React, {Component} from 'react'
import LazyImage from '../LazyImage/LazyImage'
import './Album.less'
import Playlist from '../PlayList/PlayList'
import {formatList} from '../../util/audio'
import AlbumLoader from '../Loaders/AlbumLoader'
import api from '../../config/api'
import eventBus from '../../events'
import { connect } from 'react-redux'
import _ from 'lodash'

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
  },
  {
    name: 'operation',
    alias: 'operation',
    title: '操作',
    flex: 1
  }
]
@connect(({user}) => ({ user }))
class Album extends Component {
  state = {
    album: null
  }

  async componentDidMount() {
    try {
      const { data } = await api.song.getPlayList({ id: this.props.match.params.id })
      let { playlist } = data
      const { data: songArray } = await api.song.getSongDetail({ids: playlist.trackIds.map(item => item.id).join(',')})
      let songs = formatList(songArray.songs)
      playlist.tracks = songs
      this.setState({ album: playlist })
    } catch (error) {
      console.log(error)
    }
    eventBus.on('add-like-song', this.addLikeSong)
  }

  addLikeSong = (song, status) => {
    const { user } = this.props
    const { album } = this.state
    if (album.creator.userId === user.profile.userId) {
      if (status) {
        album.tracks.unshift(song)
      } else {
        _.remove(album.tracks, (s) => {
          return s.id === song.id
        })
      }
      this.setState({ album: { ...album } })
    }
  }

  render() {
    const { album } = this.state
    return (
      album ?
      <div className="pc-album">
        <div className="pc-album-info">
          <div className="pc-album-cover">
            <LazyImage imgUrl={album.coverImgUrl}></LazyImage>
          </div>
          <div className="pc-album-detail">
            <div className="pc-album-text"> {album.name} </div>
            <div className="pc-album-creator">
              <span className="pc-album-creator-avatar">
                <LazyImage imgUrl={album.creator.avatarUrl}></LazyImage>
              </span>
              <span className="pc-album-creator-nickname">{album.creator.nickname}</span>
            </div>
            <div className="pc-album-tags">
               {
                  album.tags.length > 0 &&
                  <div> {album.tags.join('/')} </div>
               }
              <div> 播放量: {album.playCount / 10000 ? (album.playCount / 10000).toFixed(2) : album.playCount / 10000} 万</div>
              <div> {album.tracks.length} 首</div>
            </div>
          </div>
          <div className="pc-album-counts">
            <div className="pc-album-play-all"> <i className="iconfont icon-iosplay"></i> </div>
              <div className="pc-album-track"> <i className={`iconfont ${album.subscribed ? 'icon-shoucang' : 'icon-shoucang1'}`}></i> </div>
          </div>
        </div>
        <Playlist album={album} className="pc-album-list" fields={fields}></Playlist>
      </div>
      :
     <AlbumLoader></AlbumLoader>
    )
  }
}

export default Album
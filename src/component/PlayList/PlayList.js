import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDuration } from '../../util/audio'
import './PlayList.less'
import {connect} from 'react-redux'
import { updatePlayingSong, updatePlayingAlbum } from '../../store/action/controller'
import _ from 'lodash'
import eventBus from '../../events'

@connect(({controller, user}) => ({
  controller, user
}))
class PlayList extends Component {
  static propTypes = {
    album: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    fixedHeight: PropTypes.bool
  }

  getContent = (song, name, alias) => {
    const dealerMap = {
      duration: () => formatDuration(song[name]),
      artists: () => song[name].map(at => at.name).join('/'),
      album: () => song[name].name
    }
    return dealerMap[alias] ? dealerMap[alias]() : song[name]
  }

  handleSongClick = (song) => {
    const { user, album } = this.props
    const { id, name, userId } = album
    const { profile = {} } = user
    const { nickname, userId: uid } = profile
    this.props.dispatch(updatePlayingSong({ ...song, fromId: id, from: name}))
    console.log(userId === uid)
    if (userId === uid && nickname + '喜欢的音乐' === album.name) {
      eventBus.emit('changeMode', 'heartbeat')
    }
    this.props.dispatch(updatePlayingAlbum(this.props.album))
  }

  likeSong = (e, song, status) => {
    e.stopPropagation()
    eventBus.emit('likeSong', song, status)
  }

  render() {
    let { favorites } = this.props.user
    const { fixedHeight = true } = this.props
    _.isEmpty(favorites) && (favorites = new Map())
    return (
      <div className={`pc-playlist-wrapper ${fixedHeight ? 'fixedHeight' : ''}`}>
        <div className="pc-playlist-song pc-playlist-header">
            <div style={{width: '36px', textAlign: 'center'}}> # </div>
            {
              this.props.fields.map(field => {
                return <div style={{ flex: field.flex }} key={field.title}>{field.title}</div>
              })
            }
        </div>
        <div className="pc-playlist-songs">
          {
            this.props.album.tracks.map((song, index) => {
              return <div className="pc-playlist-song" onDoubleClick={() => this.handleSongClick(song)} key={song.id}>
                <div style={{width: '36px', textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
                  {
                    this.props.controller.song.id === song.id
                    ?
                    <div className="pc-playing-indicator">
                      <div className="pc-playing-indicator-item"></div>
                      <div className="pc-playing-indicator-item"></div>
                      <div className="pc-playing-indicator-item"></div>
                      <div className="pc-playing-indicator-item"></div>
                    </div>
                    : index + 1
                  }
                </div>
                {
                  this.props.fields.map(field => {
                    return field.name === 'operation'
                    ? <div style={{ flex: field.flex }} key={field.name}>
                         <i className={`iconfont ${favorites.get(song.id) ? 'icon-iosheart' : 'icon-iosheartoutline'}`} onClick={(e) => this.likeSong(e, song, !favorites.get(song.id))}></i>
                      </div>
                    : <div style={{ flex: field.flex }} key={field.name}> {this.getContent(song, field.name, field.alias)} </div>
                  })
                }
              </div>
            })
          }
        </div>
      </div>
    )
  }
}
export default PlayList
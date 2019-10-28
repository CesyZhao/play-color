import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDuration } from '../../util/audio'
import './PlayList.less'
import {UPDATE_PLAYING_SONG, UPDATE_PLAYING_ALBUM} from '../../store/action/actions'
import {connect} from 'react-redux'

@connect(({controller}) => ({
  controller
}))
class PlayList extends Component {
  static propTypes = {
    album: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired
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
    const { id, name } =  this.props.album
    this.props.dispatch({
      type: UPDATE_PLAYING_SONG,
      song: { ...song, fromId: id, from: name}
    })
    this.props.dispatch({
      type: UPDATE_PLAYING_ALBUM,
      playingAlbum: this.props.album
    })
  }

  render () {
    return (
      <div className="pc-playlist-wrapper">
        <div className="pc-playlist-song pc-playlist-header">
            <div style={{width: '36px', textAlign: 'center'}}> # </div>
            {
              this.props.fields.map(field => {
                return <div style={{ flex: field.flex }}>
                  { field.title }
                </div>
              })
            }
        </div>
        <div className="pc-playlist-songs">
          {
            this.props.album.tracks.map((song, index) => {
              return <div className="pc-playlist-song" onClick={() => this.handleSongClick(song)}>
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
                    return <div style={{ flex: field.flex }}> { this.getContent(song, field.name, field.alias)} </div>
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
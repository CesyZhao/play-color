import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDuration } from '../../util/audio'

class PlayList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  }
  render () {
    return (
      <div className="pc-playlist-wrapper">
      {
        this.props.list.map((song, index) => {
          return <div className="pc-playlist-song">
            <div>{ index + 1 }</div>
            <div>{ song.name }</div>
            <div>{ song.artists.map(artist => artist.name).join('/') }</div>
            <div>{ formatDuration(song.duration) }</div>
          </div>
        })
      }
      </div>
    )
  }
}
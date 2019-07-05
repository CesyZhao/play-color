import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDuration } from '../../util/audio'
import './PlayList.less'

class PlayList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired
  }

  getContent = (song, name, alias) => {
    const dealerMap = {
      duration: () => formatDuration(song[name]),
      artists: () => song[name].map(at => at.name).join('/')
    }
    return dealerMap[alias] ? dealerMap[alias]() : song[name]
  }

  render () {
    return (
      <div className="pc-playlist-wrapper">
        <div className="pc-playlist-song pc-playlist-header">
            <div style={{width: '40px'}}> # </div>
            {
              this.props.fields.map(field => {
                return <div style={{ flex: field.flex }}>
                  { field.title }
                </div>
              })
            }
          </div>
        {
          this.props.list.map((song, index) => {
            return <div className="pc-playlist-song">
              <div style={{width: '40px'}}>{ index + 1 }</div>
              {
                this.props.fields.map(field => {
                  return <div style={{ flex: field.flex }}> { this.getContent(song, field.name, field.alias)} </div>
                })
              }
            </div>
          })
        }
      </div>
    )
  }
}
export default PlayList
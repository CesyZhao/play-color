import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDuration } from '../../util/audio'
import './PlayList.less'

class PlayList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired
  }
  render () {
    return (
      <div className="pc-playlist-wrapper">
        <div className="pc-playlist-song">
            <div> # </div>
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
              <div>{ index + 1 }</div>
              {
                this.props.fields.map(field => {
                  return <div style={{ flex: field.flex }}>
                    { 
                      field.alias && field.alias === 'duration'
                      ? formatDuration(song[field.name])
                      : song[field.name]
                    }
                  </div>
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
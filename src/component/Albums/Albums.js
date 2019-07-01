import React, {Component} from 'react'
import './Albums.less'

class Albums extends Component {
  render () {
    return (
      <div className="pc-albums">
        <div className="pc-albums-tool-bar">
          <div className="pc-albums-categories"></div>
          <div className="pc-albums-layout"></div>
        </div>
      </div>
    )
  }
}

export default Albums
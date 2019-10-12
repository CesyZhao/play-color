import React, { Component } from 'react'

class Artist extends Component {

  state = {
    artistInfo: {},
    artistTop50: [],
    artistMvs: [],
    artistAlbums: []
  }

  componentWillMount () {

  }

  getArtistInfo () {
    
  }

  render () {
    return (
      <div className="pc-artist">
        {
          this.props.match.params.id
        }
      </div>
    )
  }
}

export default Artist
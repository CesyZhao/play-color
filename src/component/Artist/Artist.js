import React, { Component } from 'react'

class Artist extends Component {
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
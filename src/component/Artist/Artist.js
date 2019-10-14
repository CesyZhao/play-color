import React, { Component } from 'react'
import './Artist.less'
import http from '../../config/http'

const categories = ['song', 'mv', 'album', 'desc']
class Artist extends Component {

  state = {
    desc: '',
    song: [],
    mv: [],
    album: []
  }

  componentWillMount () {
  
  }

  getResultByType = (type) => {
    const { id } = this.props.match.params
    try {
      http.get(`/artist/${type}?id=${id}`)
      .then(({data}) => {
        console.log(data)
      })
    } catch (error) {
      console.log(error)
    }
  }


  render () {
    return (
      <div className="pc-artist">
        <div className="pc-artist-info">

        </div>

      </div>
    )
  }
}

export default Artist
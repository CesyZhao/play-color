import React, { Component } from 'react'
import './Artist.less'
import http from '../../config/http'

const categories = [
  {
    type: 'song',
    url: '/artists',
    dataset: 'hotSongs'
  },
  {
    type: 'mv',
    url: '/artist/mv',
    dataset: 'mvs'
  },
  {
    type: 'album',
    url: '/artist/album',
    dataset: 'hotAlbums'
  },
  {
    type: 'desc',
    url: '/artist/desc',
    dataset: 'briefDesc'
  },
]
class Artist extends Component {

  state = {
    desc: '',
    song: [],
    mv: [],
    album: []
  }

  async componentWillMount () {
    let [songRes, mvRes, albumRes, desRes] = await this.getResultByType()
    this.setState({
      hotSongs: songRes.data ? songRes.data.hotSongs : [],
      mvs: mvRes.data ? mvRes.data.mvs : [],
      hotAlbums:  albumRes.data ? albumRes.data.hotAlbums : [],
      briefDesc: desRes.data ? desRes.data.briefDesc : ''
    })
  }

  getResultByType = () => {
    const { id } = this.props.match.params
    return Promise.all(categories.map(category => {
      return http.get(`${category.url}?id=${id}`)
    }))
  }


  render () {
    return (
      <div className="pc-artist">
        <div className="pc-artist-info">
          {
            this.state.briefDesc
          }
        </div>

      </div>
    )
  }
}

export default Artist
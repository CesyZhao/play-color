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
    hotSongs: [],
    mvs: [],
    hotAlbums: [],
    artist: {}
  }

  async componentWillMount () {
    let [songRes, mvRes, albumRes, desRes] = await this.getResultByType()
    this.setState({
      hotSongs: songRes.data ? songRes.data.hotSongs : [],
      mvs: mvRes.data ? mvRes.data.mvs : [],
      hotAlbums:  albumRes.data ? albumRes.data.hotAlbums : [],
      artist: {
        info: songRes.data ? songRes.data.artist : '',
        desc: desRes.data ? desRes.data.briefDesc : ''
      }
    })
  }

  getResultByType = () => {
    const { id } = this.props.match.params
    return Promise.all(categories.map(category => {
      return http.get(`${category.url}?id=${id}`)
    }))
  }


  render () {
    const { info } = this.state.artist
    console.log(this.state)
    return (
      <div className="pc-artist">
        {
          info && 
          <div className="pc-artist-info-wrapper">
            <img src={ info.img1v1Url } alt="歌手照片"></img>
            <div className="pc-artist-info">
              <h2> { info.name } </h2>
              <div className="pa-artist-sub-info">
                <span>中文名: { info.transNames } </span>
                <span>单曲数: { info.musicSize }</span>
                <span>专辑数: { info.albumSize } </span>
                <span>MV 数: { info.mvSize } </span>
              </div>
              <p className="pa-artist-desc">
                { info.briefDesc }
              </p>
            </div>

          </div>
        }
      </div>
    )
  }
}

export default Artist
import React, { Component, Fragment } from 'react'
import './Artist.less'
import http from '../../config/http'
import Pagination from '../Pagination/Pagination'
import PlayList from '../PlayList/PlayList'
import { formatList } from '../../util/audio'

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
const fields = [
  {
    name: 'name',
    title: '歌名',
    flex: 2
  },
  {
    name: 'artists',
    alias: 'artists',
    title: '歌手',
    flex: 2
  },
  {
    name: 'album',
    alias: 'album',
    title: '专辑',
    flex: 2
  },
  {
    name: 'duration',
    alias: 'duration',
    title: '时长',
    flex: 1
  }
]
class Artist extends Component {

  state = {
    hotSongs: [],
    mvs: [],
    hotAlbums: [],
    artist: {},
    currentSongPage: 0,
    currentAlbumPage: 0,
    currentMvPage: 0
  }

  async componentWillMount () {
    let [songRes, mvRes, albumRes, desRes] = await this.getResultByType()
    this.setState({
      hotSongs: songRes.data ? formatList(songRes.data.hotSongs) : [],
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
    const { hotSongs, currentSongPage, currentAlbumPage, currentMvPage, hotAlbums } = this.state
    const songPageSize = 10
    const albumPageSize = 5
    return (
      <div className="pc-artist">
        {
          info && 
          <div className="pc-artist-info-wrapper">
            <img src={ info.img1v1Url } alt="歌手照片"></img>
            <div className="pc-artist-info">
              <h2> { info.name } </h2>
              <div className="pc-artist-sub-info">
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
        <div className="pc-artist-content">
        {
          hotSongs.length &&
          <Fragment>
            <div className="pc-artist-hot-songs-header">
              <span>热门歌曲</span>
              <Pagination pageSize={ songPageSize } jumpable={ false } total={hotSongs.length} onPageChange={ (page) => this.setState({currentSongPage: page - 1}) }></Pagination>
            </div>
            <PlayList fields={ fields } album={ { tracks: hotSongs.slice(currentSongPage * songPageSize, (currentSongPage + 1) * songPageSize ) } } className></PlayList>
          </Fragment>
        }
        {
          hotAlbums &&
          <Fragment>
            <div className="pc-artist-hot-songs-header">
              <span>专辑</span>
              <Pagination pageSize={ albumPageSize } jumpable={ false } total={hotAlbums.length} onPageChange={ (page) => this.setState({currentAlbumPage: page - 1}) }></Pagination>
            </div>
          </Fragment>
        }
        </div>
      </div>
    )
  }
}

export default Artist
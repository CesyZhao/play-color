import React, { Component, Fragment } from 'react'
import './Artist.less'
import Pagination from '../Pagination/Pagination'
import PlayList from '../PlayList/PlayList'
import { formatList } from '../../util/audio'
import LazyImage from '../LazyImage/LazyImage'
import api from '../../config/api'

const categories = [
  {
    type: 'song',
    method: api.artist.getArtistSong,
    dataset: 'hotSongs'
  },
  {
    type: 'mv',
    method: api.artist.getArtistMv,
    dataset: 'mvs'
  },
  {
    type: 'album',
    method: api.artist.getArtistAlbum,
    dataset: 'hotAlbums'
  },
  {
    type: 'desc',
    method: api.artist.getArtistDescription,
    dataset: 'briefDesc'
  }
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

  async componentWillMount() {
    let [songRes, mvRes, albumRes, desRes] = await this.getResultByType()
    this.setState({
      hotSongs: songRes.data ? formatList(songRes.data.hotSongs) : [],
      mvs: mvRes.data ? mvRes.data.mvs : [],
      hotAlbums: albumRes.data ? albumRes.data.hotAlbums : [],
      artist: {
        info: songRes.data ? songRes.data.artist : '',
        desc: desRes.data ? desRes.data.briefDesc : ''
      }
    })
  }

  getResultByType = () => {
    const { id } = this.props.match.params
    return Promise.all(categories.map(category => {
      return category.method({ id })
    }))
  }


  render() {
    const { info } = this.state.artist
    const { hotSongs, currentSongPage, currentAlbumPage, currentMvPage, hotAlbums, mvs } = this.state
    const songPageSize = 10
    const albumPageSize = 5
    const mvPageSize = 4
    return (
      <div className="pc-artist">
        {
          info &&
          <div className="pc-artist-info-wrapper">
            <img alt="歌手照片" src={info.img1v1Url}></img>
            <div className="pc-artist-info">
              <h2> {info.name} </h2>
              <div className="pc-artist-sub-info">
                <span>中文名: {info.transNames} </span>
                <span>单曲数: {info.musicSize}</span>
                <span>专辑数: {info.albumSize} </span>
                <span>MV 数: {info.mvSize} </span>
              </div>
              <p className="pa-artist-desc">
                {info.briefDesc}
              </p>
            </div>
          </div>
        }
        <div className="pc-artist-content">
          <Fragment>
            <div className="pc-artist-hot-songs-header">
              <span>热门歌曲</span>
              <Pagination jumpable={false} onPageChange={(page) => this.setState({currentSongPage: page - 1})} pageSize={songPageSize} total={hotSongs.length}></Pagination>
            </div>
            <PlayList album={{ tracks: hotSongs.slice(currentSongPage * songPageSize, (currentSongPage + 1) * songPageSize ) }} fields={fields} ></PlayList>
          </Fragment>
          <Fragment>
            <div className="pc-artist-hot-songs-header">
              <span>专辑</span>
              <Pagination jumpable={false} onPageChange={(page) => this.setState({currentAlbumPage: page - 1})} pageSize={albumPageSize} total={hotAlbums.length}></Pagination>
            </div>
            <div className="pc-artist-albums-wrapper">
            {
              hotAlbums.slice(currentAlbumPage * albumPageSize, (currentAlbumPage + 1) * albumPageSize ).map(album => {
                return (
                  <div className="pc-artist-album" data-name={album.name} key={album.id}>
                    <LazyImage imgUrl={album.picUrl}></LazyImage>
                  </div>
                )
              })
            }
            </div>
          </Fragment>
          <Fragment>
            <div className="pc-artist-hot-songs-header">
              <span>MV</span>
              <Pagination jumpable={false} onPageChange={(page) => this.setState({currentMvPage: page - 1})} pageSize={mvPageSize} total={mvs.length} ></Pagination>
            </div>
            <div className="pc-artist-mv-wrapper">
            {
              mvs.slice(currentMvPage * mvPageSize, (currentMvPage + 1) * mvPageSize ).map(mv => {
                return (
                  <div className="pc-artist-mv" data-name={mv.name} key={mv.id}>
                    <LazyImage imgUrl={mv.imgurl16v9}></LazyImage>
                  </div>
                )
              })
            }
             </div>
          </Fragment>
        </div>
      </div>
    )
  }
}

export default Artist
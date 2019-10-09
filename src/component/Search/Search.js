import React, { Component } from 'react'
import './Search.less'
import _ from 'lodash'
import http from '../../config/http'
import EventBus from '../../events'
import Pagination from '../Pagination/Pagination'
import logo from '../../asset/daydream.png'

const typeMap = {
  songs: { type: 1, title: '单曲' },
  artists: { type: 100, title: '歌手' },
  playlists: { type: 1000, title: '歌单' },
  userprofiles: { type: 1002, title: '用户' }
}
class Search extends Component {
  state = {
    songs: [],
    songsTotal: 0,
    playlists: [],
    playlistsTotal: 0,
    artists: [],
    artistsTotal: 0,
    userprofiles: [],
    userprofilesTotal: 0,
    showSearch: false
  }

  componentDidMount () {
    EventBus.on('toggleSearch', (status) => {
      this.setState({
        showSearch: status
      }, () => {
        if (status) {
          const hideSearch = (e) => {
            if (e.key === 'esc' || e.key === 'Escape') {
              this.setState({
                showSearch: false
              })
              document.removeEventListener('keydown', hideSearch)
            }
          }
          document.addEventListener('keydown', hideSearch)
        }
      })
    })
  }

  handleSearch = _.debounce(async (e) => {
    const keyword = this.refs.searchInput.value.trim()
    if (!keyword) {
      this.setState({
        songs: [],
        playlists: [],
        artists: [],
        userprofiles: []
      })
      return
    }
    for (const key in typeMap) {
      this.doSearch(keyword, typeMap[key].type, key)
    }
  }, 500)

  handlePageChange = (page, key) => {
    this.doSearch(this.refs.searchInput.value, typeMap[key].type, key,  page - 1)
  }

  doSearch = async (keyword, type = 1, key, page = 0) => {
    try {
      const { data } = await http.get(`/search?keywords=${keyword}&type=${type}&limit=5&offset=${page}`)
      this.setState({
        [key]: data.result[key],
        [`${key}Total`]: data.result[`${key.substring(0, key.length - 1)}Count`],
      })
    } catch (error) {
      console.log(error)
      console.log(`fail to search ${key} `)
    }
  }

  renderItemByType = (type) => {
    const coverUrlMap = {
      artists: 'img1v1Url',
      playlists: 'coverImgUrl',
      userprofiles: 'avatarUrl'
    }
    const extraInfoMap = {
      songs: (item) => item.artists.map(artist => artist.name).join('/'),
      playlists: (item) => item.creator.nickname
    }
    return this.state[type].map(item => {
      return (
        <div className="pc-search-results-item" key={ item.id || item.userId }>
          <img src={ type === 'songs' ? logo : item[coverUrlMap[type]]} alt="" className="pc-search-songs-cover"></img>
          <span className="pc-search-item-name"> { item.name || item.nickname } </span>
          <span className="pc-search-item-extra"> { extraInfoMap[type] && extraInfoMap[type](item) } </span>
        </div>
      )
    })
  }

  render () {
    const { songs, playlists, artists, userprofiles, showSearch } = this.state
    return (
      showSearch &&
      <div className="pc-search">
        <div className="pc-search-input-wrapper">
          <input className="pc-search-input" placeholder="输入搜索关键字" onInput={ this.handleSearch } ref="searchInput"></input>
          <i className="iconfont icon-sousuo1"></i>
        </div>
        <div className={ `pc-search-results-wrapper
         ${ (songs.length || playlists.length || artists.length || userprofiles.length) ? 'hasResult' : '' }` }>
          <div className="pc-search-results">
            {
              Object.keys(typeMap).map(type => {
                return (
                  <div className="pc-search-results-category" key={ type }>
                    <div className="pc-search-results-category-title">
                      <span>{ typeMap[type].title }</span>
                      <Pagination total={ this.state[`${type}Total`] } onPageChange={ page => this.handlePageChange(page, type) }/>
                    </div>
                    <div>
                      {
                        this.renderItemByType(type)
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    ) 
  }
}

export default Search
import React, { Component } from 'react'
import './Search.less'
import _ from 'lodash'
import http from '../../config/http'
import EventBus from '../../events'

const typeMap = {
  '1': 'songs',
  '100': 'artists',
  '1000': 'playlists',
  '1002': 'userprofiles'
}
const nameMap = {
  songs: '单曲',
  artists: '歌手',
  playlists: '歌单',
  userprofiles: '用户'
}
class Search extends Component {
  state = {
    songs: [],
    playlists: [],
    artists: [],
    userprofiles: [],
    showSearch: false
  }

  componentDidMount () {
    EventBus.on('toggleSearch', (status) => {
      this.setState({
        showSearch: status
      }, () => {
        if (status) {
          const hideSearch = (e) => {
            const searhEl = document.querySelector('.pc-search')
            if (!searhEl.contains(e.target) || e.key === 'esc') {
              this.setState({
                showSearch: false
              })
              document.removeEventListener('click', hideSearch)
              document.removeEventListener('keydown', hideSearch)
            }
          }
          document.addEventListener('click', hideSearch)
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
    for (const type in typeMap) {
      this.doSearch(keyword, type)
    }
  }, 500)

  doSearch = async (keyword, type = 1, page = 0) => {
    const searchType = typeMap[type]
    try {
      const { data } = await http.get(`/search?keywords=${keyword}&type=${type}&limit=5&offset=${page}`)
      this.setState({
        [searchType]: data.result[searchType]
      })
    } catch (error) {
      console.log(`fail to search ${searchType} `)
    }
  }

  renderItemByType = (type) => {
    const coverUrlMap = {
      songs: 'album.img1v1Url',
      artists: 'picUrl',
      playlists: 'coverImgUrl',
      userprofiles: 'avatarUrl'
    }
    const extraInfoMap = {
      songs: (item) => item.artists.map(artist => artist.name).join('/'),
      playlists: (item) => item.creator.nickname
    }
    return this.state[type].map(item => {
      return (
        <div className="pc-search-results-item" key={ item.id }>
          <img src={ item[coverUrlMap[type]]} alt="" className="pc-search-songs-cover"></img>
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
              Object.values(typeMap).map(type => {
                return (
                  <div className="pc-search-results-category">
                    <div className="pc-search-results-category-title">
                      { nameMap[type] }
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
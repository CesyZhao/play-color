import React, { Component } from 'react'
import './Search.less'
import _ from 'lodash'
import http from '../../config/http'

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
    userprofiles: []
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
      const { data } = await http.get(`/search?keywords=${keyword}&type=${type}&offset=${page}`)
      this.setState({
        [searchType]: data.result[searchType]
      })
    } catch (error) {
      console.log(`fail to search ${searchType} `)
    }
  }

  render () {
    const { songs, playlists, artists, userprofiles } = this.state
    console.log(Object.values(typeMap))
    return (
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
                  <div className="pc-search-result-category">
                    <div className="pc-search-result-category-title">
                      { nameMap[type] }
                    </div>
                    <div>
                      {
                        this.state[type].map(rs => {
                          return (
                            <span> { rs.name } </span>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="pc-search-result"></div>
        </div>
      </div>
    ) 
  }
}

export default Search
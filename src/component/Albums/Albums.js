import React, {Component} from 'react'
import './Albums.less'
import api from '../../config/api'
import toaster from '../../util/toast'
import {Link} from 'react-router-dom'
import LazyImage from '../LazyImage/LazyImage'
// import _ from 'lodash'

class Albums extends Component {

  state = {
    catList: [],
    lists: [],
    category: '',
    currentPage: 0,
    currentCategory: '全部'
  }

  async componentWillMount() {
    try {
      const { data } = await api.song.getPlayListCategories()
      this.setState({ catList: data.tags })
      this.getPlaylistByCategory()
    } catch (error) {
      toaster.error('获取歌单分类失败')
    }
  }

  getPlaylistByCategory = async () => {
    const {lists, currentCategory} = this.state
    const before = lists.length ? lists.pop().updateTime : undefined
    try {
      const { data } = await api.song.getPlayLists({ before, category: currentCategory })
      this.setState({
        lists: data.playlists
      })
    } catch (e) {
      toaster.error('获取歌单失败')
    }
  }

  handleCategoryClick = (category) => {
    this.setState({
      currentCategory: category
    }, () => this.getPlaylistByCategory(this.state.currentCategory))
  }

  render() {
    const { currentCategory, catList, lists } = this.state
    return (
      <div className="pc-albums">
        <div className="pc-albums-categories">
          <span className={`pc-albums-hot-category ${currentCategory === '全部' && 'active'}`} onClick={() => this.handleCategoryClick('全部')}>
            全部
          </span>
          {
            catList.map(tag => {
              return (
                <span className={`pc-albums-hot-category ${currentCategory === tag.name && 'active'}`} key={tag.id} onClick={() => this.handleCategoryClick(tag.name)}>
                  {tag.name}
                </span>
              )
            })
          }
        </div>
        <div className="pc-albums-lists">
          {
            lists.map(list => {
              return (
                <Link key={list.id} to={{pathname: `/album/${list.id}`}}>
                  <div className="pc-albums-album" data-name={list.name}>
                    <LazyImage imgUrl={list.coverImgUrl} />
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Albums
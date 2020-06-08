import React, {Component} from 'react'
import './Albums.less'
import api from '../../config/api'
import toaster from '../../util/toast'
// import _ from 'lodash'

class Albums extends Component {

  state = {
    catList: [],
    list: [],
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
    const {list, currentCategory} = this.state
    const before = list.length ? list.pop().updateTime : undefined
    try {
      const { data } = await api.song.getPlayLists({ before, category: currentCategory })
      this.setState({
        list: data.playlists
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
    const { currentCategory } = this.state
    return (
      <div className="pc-albums">
        <div className="pc-albums-categories">
          <span className={`pc-albums-hot-category ${currentCategory === '全部' && 'active'}`} onClick={() => this.handleCategoryClick('全部')}>
            全部
          </span>
          {
            this.state.catList.map(tag => {
              return <span className={`pc-albums-hot-category ${currentCategory === tag.name && 'active'}`} key={tag.id} onClick={() => this.handleCategoryClick(tag.name)}>
                {tag.name}
              </span>
            })
          }
        </div>
      </div>
    )
  }
}

export default Albums
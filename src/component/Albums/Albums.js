import React, {Component} from 'react'
import './Albums.less'
import http from '../../config/http'
// import _ from 'lodash'

class Albums extends Component {

  state = {
    catList: [],
    hotList: [],
    category: '',
    currentPage: 0,
    currentCategory: '全部'
  }

  async componentWillMount() {
    try {
      const { data: hotList } = await http.get('/playlist/hot')
      this.setState({ hotList: hotList.tags })
    } catch (error) {
      console.log(error)
    }
  }

  getPlaylistByCategory = (cate) => {
    console.log(cate)
  }

  handleCategoryClick = (category) => {
    console.log(category)
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
            this.state.hotList.map(tag => {
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
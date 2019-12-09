import React, {Component} from 'react'
import './Albums.less'
import http from '../../config/http'
import _ from 'lodash'

class Albums extends Component {

  state = {
    catList: [],
    hotList: []
  }

  async componentWillMount() {
    try {
      const { data: catList } = await http.get('/playlist/catlist')
      const { data: hotList } = await http.get('/playlist/hot')
      console.log(hotList)
      this.setState({ catList: _.groupBy(catList.sub, cat => cat.category), hotList: hotList.tags })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="pc-albums">
        <div className="pc-albums-tool-bar">
          <div className="pc-albums-categories">
            <span></span>
            {
              this.state.hotList.map(tag => {
                return <span className="pc-albums-hot-category" key={tag.id}>
                  {tag.name}
                </span>
              })
            }
          </div>
          <div className="pc-albums-layout"></div>
        </div>
      </div>
    )
  }
}

export default Albums
import React, {Component} from 'react'
import './Albums.less'
import http from '../../config/http'
// import _ from 'lodash'

class Albums extends Component {

  state = {
    catList: [],
    hotList: []
  }

  async componentWillMount() {
    try {
      const { data: hotList } = await http.get('/playlist/hot')
      this.setState({ hotList: hotList.tags })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="pc-albums">
        <div className="pc-albums-categories">
          {
            this.state.hotList.map(tag => {
              return <span className="pc-albums-hot-category" key={tag.id}>
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
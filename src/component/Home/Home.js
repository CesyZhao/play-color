import React, {Component} from 'react'
import './Home.less'
import http from '../../config/http'
import LazyImage  from '../LazyImage/LazyImage'

class Home extends Component {

  state = {
    albumList: []
  }

  async componentWillMount () {
    let res = await http.get('/personalized')
    console.log(res)
    this.setState({albumList: res.data.result})
  }

  render() {
    return (
      <div className="pc-home">
        {
          this.state.albumList.map(album => {
            return (
              <div className='pc-personalized-album' key={album.id}>

              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Home

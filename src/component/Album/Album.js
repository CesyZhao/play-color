import React, {Component} from 'react'
import http from '../../config/http'
import LazyImage from '../LazyImage/LazyImage'
import './Album.less'

class Album extends Component {
  state = {
    album: null
  }

  async componentDidMount () {
    try {
      const { data } = await http.get(`/playlist/detail?id=${this.props.match.params.id}`)
      console.log(data.playlist)
      this.setState({ album: data.playlist })
    } catch (error) {
      console.log(error)
    }
  }
  
  render() {
    const album = this.state.album
    console.log(album, '---------')
    return (
      album &&
      <div>
        <div className='pc-album-info'>
          <LazyImage imgUrl={ this.state.album.coverImgUrl  }></LazyImage>
        </div>
      </div>
    )
  }
}

export default Album
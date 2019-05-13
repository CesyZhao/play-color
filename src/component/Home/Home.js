import React, {Component} from 'react'
import './Home.less'
import http from '../../config/http'
import {toast} from 'react-toastify'

class Home extends Component {

  state = {
    albumList : []
  }

  async componentWillMount () {
    let albumList = await http.get('/personalized')
    console.log(albumList)
  }

  render() {
    return (
      <div className="pc-home">

      </div>
    )
  }
}

export default Home

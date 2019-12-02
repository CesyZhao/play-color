import React, { Component } from 'react'
import http from '../../config/http'
import './Moments.less'

class Moments extends Component {

  state = {
    moments: []
  }

  componentDidMount () {
    this.getMoments()
  }

  getMoments = () => {
    http.get('/event')
    .then(({ data }) => {
      console.log(data)
    })
  }

  render () {
    return (
      <div className="pc-moments">

      </div>
    )
  }
}

export default Moments
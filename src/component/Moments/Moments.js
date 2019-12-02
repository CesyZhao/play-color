import React, { Component } from 'react'
import http from '../../config/http'
import './Moments.less'

class Moments extends Component {

  state = {
    moments: [],
    lastTime: -1
  }

  componentDidMount () {
    this.getMoments()
  }

  getMoments = () => {
    http.get('/event')
    .then(({ data }) => {
      this.setState({
        moments: data.event,
        lastTime: data.lasttime
      })
    })
  }

  render () {
    return (
      <div className="pc-moments">
        <ul className="pc-moments-list">
          {
            this.moments.map(moment =>{
              return (
                <li className="pc-moments-item">
                  
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default Moments
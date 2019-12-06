import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
      console.log(data)
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
            this.state.moments.map(moment =>{
              return (
                <li className="pc-moments-item">
                  <img className="avatar" src={ moment.user.avatarUrl }></img>
                  <div className="pc-moments-item-content">
                    <Link to={ `/user/${moment.user.userId}` }>{ moment.user.nickname }</Link>
                    <div className="pc-moment-time">{ new Date(moment.eventTime).toLocaleString() }</div>
                    <div className="pc-moment-message">{ JSON.parse(moment.json).msg }</div>
                    <div>
                      {
                         moment.pics.map(pic => {
                          return <img src={ pic.pcSquareUrl } className="moment-image"></img> 
                        })
                      }
                    </div>
                    <div className='pc-moment-item-footer'>
                      <span>
                        <span>
                          <i className='iconfont icon-zan'></i>
                          { moment.info.likedCount }
                        </span>
                      </span>
                    </div>
                  </div>
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
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
                  <img src={ moment.user.avatarUrl }></img>
                  <div className="pc-moments-item-content">
                    <Link to={ `/user/${moment.user.userId}` }>{ moment.user.nickname }</Link>
                    <div>{ new Date(moment.eventTime).toLocaleString() }</div>
                    <div>{ JSON.parse(moment.json).msg }</div>
                    <div>
                      {
                         moment.pics.map(pic => {
                          return <img src={ pic.originUrl } className="moment-image"></img> 
                        })
                      }
                    </div>
                    {/* <div className='pc-comment-item-footer'>
                      <span> { new Date(moment.showTime).toLocaleString() } </span>
                      <span>
                        <span>
                          <i className='iconfont icon-zan'></i>
                          { moment.info.likedCount }
                        </span>
                      </span>
                    </div> */}
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
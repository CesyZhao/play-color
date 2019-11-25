import React, { Component } from  'react'
import './User.less'
import http from '../../config/http'
import _ from 'lodash'

class User extends Component {
  state = {
    user: {}
  }
  async componentWillMount () {
    const { id } = this.props.match.params
    const { data } = await http.get(`/user/detail?uid=${id}`)
    const { data: playlist } = await http.get(`/user/playlist?uid=${id}`)
    console.log(playlist, '-----------')
    this.setState({ user: data})
  }
  render () {
    const { user } = this.state
    console.log(user)
    return (
      !_.isEmpty(user)
      ?
      <div className='pc-user'>
        <div className='pc-user-profile'>
          <div className='pc-user-avatar'>
            <img src={ user.profile.avatarUrl }></img>
          </div>
          <div className='pc-user-info'>
            <span className='pc-user-nickname'> 
              { user.profile.nickname } 
              <sup>  </sup>
            </span>
            <span> 
              <span className='pc-user-level'>Lv.{ user.level } </span>
              <span className='pc-user-level'><i className={ `iconfont ${ user.profile.gender === 1 ? 'icon-nan male' : 'icon-nv female' }` }></i> </span>
            </span>
            <div className='pc-user-social-info'>
              <div>
                <div>动态</div>
                <div>{ user.profile.eventCount }</div>
              </div>
              <div>
                <div>关注</div>
                <div>{ user.profile.follows }</div>
              </div>
              <div>
                <div>粉丝</div>
                <div>{ user.profile.followeds }</div>
              </div>
            </div>
            <div className='pc-user-signature'>
              { user.profile.signature }
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
      :
      <div></div>
    )
  }
}

export default User

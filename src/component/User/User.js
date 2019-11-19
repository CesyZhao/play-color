import React, { Component } from  'react'
import './User.less'
import http from '../../config/http'
import _ from 'lodash'

class User extends Component {
  state = {
    user: {}
  }
  async componentWillMount () {
    const { data } = await http.get(`/user/detail?uid=${this.props.match.params.id}`)
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
              <sup> <i className={ `iconfont ${ user.profile.gender === 1 ? 'icon-nan' : 'icon-nv' }` }></i> </sup>
            </span>
            <span> 
              <span>Lv.{ user.level } </span>
            </span>
          </div>
        </div>
      </div>
      :
      <div></div>
    )
  }
}

export default User

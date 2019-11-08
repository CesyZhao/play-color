import React, { Component } from 'react'
import './Comment.less'
import http from '../../config/http'
import { connect } from 'react-redux'

@connect(({controller}) => ({
  controller
}))
class Comment extends Component {
  state = {
    comment: {}
  }
  async componentDidUpdate (prevProps, prevState) {
    if (this.props.controller.song.id !== prevProps.controller.song.id) {
      const comment = await this.getComments(this.props.controller.song)
      this.setState({
        comment
      })
    }
  }
  getComments = async (song) => {
    let comment = {}
    try {
      const { data } = await http.get(`/comment/music?id=${song.id}`)
      console.log(data, '---------')
      comment = data
    } catch (error) {
      comment.error = error
    }
    return comment
  }
  render () {
    return (
      <div className='pc-comment'>

      </div>
    )
  }
}
export default Comment

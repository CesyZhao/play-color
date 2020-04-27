import React, { Component } from 'react'
import './Comment.less'
import { connect } from 'react-redux'
import LazyImage from '../LazyImage/LazyImage'
import { Link } from 'react-router-dom'
import api from '../../config/api'
import emojiConverter from '../../util/emoji'
import toaster from '../../util/toast'

@connect(({controller}) => ({
  controller
}))
class Comment extends Component {
  state = {
    comment: {
      total: 0,
      hotComments: [],
      comments: []
    },
    currentPage: 0
  }
  async componentWillMount() {
    const comment = await this.getComments(this.props.controller.song)
    this.setState({
      comment
    })
  }
  async componentDidUpdate(prevProps) {
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
      const LIMIT = 20
      const { data } = await api.song.getComments({ id: song.id, offset: this.state.currentPage * LIMIT })
      comment = data
    } catch (error) {
      comment.error = error
    }
    return comment
  }
  likeComment = async (comment) => {
    const { id } = this.props.controller.song
    const cid = comment.commentId
    const t = Number(!comment.liked)
    const type = 0
    try {
      await api.song.likeComment({ id, cid, t, type })
      comment.liked = t
      comment.likedCount = comment.liked ? ++comment.likedCount : --comment.likedCount
      this.setState(state => {
        console.log(state.comment)
        return { comment: Object.assign({}, state.comment) }
      })
    } catch (error) {
      toaster.error('点赞失败')
    }
  }
  handleComment = async () => {
    const { id } = this.props.controller.song
    const content = this.refs.comment.value
    try {
      await api.song.handleComment({id, type: 1, content})
      toaster.success('评论成功')
      this.refs.comment.value = ''
      const comment = await this.getComments(this.props.controller.song)
      this.setState({
        comment
      })
    } catch (error) {
      toaster.error('评论失败')
    }
  }
  loadmore = () => {
    this.setState(state => {
      return { currentPage: ++state.currentPage }
    }, async () => {
      const { comments } = await this.getComments(this.props.controller.song)
      console.log(comments)
      this.setState(state => {
        return { comment: Object.assign(state.comment, { comments: state.comment.comments.concat(comments) }) }
      })
    })
  }
  render() {
    const { song } = this.props.controller
    const { comment } = this.state
    return (
      <div className="pc-comment">
        <div className="pc-song-info">
          <LazyImage imgUrl={song.album.picUrl}></LazyImage>
          <div className="pc-song-info-detail">
            <span className="pc-song-info-tag name"> {song.name} </span>
            <div>
              <span className="pc-song-info-tag">歌手: {song.artists.map(artist => artist.name).join('/')} </span>
              <span className="pc-song-info-tag">专辑: {song.album.name} </span>
            </div>
            <div className="pc-song-info-tag"> {song.name} </div>
          </div>
        </div>
        <div className="pc-comment-detail">
          <div className="pc-comment-writer">
            <div className="pc-comment-header">
              <span> 评论 </span>
              <span> {comment.total} 条</span>
            </div>
            <div className="pc-comment-input">
              <input placeholder="发表你对这首歌的看法吧" ref="comment"></input>
              <span onClick={this.handleComment}> 发布 </span>
            </div>
          </div>
          <div className="pc-comment-wrapper">
            <div className="pc-comment-hot">
              <div className="pc-comment-header"> 精彩评论 </div>
              {
                comment.hotComments.map(comment => {
                  return (
                    <div className="pc-comment-item" key={comment.commentId}>
                      <img src={comment.user.avatarUrl}></img>
                      <div className="pc-comment-content">
                        <Link to={`/user/${comment.user.userId}`}>{comment.user.nickname}</Link>
                        {/* <div> { comment.user.nickname } </div> */}
                        <div>{emojiConverter(comment.content)}</div>
                        <div className="pc-comment-item-footer">
                          <span> {new Date(comment.time).toLocaleString()} </span>
                          <span className="pc-comment-like-count" onClick={() => this.likeComment(comment, 'hotComments')}>
                            <i className={`icon-like iconfont ${comment.liked ? 'icon-iosheart' : 'icon-iosheartoutline'}`}></i>
                            {comment.likedCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="pc-comment-newest">
            <div className="pc-comment-header"> 最新评论 </div>
              {
                comment.comments.map(comment => {
                  return (
                    <div className="pc-comment-item" key={comment.commentId}>
                      <img src={comment.user.avatarUrl}></img>
                      <div className="pc-comment-content">
                        <Link to={`/user/${comment.user.userId}`}>{comment.user.nickname}</Link>
                        {/* <div>  </div> */}
                        <div>{comment.content}</div>
                        <div className="pc-comment-item-footer">
                          <span> {new Date(comment.time).toLocaleString()} </span>
                          <span className="pc-comment-like-count" onClick={() => this.likeComment(comment, 'hotComments')}>
                              <i className={`icon-like iconfont ${comment.liked ? 'icon-iosheart' : 'icon-iosheartoutline'}`}></i>
                              {comment.likedCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <div className="pc-comment-loadmore" onClick={() => this.loadmore('new')}>
                加载更多
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Comment

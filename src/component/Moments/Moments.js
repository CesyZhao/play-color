import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Moments.less'
import emojiConverter from '../../util/emoji'
import api from '../../config/api'

class Moments extends Component {

  state = {
    moments: [],
    lastTime: -1
  }

  componentDidMount() {
    this.getMoments()
    const observer = new IntersectionObserver(this.ioObserverCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    })
    observer.observe(this.refs.loadmore)
  }

  ioObserverCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        this.getMoments({ lasttime: this.state.lastTime })
      }
    })
  }

  getMoments = async (param) => {
    try {
      const { data } = await api.home.getMomments(param)
      this.setState({
        moments: [...this.state.moments, ...data.event],
        lastTime: data.lasttime
      })
    } catch (error) {
      console.log(error)
    }
  }

  renderContent = (message) => {
    function renderContent({ img, name, author }) {
      return (
        <div className="pc-moment-content">
          <img src={img}></img>
          <div className="pc-moment-content-info">
            <div className="pc-moment-content-name">{name}</div>
            <div>{author}</div>
          </div>
        </div>
      )
    }
    function renderSong(song) {
      return renderContent({
        img: song.album.picUrl,
        name: song.name,
        author: song.artists.map(artist => artist.name).join('/')
      })
    }
    function renderPlaylist(playlist) {
      return renderContent({
        img: playlist.coverImgUrl,
        name: playlist.name,
        author: playlist.creator.nickname
      })
    }
    function renderVideo(video) {
      return renderContent({
        img: video.coverUrl,
        name: video.title,
        author: video.creator.nickname
      })
    }
    function renderTopic(topic) {
      return renderContent({
        img: topic.rectanglePicUrl,
        name: topic.title,
        author: topic.creator.nickname
      })
    }
    const contentMap = {
      song: renderSong,
      playlist: renderPlaylist,
      video: renderVideo,
      topic: renderTopic
    }
    for (const type in contentMap) {
      if (message[type]) {
        return contentMap[type](message[type])
      }
    }
  }

  render() {
    return (
      <div className="pc-moments">
        <ul className={`pc-moments-list ${!this.state.moments.length && 'empty'}`}>
          {
            this.state.moments.map(moment =>{
              const { commentThread } = moment.info
              const { resourceTitle } = commentThread
              const [eventName] = resourceTitle ? resourceTitle.split('：') : []
              return (
                <li className="pc-moments-item" key={moment.id}>
                  <img className="avatar" src={moment.user.avatarUrl}></img>
                  <div className="pc-moments-item-content">
                    <div>
                      <Link to={`/user/${moment.user.userId}`} className="moment-user">{moment.user.nickname}</Link>
                      <span> {eventName} </span>
                    </div>
                    <div className="pc-moment-time">{new Date(moment.eventTime).toLocaleString()}</div>
                    <div className="pc-moment-message">{emojiConverter(JSON.parse(moment.json).msg)}</div>
                    {
                      this.renderContent(JSON.parse(moment.json))
                    }
                    <div className={`pics-${moment.pics.length}`}>
                      {
                        moment.pics.map(pic => {
                          return <img src={pic.pcSquareUrl} key={pic.id} className="moment-image"></img>
                        })
                      }
                    </div>
                    <div className="pc-moment-item-footer">
                      <span></span>
                      <span>
                        <span className="pc-moment-options">
                          <i className="iconfont icon-zan"></i>
                          {moment.info.likedCount}
                          <i className="iconfont icon-share_icon"></i>
                          {moment.info.shareCount}
                        </span>
                      </span>
                    </div>
                  </div>
                </li>
              )
            })
          }
          <li className="pc-moments-loadmore" ref="loadmore">加载中...</li>
        </ul>
      </div>
    )
  }
}

export default Moments
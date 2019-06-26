import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import betterScroller from 'better-scroll'


let scroller


@connect(({controller}) => ({
  controller
}))
class Lyric extends Component {
  static propTypes = {
    lyrics: PropTypes.object.isRequired,
    tlyrics: PropTypes.object.isRequired
  }

  state = {
    times: [],
    nextIndex: 0,
    num: _.isEmpty(this.props.tlyrics) ? 4 : 9
  }

  componentDidMount () {
    scroller = new betterScroller(this.refs.lyric)
    this.setState({ times: Object.keys(this.props.lyrics) })
  }

  findNextIndex = (time) => {
    let nextIndex = this.state.times.findIndex(item =>{
      return +item > time
    })
    this.setState({
      nextIndex
    }, () => {
      if (nextIndex > this.num) {  
        let lineEl = this.refs.lyricLine[nextIndex - this.num]  
        scroller.scrollToElement(lineEl, 1000)  
      } else {  
        scroller.scrollToElement(0, 0, 1000)  
      }
    })
  }

  render () {
    const { song } = this.props.controller
    return (
      <div className="pc-lyric-wrapper">
        <div className="pc-lyric-song-info">
          <h2> { song.name } </h2>
          <span> { song.artists.map(artist => artist.name).join('/') } </span>
        </div>
        <div className="pc-lyric" ref="lyric">
          <ul className="lyric-scroller">
            {
              this.props.lyrics.map((lyric, key) => {
                return (
                  <li ref="lyricLine" key={ key } className={`lyric-scroll-item ${this.state.nextIndex-1 === this.state.times.indexOf(key) && 'active'}`}>
                    <div class="lyric-row">{lyric}</div>
                    {
                      this.state.tlyrics && 
                      <div class="tlyric-row">{this.state.tlyrics[key]}</div>
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Lyric
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import betterScroller from 'better-scroll'
import http from '../../../config/http'
import toaster from '../../../util/toast'
import { formatLyric } from '../../../util/audio'
let scroller


@connect(({controller}) => ({
  controller
}))
class Lyric extends Component {

  state = {
    times: [],
    nextIndex: 0,
    lyrics: [],
    tlyrics: [],
    num: 0
  }

  componentDidMount () {
    scroller = new betterScroller(this.refs.lyric)
    this.getLyrics()
  }

  getLyrics = async () => {
    const {song} = this.props.controller
    try {
      const res = await http.get(`/lyric?id=${song.id}`)
      let { lrc, tlyric } = res.data
      let lyrics = formatLyric(lrc.lyric)
      let tlyrics = tlyric.lyric ? formatLyric(tlyric.lyric) : null
      this.setState({
        lyrics,
        tlyrics,
        num: tlyric ? 4 : 9,
        times: Object.keys(lyrics)
      })
    } catch (error) {
      console.log(error)
      toaster.error('Fail to load lyrics')
    }
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
              Object.entries(this.state.lyrics).map(([key, lyric]) => {
                return (
                  <li ref="lyricLine" key={ key } className={`lyric-scroll-item ${this.state.nextIndex - 1 === this.state.times.indexOf(key) && 'active'}`}>
                    <div className="lyric-row">{lyric}</div>
                    {
                      this.state.tlyrics && 
                      <div class="tlyric-row">{this.state.tlyric[key]}</div>
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
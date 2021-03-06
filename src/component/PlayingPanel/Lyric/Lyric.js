import React, { Component } from 'react'
import { connect } from 'react-redux'
import toaster from '../../../util/toast'
import { formatLyric } from '../../../util/audio'
import './Lyric.less'
import api from '../../../config/api'
import Player from '../../Controller/Player'

let timer


@connect(({controller}) => ({
  controller
}))
class Lyric extends Component {

  state = {
    times: [],
    nextIndex: 0,
    lyrics: [],
    tlyrics: [],
    num: 0,
    nolyric: true
  }

  componentDidMount() {
    this.getLyrics(this.props.controller.song)
  }

  componentWillReceiveProps(props) {
    this.getLyrics(props.controller.song)
  }

  componentWillUnmount() {
    clearInterval(timer)
  }

  getLyrics = async (song) => {
    try {
      const res = await api.song.getLyric({ id: song.id })
      let { lrc, tlyric, nolyric, uncollected } = res.data
      if (nolyric || uncollected) {
        this.setState({
          nolyric: true
        })
        clearInterval(timer)
        return
      }
      let lyrics = formatLyric(lrc.lyric)
      let tlyrics = tlyric.lyric ? formatLyric(tlyric.lyric) : null
      this.setState({
        nolyric: false,
        lyrics,
        tlyrics,
        num: 1,
        times: Object.keys(lyrics)
      })
      timer = setInterval(() => {
        this.findNextIndex(Math.round(Player.getCurrentTime() * 1000))
      }, 1000)
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
      if (nextIndex > this.state.num) {
        let lineEl = document.querySelector(`[data-lyric-line='${nextIndex - 1}']`)
        lineEl && lineEl.scrollIntoView({behavior: 'smooth'})
      } else {
        document.querySelector('[data-lyric-line=\'0\']').scrollIntoView({behavior: 'smooth'})
      }
    })
  }

  render() {
    const { song } = this.props.controller
    return (
      <div className="pc-lyric-wrapper">
        <div className="pc-lyric-song-info">
          <h3> {song.name} </h3>
          <span>歌手: {song.artists.map(artist => artist.name).join('/')} </span>
        </div>
        {
          !this.state.nolyric
          && <div className="pc-lyric" ref="lyric">
              <ul className="lyric-scroller">
                {
                  Object.entries(this.state.lyrics).map(([key, lyric], index) => {
                    return (
                      <li key={key} data-lyric-line={index} className={`lyric-scroll-item ${this.state.nextIndex - 1 === this.state.times.indexOf(key) && 'active'}`}>
                        <div className="lyric-row">{lyric}</div>
                        {
                          this.state.tlyrics &&
                          <div className="tlyric-row">{this.state.tlyrics[key]}</div>
                        }
                      </li>
                    )
                  })
                }
              </ul>
            </div>
        }
      </div>
    )
  }
}

export default Lyric
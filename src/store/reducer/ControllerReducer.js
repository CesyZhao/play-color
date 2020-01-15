import {UPDATE_PLAYING_SONG, UPDATE_PLAYING_ALBUM, UPDATE_PLAYING_MODE, NEXT_SONG, PREV_SONG} from '../action/actions'
import _ from 'lodash'
import FM from '../../entity/FM'
import toaster from '../../util/toast'

const initState = {
  song: {},
  playingAlbum: {},
  history: [],
  currentPlaingHistory: [],
  mode: 'listCirculation'
}

function pushNotification(song) {
  new Notification(song.name, {
    // icon: logo,
    body: `${song.artists.map(artist => artist.name).join('/')} —— ${song.album.name}`,
    silent: true
  })
}

function updatePlayingList(state, action) {
  if (state.mode === 'shuffle') {
    const { playingAlbum } = action
    playingAlbum.shuffledTracks = _.shuffle(playingAlbum.tracks)
  }
  return Object.assign({}, state, { playingAlbum: action.playingAlbum })
}

function updatePlayingMode(state, action) {
  const { playingAlbum } = state
  if (action.mode === 'shuffle' && !playingAlbum.playingTracks) {
    playingAlbum.shuffledTracks = _.shuffle(playingAlbum.tracks)
  }
  return Object.assign({}, state, action)
}

function nextSong(state) {
  const { playingAlbum, song, mode } = state
  let nextIndex, nextSong
  let tracks = mode === 'shuffle' ? playingAlbum.shuffledTracks : playingAlbum.tracks
  let index = tracks.findIndex(e => e.id === song.id)
  nextIndex = ++index < tracks.length ? index : 0
  nextSong = tracks[nextIndex]
  console.log(nextSong)
  if (playingAlbum.id === 'personalFM') {
    if (index === tracks.length) {
      const newAlbumInfo = FM.getNewAlbumInfo()
      return Object.assign({}, state, newAlbumInfo)
    } else if (index === tracks.length - 1) {
      FM.getPersonalFM()
    }
  }
  pushNotification(nextSong)
  const { id, name } = playingAlbum
  return Object.assign({}, state, { song: {...nextSong, fromId: id, from: name} })
}

function prevSong(state) {
  const { song, playingAlbum, mode } = state
  let prevSong, prevIndex
  let tracks = mode === 'shuffle' ? playingAlbum.shuffledTracks : playingAlbum.tracks
  let index = tracks.findIndex(e => e.id === song.id)
  // 由于存在用来辨别歌单的对象 {name:***} 所以歌单长度减二
  prevIndex = --index >= 0 ? index : tracks.length - 1
  prevSong = tracks[prevIndex]
  if (index === 0) {
    toaster.error('没有上一首了~')
    return state
  }
  // if (mode === 'listCirculation' || mode === 'singleCirculation') {
  // } else {
  //   //随机模式的上一首，从播放历史列表中取，假如历史中上一首不存在于当前播放列表，则开始新一轮的随机
  //   let prevIndexInHistory = history.findIndex(i =>  i.id === song.id)
  //   prevSong = history[prevIndexInHistory - 1]
  //   if( !prevSong || playingAlbum.findIndex(i => i.id === prevSong.id) < 0){
  //     prevSong = playingAlbum[Math.floor(Math.random() * playingAlbum.length)];
  //   }
  // }
  pushNotification(prevSong)
  const { id, name } = playingAlbum
  return Object.assign({}, state, { song: { ...prevSong, fromId: id, from: name } })
}

export default function ControllerReducer(state = initState, action) {
  switch (action.type) {
    case UPDATE_PLAYING_SONG:
      return Object.assign({}, state, { song: action.song, history: state.history.concat(action.song) })
    case UPDATE_PLAYING_ALBUM:
      return updatePlayingList(state, action)
    case UPDATE_PLAYING_MODE:
      return updatePlayingMode(state, action)
    case NEXT_SONG:
      return nextSong(state)
    case PREV_SONG:
      return prevSong(state)
    default:
      return state
  }
}


import {UPDATE_PLAYING_SONG, UPDATE_PLAYING_ALBUM, UPDATE_PLAYING_MODE, NEXT_SONG, PREV_SONG} from '../action/actions'
import logo from '../../asset/daydream.png'
import _ from 'lodash'

const initState = {
  song: {},
  playingAlbum: {},
  history: [],
  currentPlaingHistory: [],
  mode: 'listCirculation'
}

export default function ControllerReducer (state = initState, action) {
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

function updatePlayingList(state, action) {
  if (state.mode === 'shuffle') {
    const { playingAlbum } = action
    playingAlbum.originTracks = playingAlbum.tracks
    playingAlbum.tracks = _.shuffle(playingAlbum.tracks)
  }
  return Object.assign({}, state, { playingAlbum: action.playingAlbum })
}

function updatePlayingMode(state, action) {
  const { playingAlbum } = state
  if (action.mode === 'shuffle') {
    if (!playingAlbum.originTracks) {
      playingAlbum.originTracks = playingAlbum.tracks
      playingAlbum.tracks = _.shuffle(playingAlbum.originTracks)
    } else {
      const { tracks, originTracks } = _.cloneDeep(playingAlbum)
      playingAlbum.originTracks = tracks
      playingAlbum.tracks = _.shuffle(originTracks)
    }
  }
  if (state.mode === 'shuffle') {
    playingAlbum.tracks = playingAlbum.originTracks
  }
  return Object.assign({}, state, action)
}

function nextSong(state) {
  const { mode, playingAlbum, song, history } = state
  let nextIndex, nextSong
  let index = playingAlbum.tracks.findIndex(e => e.id === song.id)
    // 由于存在用来辨别歌单的对象 {name:***} 所以歌单长度减一
    nextIndex = ++index < playingAlbum.tracks.length - 1 ? index : 0
    nextSong = playingAlbum.tracks[nextIndex]
  // if(mode === 'listCirculation' || mode === 'singleCirculation'){
    
  // }else{
  //   //随机模式下，从当前播放歌单除了当前歌曲的剩余歌曲中取一首 songs 即剩余歌曲
  //   let songs = playingAlbum.filter(e => !history.includes(e.id))
  //   if (songs.length) {
  //     nextSong = songs[Math.floor(Math.random() * songs.length)]
  //   } else {
  //     // 当剩余歌曲长度为0 开始新一轮随机
  //     nextSong = playingAlbum[Math.floor(Math.random() * playingAlbum.length)]
  //   }
  // }
  pushNotification(nextSong)
  const { id, name } = playingAlbum
  return Object.assign({}, state, { song: {...nextSong, fromId: id, from: name} })
}

function prevSong(state) {
  const { mode, song, playingAlbum, history } = state
  let prevSong,prevIndex
  let index = playingAlbum.tracks.findIndex(e => e.id === song.id)
  // 由于存在用来辨别歌单的对象 {name:***} 所以歌单长度减二
  prevIndex = --index >= 0 ? index : playingAlbum.tracks.length - 1
  prevSong = playingAlbum.tracks[prevIndex]
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

function pushNotification (song) {
  return new Notification(song.name, {
    icon: logo,
    body: song.artists.map(artist => artist.name).join('/'),
    silent: true
  })
}

import {UPDATE_PLAYING_SONG, UPDATE_PLAYING_LIST, UPDATE_PLAYING_MODE, NEXT_SONG, PREV_SONG} from '../action/actions'
import logo from '../../asset/daydream.png'
import _ from 'lodash'
import { stat } from 'fs';

const initState = {
  song: {},
  currentPlaingAlbum: [],
  originalAlbum: [],
  history: [],
  currentPlaingHistory: [],
  mode: 'listCirculation'
}

export default function ControllerReducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_PLAYING_SONG:
      return Object.assign({}, state, { song: action.song, history: state.history.concat(action.song) })
    case UPDATE_PLAYING_LIST:
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
  action.originalAlbum = []
  if (state.mode === 'shuffle') {
    const { currentPlaingAlbum } = action
    action.currentPlaingAlbum = _.shuffle(currentPlaingAlbum)
    action.originalAlbum = currentPlaingAlbum
  }
  return Object.assign({}, state, action)
}

function updatePlayingMode(state, action) {
  if (action.mode === 'shuffle') {
    if (!state.originalAlbum.length) {
      state.originalAlbum = state.currentPlaingAlbum
      state.currentPlaingAlbum = _.shuffle(state.currentPlaingAlbum)
    } else {
      const { originalAlbum, currentPlaingAlbum } = _.cloneDeep(state)
      state.originalAlbum = currentPlaingAlbum
      state.currentPlaingAlbum = originalAlbum
    }
  }
  if (state.mode === 'shuffle') {
    state.currentPlaingAlbum = state.originalAlbum
  }
  return Object.assign({}, state, action)
}

function nextSong(state) {
  const { mode, currentPlaingAlbum, song, history } = state
  let nextIndex, nextSong
  let index = currentPlaingAlbum.findIndex(e => e.id === song.id)
    // 由于存在用来辨别歌单的对象 {name:***} 所以歌单长度减一
    nextIndex = ++index < currentPlaingAlbum.length - 1 ? index : 0
    nextSong = currentPlaingAlbum[nextIndex]
  // if(mode === 'listCirculation' || mode === 'singleCirculation'){
    
  // }else{
  //   //随机模式下，从当前播放歌单除了当前歌曲的剩余歌曲中取一首 songs 即剩余歌曲
  //   let songs = currentPlaingAlbum.filter(e => !history.includes(e.id))
  //   if (songs.length) {
  //     nextSong = songs[Math.floor(Math.random() * songs.length)]
  //   } else {
  //     // 当剩余歌曲长度为0 开始新一轮随机
  //     nextSong = currentPlaingAlbum[Math.floor(Math.random() * currentPlaingAlbum.length)]
  //   }
  // }
  pushNotification(nextSong)
  return Object.assign({}, state, { song: nextSong })
}

function prevSong(state) {
  const { mode, song, currentPlaingAlbum, history } = state
  let prevSong,prevIndex
  let index = currentPlaingAlbum.findIndex(e => e.id === song.id)
  // 由于存在用来辨别歌单的对象 {name:***} 所以歌单长度减二
  prevIndex = --index >= 0 ? index : currentPlaingAlbum.length - 1
  prevSong = currentPlaingAlbum[prevIndex]
  // if (mode === 'listCirculation' || mode === 'singleCirculation') {
   
  // } else {
  //   //随机模式的上一首，从播放历史列表中取，假如历史中上一首不存在于当前播放列表，则开始新一轮的随机
  //   let prevIndexInHistory = history.findIndex(i =>  i.id === song.id)
  //   prevSong = history[prevIndexInHistory - 1]
  //   if( !prevSong || currentPlaingAlbum.findIndex(i => i.id === prevSong.id) < 0){
  //     prevSong = currentPlaingAlbum[Math.floor(Math.random() * currentPlaingAlbum.length)];
  //   }
  // }
  pushNotification(prevSong)
  return Object.assign({}, state, { song: prevSong })
}

function pushNotification (song) {
  return new Notification(song.name, {
    icon: logo,
    body: song.artists.map(artist => artist.name).join('/'),
    silent: true
  })
}
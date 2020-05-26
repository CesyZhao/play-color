import http from '../http'

const getHeartbeatList = param => http.get(`/playmode/intelligence/list?id=${param.id}&pid=${param.pid}&sid=${param.sid}`)

const getPlayList = param => http.get(`/playlist/detail?id=${param.id}`)

const getComments = param => http.get(`/comment/music?id=${param.id}&offset=${param.offset}`)

const likeComment = param => http.get(`/comment/like?id=${param.id}&cid=${param.cid}&t=${param.t}&type=${param.type}`)

const handleComment = param => http.get(`/comment?t=${param.type}&type=0&id=${param.id}&content=${param.content}`)

const getLyric = param => http.get(`/lyric?id=${param.id}`)

const getSongDetail = param => http.get(`/song/detail?ids=${param.ids}`)

const getPlayLists = param => http.get(`/top/playlist/highquality?before=${param.before}&limit=30&cat=${param.category}`)


export default {
  getHeartbeatList,
  getPlayList,
  getComments,
  likeComment,
  handleComment,
  getLyric,
  getSongDetail
}
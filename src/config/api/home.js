import http from '../http'

const getBanner = param => http.get('/banner')

const getPersonalized = param => http.get('/personalized')

const getTopSong = param => http.get('/top/song?type=0')

const search = param => http.get(`/search?keywords=${param.keyword}&type=${param.type}&limit=5&offset=${param.page}`)

const getMomments = param => http.get(`/event?pagesize=30&lasttime=${ param.lasttime || -1 }`)

const getRankingList = param => http.get('/toplist/detail')

const getFM = param => http.get('/personal_fm')

const getRecommandVideos = param => http.get('/video/group?id=1000')

export default {
  getBanner,
  getPersonalized,
  getTopSong,
  search,
  getMomments,
  getRankingList,
  getFM,
  getRecommandVideos
}

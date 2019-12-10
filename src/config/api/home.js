import http from '../http'

const getBanner = param => http.get('/banner')

const getPersonalized = param => http.get('/personalized')

const getTopSong = param => http.get('/top/song?type=0')

const search = param => http.get(`/search?keywords=${param.keyword}&type=${param.type}&limit=5&offset=${param.page}`)

export default {
  getBanner,
  getPersonalized,
  getTopSong,
  search
}

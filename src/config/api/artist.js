import http from '../http'

const getArtistSong = param => http.get(`/artists?id=${param.id}`)

const getArtistMv = param => http.get(`/artists/mv?id=${param.id}`)

const getArtistAlbum = param => http.get(`/artists/album?id=${param.id}`)

const getArtistDescription = param => http.get(`/artists/desc?id=${param.id}`)

export default {
  getArtistSong,
  getArtistAlbum,
  getArtistMv,
  getArtistDescription
}

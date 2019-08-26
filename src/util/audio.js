export function formatLyric(lyric){
  let result = {}
  let lyrics = lyric.split('\n')
  lyrics.forEach(e => {
    let match = e.match(/\[.+\]/)
    if (!match) return null
    let timestamp = match[0].replace(/\D/g, ':').replace(/^:|:$/g, '').split(':')
    let content = e.replace(/\[.+\]/, '')
    let times = parseInt(+timestamp[0] * 60 * 1000) + parseInt(+timestamp[1] * 1000) + parseInt(timestamp[2])
    result[times] = content
  })
  return result
}

function pad(number) {
  return ('0' + number).slice(-2);
}
/*
* 格式化时间  毫秒 => 秒
* */
export function formatDuration(duration){
  var minutes = Math.floor(duration / 1000 / 60);
  var second = Math.floor(duration / 1000 - minutes * 60);
  return `${pad(minutes)}:${pad(second)}`;
}

export function formatList (list) {
  let playlist
  try{
    playlist = list.map(e => {
      // eslint-disable-next-line
      let {al, album, ar, artists, dt, duration, id, name} = e
      // 处理接口返回的内容属性名称不一的情况
      al = al || album
      ar = ar || artists
      dt = dt || duration
      return {
        id: id.toString(),
        name: name,
        duration: dt,
        album: {
            id: al.id.toString(),
            name: al.name,
            picUrl: `${al.picUrl}?param=100y100`,
            link: `/player/1/${al.id}`
        },
        artists: ar.map(e => ({
            id: e.id.toString(),
            name: e.name,
            // Broken link
            link: e.id ? `/artist/${e.id}` : '',
        }))
      }
    })
  } catch (e) {
    console.error('list not suit for the formation')
  }
  return playlist
}
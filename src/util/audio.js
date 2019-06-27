export function formatLyric(lyric){
  let result = {}
  let lyrics = lyric.split('\n')
  lyrics.map(e => {
    let match = e.match(/\[.+\]/)
    if (!match) return
    let timestamp = match[0].replace(/\D/g, ':').replace(/^:|:$/g, '').split(':')
    let content = e.replace(/\[.+\]/, '')
    let times = parseInt(+timestamp[0] * 60 * 1000) + parseInt(+timestamp[1] * 1000) + parseInt(timestamp[2])
    result[times] = content
  })
  return result
}
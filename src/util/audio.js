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
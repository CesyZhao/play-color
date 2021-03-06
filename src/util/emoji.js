const emojiMap = {
  '[大笑]': '😀',
  '[可爱]': '😊',
  '[憨笑]': '😊',
  '[色]': '😍',
  '[亲亲]': '😘',
  '[惊恐]': '😱',
  '[流泪]': '😭',
  '[亲]': '😙',
  '[呆]': '😳',
  '[哀伤]': '😔',
  '[龇牙]': '😬',
  '[吐舌]': '😝',
  '[撇嘴]': '😒',
  '[怒]': '😡',
  '[奸笑]': '😏',
  '[汗]': '😓',
  '[痛苦]': '😖',
  '[惶恐]': '😰',
  '[生病]': '😨',
  '[口罩]': '😷',
  '[大哭]': '😂',
  '[晕]': '😵',
  '[发怒]': '😈',
  '[开心]': '😁',
  '[鬼脸]': '😜',
  '[皱眉]': '😞',
  '[流感]': '😢',
  '[爱心]': '❤️',
  '[心碎]': '💔',
  '[钟情]': '💘',
  '[星星]': '⭐️',
  '[生气]': '💢',
  '[便便]': '💩',
  '[强]': '👍',
  '[弱]': '👎',
  '[拜]': '🙏',
  '[牵手]': '👫',
  '[跳舞]': '👯',
  '[禁止]': '🙅',
  '[这边]': '💁',
  '[爱意]': '💏',
  '[示爱]': '💑',
  '[嘴唇]': '👄',
  '[狗]': '🐶',
  '[猫]': '🐱',
  '[猪]': '🐷',
  '[兔子]': '🐰',
  '[小鸡]': '🐤',
  '[公鸡]': '🐔',
  '[幽灵]': '👻',
  '[圣诞]': '🎅',
  '[外星]': '👽',
  '[钻石]': '💎',
  '[礼物]': '🎁',
  '[男孩]': '👦',
  '[女孩]': '👧',
  '[蛋糕]': '🎂',
  '[18]': '🔞',
  '[圈]': '⭕️',
  '[叉]': '❌'
}


export default function emojiCoverter(message) {
  if (!message) return
  for (let key in emojiMap) {
    message = message.replace(key, emojiMap[key])
  }
  return message
}
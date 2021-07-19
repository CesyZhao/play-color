export function formatCount(count) {
  if (count > 999999) {
    return (count / 100000).toFixed(2) + ' M'
  }
  return (count / 1000).toFixed(2) + ' K'
}
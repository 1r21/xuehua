export function formatPlayTime(seconds) {
  if (!seconds) {
    return '00:00'
  }
  const min = parseInt(seconds / 60);
  const sec = parseInt(seconds % 60);
  return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}
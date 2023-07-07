export const getDisplayTime = (date: string) => {
  // get rounded delta time in seconds
  const delta = (new Date().getTime() - new Date(date).getTime()) / 1000;

  if (delta >= 24 * 5 * 3600) {
    return date;
  } else if (delta >= 24 * 3600) {
    return Math.trunc(delta / (24 * 3600)).toString() + ' 天前';
  } else if (delta >= 3600) {
    return Math.trunc(delta / 3600).toString() + ' 小時前';
  } else if (delta >= 60) {
    return Math.trunc(delta / 60).toString() + ' 分鐘前';
  }
  return Math.trunc(delta).toString() + ' 秒前';
}

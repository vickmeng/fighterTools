export function msToMinutesAndSeconds(ms:number) {
  // 计算分钟数
  const minutes = Math.floor(ms / (1000 * 60));
  // 计算剩余的毫秒数用于后续计算秒
  ms %= (1000 * 60);
  // 计算秒数
  const seconds = Math.floor(ms / 1000);
  // 计算剩余的毫秒数
  ms %= 1000;

  // 确保分钟、秒和毫秒都以两位数显示，不足则补零
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMilliseconds = String(Math.floor(ms / 10)).padStart(2, '0');

  // 组合成 "XX:XX:XX" 格式
  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}

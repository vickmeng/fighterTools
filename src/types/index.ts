export interface ConfigValue  {
  // 时间都是秒为单位
  trainTime: number;
  // 训练回合数
  trainRounds:number;
  // 休息时间
  breakTime:number;
  // countdown:boolean;//倒计时
  tenSecondsNotice:boolean;
  // 开启指令
  order? :boolean;
  // 指令间隔时间
  orderTime?: number;
}



// 任务调动参数
export interface TaskParams {
  /**
   * 当前时间
   */
  now:number;
  /**
   * 经过时间
   */
  passedTime:number;
  /**
   * 剩余时间
   */
  remainingTime:number;
  /**
   * 已完成
   */
  isFinish:boolean;
  /**
   * 进度
   */
  progress:number;
}


import {ClockPlugin} from "./ClockPlugin";
import {TaskParams} from "../../../types";



// export interface TaskParams {
//   /**
//    * 当前时间
//    */
//   now:number;
//   /**
//    * 经过时间
//    */
//   passedTime:number;
//   /**
//    * 剩余时间
//    */
//   remainingTime:number;
//   /**
//    * 已完成
//    */
//   isFinish:boolean;
//   /**
//    * 进度
//    */
//   progress:number;
// }


interface Params {
  onTask?: (params:TaskParams) => void;
  totalTime:number
  type: FighterClockType;
  times:number;//第几次
  plugins?:ClockPlugin[]
  // onFinish?: (params:FinishParams) => void;
}

export type FighterClockType = 'break' | 'train' | 'prepare'

class FighterClock {
  private starTime: number|undefined;

  private timer = null

  private params:Params

  //总执行时间
  private totalPassedTime = 0

  //



  get times () {
    return this.params.times;
  }

  get type () {
    return this.params.type;
  }


  constructor(params:Params) {
    this.params = params;
  }



  onPlay = () => {
    this.starTime = Date.now();

    this.params.plugins?.forEach((plugin) => {
      plugin.onStart()
    })

    this.onPoll();

  }

  onPoll = () => {
    const onPollTime = Date.now()

    this.timer = setTimeout(() =>{
      const now = Date.now();

      const taskPassedTime =  now - onPollTime;

      // console.log(taskPassedTime)

      this.totalPassedTime += taskPassedTime

      const remainingTime =Math.max(this.params.totalTime - this.totalPassedTime, 0);

      const progress = Math.max(this.totalPassedTime / this.params.totalTime , 1);//不超过1

      const isFinish = this.totalPassedTime >= this.params.totalTime;

      const taskParams:TaskParams={
        now,
        passedTime: this.totalPassedTime,
        progress,
        remainingTime,
        isFinish,
      }

      //
      this.params.onTask(taskParams)

      this.params.plugins?.forEach((plugin) => {
        plugin.onUpdate(taskParams)
      })

      if(isFinish) {
        this.params.plugins?.forEach((plugin) => {
          plugin.onFinish(taskParams)
        })

        this.onStop()
      }else {
        this.onPoll()
      }

    },20)

  }

  onPause = () =>{
    this.onStop();
  }

  onContinue = ()=> {
    this.onPoll();
  }

  onStop = () => {
    if(this.timer){
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  onDestroy = () => {
    this.onStop();

    this.params.plugins?.forEach((plugin) => {
      plugin.onDestroy()
    })
  }

}
export default FighterClock;



import Taro from "@tarojs/taro";
import {ClockPlugin} from "./ClockPlugin";
import {ConfigValue, TaskParams} from "../../../types";
// @ts-ignore
import tenSeconds from '../../../assests/tenSeconds.mp3'

/**
 * 10秒 敲竹板
 */

export class TenSecondsPlugin extends ClockPlugin {
  private audioContext;



  private noticeTimes:number[] =[]





  constructor(config:ConfigValue){
    super(config);

    this.audioContext= Taro.createInnerAudioContext();
    this.audioContext.autoplay = false;
    this.audioContext.src = tenSeconds;


    this.noticeTimes.push((config.trainTime-10) * 1000);
  }

  onStart(): void {

  }

  onUpdate(taskParams:TaskParams) {

    const noticeTime = this.noticeTimes[0]
    if(noticeTime){
      if(Math.abs(taskParams.passedTime - noticeTime) <= 50 ){
        this.audioContext.play();
        this.noticeTimes.shift();
      }
    }
  }

  onFinish(): void {

  }

  onDestroy() {
    this.audioContext.destroy();
  }
}

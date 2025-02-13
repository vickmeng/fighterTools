import {ClockPlugin} from "./ClockPlugin";
import Taro from "@tarojs/taro";
import tenSeconds from './tenSeconds.mp3'
import {ConfigValue, TaskParams} from "../../../types";

/**
 * 10秒 敲竹板
 */

export class TenSecondsPlugin extends ClockPlugin {
  private audioContext;

  private config:ConfigValue;


  private noticeTimes:number[] =[]





  constructor(config:ConfigValue){
    super(config);
    this.config = config;

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

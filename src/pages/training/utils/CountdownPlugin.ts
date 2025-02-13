import Taro from "@tarojs/taro";
import {ClockPlugin} from "./ClockPlugin";
import {ConfigValue, TaskParams} from "../../../types";
// @ts-ignore
import countDown from './countdown.wav'

/**
 * 10秒倒计时插件
 */

export class CountdownPlugin extends ClockPlugin {
  private countDownAudioContext;



  private noticeTimes:number[] =[]





  constructor(config:ConfigValue){
    super(config);

    this.countDownAudioContext= Taro.createInnerAudioContext();
    this.countDownAudioContext.autoplay = false;
    this.countDownAudioContext.src = countDown;


    this.noticeTimes.push((config.trainTime-10) * 1000);
  }

  onStart(): void {

  }

  onUpdate(taskParams:TaskParams) {

    const noticeTime = this.noticeTimes[0]
    if(noticeTime){
      if(Math.abs(taskParams.passedTime - noticeTime) <= 100 ){
        this.countDownAudioContext.play();
        this.noticeTimes.shift();
      }
    }
  }

  onFinish(): void {

  }

  onDestroy() {
    this.countDownAudioContext.destroy();
  }
}

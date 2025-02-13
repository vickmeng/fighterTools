import {ClockPlugin} from "./ClockPlugin";
import Taro from "@tarojs/taro";
import countDown from './countdown.wav'
import {ConfigValue, TaskParams} from "../../../types";

/**
 * 10秒倒计时插件
 */

export class CountdownPlugin extends ClockPlugin {
  private countDownAudioContext;

  private config:ConfigValue;


  private noticeTimes:number[] =[]





  constructor(config:ConfigValue){
    super(config);
    this.config = config;

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

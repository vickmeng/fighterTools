import {ClockPlugin} from "./ClockPlugin";
import {ConfigValue, TaskParams} from "../../../types";
import Taro from "@tarojs/taro";
import order from './order.mp3'

export class BeatOrderPlugin extends ClockPlugin {
  private audioContext;

  private config:ConfigValue;

  private noticeTimes:number[] =[]

  constructor(config:ConfigValue){
    super(config);
    this.config = config;

    this.audioContext= Taro.createInnerAudioContext();
    this.audioContext.autoplay = false;
    this.audioContext.src = order;


    for (let i = config.orderTime * 1000; i <= config.trainTime * 1000; i += config.orderTime! * 1000) {
      this.noticeTimes.push(i)
    }
  }

  onStart(): void {

  }

  onUpdate(taskParams:TaskParams) {

    const noticeTime = this.noticeTimes[0]
    if(noticeTime){
      if(Math.abs(taskParams.passedTime - noticeTime) <= 50 ){

        console.log('发起指令',noticeTime)
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

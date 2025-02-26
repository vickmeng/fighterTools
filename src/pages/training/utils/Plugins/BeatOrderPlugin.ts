

// @ts-ignore
import {onAudioNotice} from "./AudioNotice";
import {ClockPlugin} from "../ClockPlugin";
import {ConfigValue, TaskParams} from "../../../../types";


export class BeatOrderPlugin extends ClockPlugin {
  private noticeTimes: number[] = []

  constructor(config: ConfigValue) {
    super(config);

    for (let i = config.orderTime! * 1000; i <= config.trainTime * 1000; i += config.orderTime! * 1000) {
      this.noticeTimes.push(i)
    }
  }

  onStart(): void {

  }

  onUpdate(taskParams: TaskParams) {
    const noticeTime = this.noticeTimes[0]
    if (noticeTime) {
      if (Math.abs(taskParams.passedTime - noticeTime) <= 10) {

        console.log('发起指令', noticeTime)
        onAudioNotice(`http://ss8p8dty1.hn-bkt.clouddn.com/order.mp3`)
        this.noticeTimes.shift();
      }
    }
  }

  onFinish(): void {

  }

  onDestroy() {

  }
}

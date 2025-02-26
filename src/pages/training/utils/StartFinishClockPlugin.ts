import Taro from "@tarojs/taro";
import {ClockPlugin} from "./ClockPlugin";
import {ConfigValue} from "../../../types";
// @ts-ignore
import trainStart from '../../../assests/trainStart.mp3'
// @ts-ignore
import trainFinish from '../../../assests/trainFinish.wav'

export class StartFinishClockPlugin extends ClockPlugin {

  private startAudioContext ;
  private finishAudioContext;


  constructor(config:ConfigValue){
    super(config);
    this.startAudioContext = Taro.createInnerAudioContext();
    this.startAudioContext.autoplay = false;
    this.startAudioContext.src = trainStart;

    this.finishAudioContext = Taro.createInnerAudioContext();
    this.finishAudioContext.autoplay = false;
    this.finishAudioContext.src = trainFinish;
  }


  onStart(): void {
    this.startAudioContext.play();
  }

  onUpdate() {
  }

  onFinish(): void {
    this.finishAudioContext.play();
  }

  onDestroy() {
  }

}

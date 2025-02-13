import Taro from "@tarojs/taro";
import {ClockPlugin} from "./ClockPlugin";
import trainFinish from './trainFinish.wav'
import trainStart from './trainStart.mp3'
import {ConfigValue} from "../../../types";

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

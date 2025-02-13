import {ConfigValue, TaskParams} from "../../../types";


export abstract class ClockPlugin {
  protected config: ConfigValue;


  abstract onStart(): void;
  abstract onUpdate(taskParams:TaskParams): void;
  abstract onFinish(taskParams:TaskParams): void;
  abstract onDestroy(): void;

  constructor(config: ConfigValue) {
    this.config = config;
  };
}



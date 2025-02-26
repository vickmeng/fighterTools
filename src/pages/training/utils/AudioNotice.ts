import {getBackgroundAudioManager} from "@tarojs/taro";

const backgroundAudioManager = getBackgroundAudioManager()


backgroundAudioManager.title = '格斗秒表'
// backgroundAudioManager.epname = '此时此刻'
backgroundAudioManager.singer = '格斗秒表'
backgroundAudioManager.coverImgUrl = 'https://wx.qlogo.cn/mmhead/7SPO0mRJt6DPhKwn4a7fsttQd4PJcKxW5w9UGJnA4xJPdH2k9D4Zq3rlrpO8TpwrIX0uvwcUIq8/0'

export const onAudioNotice = (src:string)=>{



  backgroundAudioManager.src = src;

  backgroundAudioManager.play();
  return backgroundAudioManager;
}

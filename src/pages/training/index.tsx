import {View} from "@tarojs/components";
import {useMemo, useRef, useState} from 'react'
import {navigateBack, useLoad, useRouter, useUnload} from "@tarojs/taro";
import {ConfigValue} from "../../types";
import FighterClock from "./utils/FighterClock";
import {msToMinutesAndSeconds} from "./utils";
import './index.less'
import {StartFinishClockPlugin} from "./utils/StartFinishClockPlugin";
import {ClockPlugin} from "./utils/ClockPlugin";
import {TenSecondsPlugin} from "./utils/TenSecondsPlugin";
import {BeatOrderPlugin} from "./utils/Plugins/BeatOrderPlugin";


const Training = ()=>{
  const router = useRouter()

  const config = JSON.parse(router.params.value!) as ConfigValue

  const trainRoundRef =  useRef(0)

  const [finishTraining,setFinishTraining] =  useState(false)
  const [isPause,setIsPause] =  useState(false)


  const [remainingTime,setRemainingTime] = useState<number>()


  const [currentClock,setCurrentClock] = useState<FighterClock>()



  useLoad(()=>{
    const prepareClock = new FighterClock({
      type:'prepare',
      totalTime: 3000,
      times:1,
      onTask:({isFinish,remainingTime:_remainingTime})=>{
        setRemainingTime(_remainingTime)


        if(isFinish){
          toNextTrain()
        }

      }
    })


    prepareClock.onPlay();

    setCurrentClock(prepareClock)
  })

  useUnload(()=>{
    currentClock?.onDestroy()
  })

  const toNextTrain = ()=>{
    trainRoundRef.current +=1

    const plugins:ClockPlugin[] = [new StartFinishClockPlugin(config)]


    if (config.tenSecondsNotice){
      plugins.push(new TenSecondsPlugin(config))
    }


    if (config.order){
      plugins.push(new BeatOrderPlugin(config))
    }


    const nextTrainClock = new FighterClock({
      type:'train',
      totalTime: config.trainTime * 1000,
      times: trainRoundRef.current,
      plugins,
      onTask: ({isFinish,remainingTime:_remainingTime})=>{
        setRemainingTime(_remainingTime)

        if(isFinish){
          if(trainRoundRef.current >= config.trainRounds){
            //完成训练了
            setFinishTraining(true)
            return;
          }
          //进入休息
          toNextBreak()
        }
      }
    })

    nextTrainClock.onPlay();

    setCurrentClock(nextTrainClock)
   }

  const toNextBreak = ()=>{
    const nextBreakClock = new FighterClock({
      type:'break',
      totalTime: config.breakTime * 1000,
      times: trainRoundRef.current,
      onTask:({isFinish,remainingTime:_remainingTime})=>{
        setRemainingTime(_remainingTime)
        if(isFinish){
          toNextTrain()
        }
      }
    })

    nextBreakClock.onPlay();

    setCurrentClock(nextBreakClock)
  }

  const showRemainingTime = useMemo(()=>{
    // 小于0 依然取0
    return  remainingTime ? msToMinutesAndSeconds(remainingTime) : ''
  },[remainingTime])

  const typeCn =  useMemo(()=>{
    // 小于0 依然取0
    if(currentClock?.type === 'train') {
      return `第${currentClock.times}组训练`
    }else if(currentClock?.type === 'break'){
      return '休息'
    }else if(currentClock?.type === 'prepare'){
      return '预备'
    }

  },[currentClock])

  const bg =  useMemo(()=>{
    // 小于0 依然取0
    if(currentClock?.type === 'train') {
      return '#FFA500'
    }else if(currentClock?.type === 'break'){
      return '#0066CC'
    }else if(currentClock?.type === 'prepare'){
      return '#12b312'
    }

  },[currentClock])


  return <>
    {finishTraining
      ? <View className='wrapper' style={{background:'#12b312'}}>
          <View style={{fontSize:'60px',marginBottom:'30px'}}>
            完成训练
          </View>
          <View style={{marginBottom:'100px'}}>
            <View className='roundBtn at-icon at-icon-arrow-left' onClick={()=>{
                navigateBack()
              }}
            />
          </View>
        </View>
      : <View className='wrapper' style={{background:bg}}>
          <View style={{fontSize:'40px',marginBottom:'20px'}}>{typeCn}</View>
          <View style={{fontSize:'80px',marginBottom:'30px'}}>
            {showRemainingTime}
          </View>


        <View style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'60px'}}>
          <View className='roundBtn at-icon at-icon-arrow-left' style={{marginRight:'30px'}}  onClick={()=>{
            navigateBack()
          }}
          />

          {isPause
            ? <View className='roundBtn at-icon at-icon-play' onClick={()=>{
                setIsPause(false)
                currentClock!.onContinue()

                }}
            />
            : <View className='roundBtn at-icon at-icon-pause' onClick={()=>{
                setIsPause(true)
                currentClock!.onPause()
              }}
            />

          }
        </View>
      </View>
    }

  </>

}
export default Training;

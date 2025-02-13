import Taro from '@tarojs/taro';

import {View} from '@tarojs/components'

import {AtList, AtListItem} from "taro-ui";

import './index.less'
import {ConfigValue} from "../../types";

const Index = ()=>{
  const toConfigPage = (params:ConfigValue)=>{
    Taro.navigateTo({
      url: `/pages/config/index?value=${JSON.stringify(params)}`
    })
  }


  return (
    <View className='index'>
      <AtList>
         <AtListItem title='3分钟*3回合' arrow='right' onClick={()=>{
            toConfigPage({
              trainRounds:3,
              trainTime:180 ,
              breakTime:30,
              order:undefined,
              tenSecondsNotice:true
              // countdown:true,

            })
          }}
         />
        <AtListItem title='2分钟*3回合' arrow='right' onClick={()=>{
          toConfigPage({
            trainRounds:3,
            trainTime:120 ,
            breakTime:30,
            order:undefined,
            tenSecondsNotice:true
            // countdown:true,
          })
        }}
        />
        <AtListItem title='TABATA高强度间歇训练' arrow='right' onClick={()=>{
          toConfigPage({
            trainRounds:10,
            trainTime:10 ,
            breakTime:5,
            order:undefined,
            tenSecondsNotice:true
          })
        }}
        />
        <AtListItem title='指令训练'  arrow='right' onClick={()=>{
          toConfigPage({
            trainRounds:1,
            trainTime:120 ,
            breakTime:30,
            tenSecondsNotice:true,
            order:"beat",
            orderTime:3
            // countdown:true,
          })
        }}
        />
      </AtList>
    </View>
  )
}
export default Index;

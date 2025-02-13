import Taro from '@tarojs/taro';

import {View} from '@tarojs/components'

import './index.less'
import {ConfigValue} from "../../types";
import LinkCard from "../../components/LinkCard";
import leitai from './../../assests/leitai.svg'
import tabata from './../../assests/tabata.svg'
import order from './../../assests/order.svg'

const Index = ()=>{
  const toConfigPage = (params:ConfigValue)=>{
    Taro.navigateTo({
      url: `/pages/config/index?value=${JSON.stringify(params)}`
    })
  }

  return (
    <View className='index'>

      <LinkCard icon={leitai} color='#1a72ff' onClick={()=>{
        toConfigPage({
          trainRounds:3,
          trainTime:180 ,
          breakTime:30,
          order:undefined,
          tenSecondsNotice:true
        })
      }}
      >
        3 * 3
      </LinkCard>

      <LinkCard icon={leitai} color='#ff8000' onClick={()=>{
        toConfigPage({
          trainRounds:3,
          trainTime:120 ,
          breakTime:30,
          order:undefined,
          tenSecondsNotice:true
        })
      }}
      >
        2 * 3
      </LinkCard>

      <LinkCard icon={tabata} color='#00cb7d' onClick={()=>{
        toConfigPage({
          trainRounds:10,
          trainTime:10 ,
          breakTime:5,
          order:undefined,
          tenSecondsNotice:false
        })
      }}
      >
        TABATA
      </LinkCard>

      <LinkCard icon={order} color='#ff5963' onClick={()=>{
        toConfigPage({
          trainRounds:1,
          trainTime:120 ,
          breakTime:30,
          tenSecondsNotice:true,
          order:true,
          orderTime:3
        })
      }}
      >
        指令训练
      </LinkCard>
    </View>
  )
}
export default Index;

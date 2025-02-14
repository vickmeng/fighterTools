import {navigateTo, useRouter} from '@tarojs/taro';
import {useRef} from 'react'
import {AtButton, AtDivider, AtInputNumber, AtList, AtListItem} from "taro-ui";
import {Field, Group, useControlValue} from '@rx-form/react'
import {FieldControl, GroupControl} from '@rx-form/core'
import {ConfigValue} from "../../types";
import './index.less';
import {View} from "@tarojs/components";


const Config = ()=>{
  const router = useRouter()
  const initValue = JSON.parse(router.params.value!) as ConfigValue

  const formInstance = useRef(new GroupControl<ConfigValue>({
    'trainTime':[initValue.trainTime],
    'trainRounds':[initValue.trainRounds],
    'breakTime':[initValue.breakTime],
    // 'countdown':[initValue.countdown || false],
    "tenSecondsNotice":[initValue.tenSecondsNotice || false],
    'order':[initValue.order],
    'orderTime':[initValue.orderTime]
  })).current;

  const orderValue = useControlValue<FieldControl<boolean|undefined>>(formInstance.get('order'))

  return <View className='config-page'>

      <Group control={formInstance}>
        {()=>{

          return <AtList>

            <AtDivider content='基础设置' />

            <Field<number> name='trainRounds'>{({value,setValue})=>{
              return   <AtListItem title='组数'  extraText={<AtInputNumber
                type='number'
                min={1}
                max={20}
                size='large'
                value={value}
                onChange={setValue}
              />}
              />
            }}</Field>

            <Field<number> name='trainTime'>{({value,setValue})=>{
              return   <AtListItem title='每组时间(秒)'  extraText={<AtInputNumber
                type='number'
                min={1}
                max={999}
                step={10}
                size='large'
                value={value}
                onChange={setValue}
              />}
              />
            }}</Field>

            <Field<number> name='breakTime'>{({value,setValue})=>{
              return   <AtListItem title='组间休息(秒)'  extraText={<AtInputNumber
                type='number'
                min={1}
                max={999}
                step={10}
                value={value}
                size='large'
                onChange={setValue}
              />}
              />
            }}</Field>

            <AtDivider content='指令模式' />


            <Field<boolean|undefined> name='order'>{({value,setValue})=>{
              return  <>
                <AtListItem title='开启指令' isSwitch switchIsCheck={value} onSwitchChange={e=>{
                  formInstance.get('orderTime').setValue(8);
                  setValue(e.detail.value)
                }}
                />
              </>
            }}</Field>

            {orderValue && <>
              <Field<number> name='orderTime'>{({value, setValue}) => {
                return <AtListItem title='指令间隔(秒)' extraText={<AtInputNumber
                  type='number'
                  min={1}
                  max={20}
                  step={0.5}
                  size='large'
                  value={value}
                  onChange={setValue}
                />}
                />
            }}</Field>
            </>}

          </AtList>
        }}
      </Group>



      <View className='submit-btn-wrapper'>
        <View className='submit-btn'  onClick={()=>{
          navigateTo({
            url: `/pages/training/index?value=${JSON.stringify(formInstance.value)}`
          })
        }}
        >开始</View>

      </View>





  </View>
}
export default Config

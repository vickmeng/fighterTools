import {useLoad,useUnload,useRouter,navigateTo} from '@tarojs/taro';
import {useRef} from 'react'
import {AtButton, AtDivider, AtInputNumber, AtList, AtListItem} from "taro-ui";
import {Field, Group, useControlValue} from '@rx-form/react'
import {FieldControl, GroupControl} from '@rx-form/core'
import {ConfigValue, ConfigValueOrderType} from "../../types";
// import "taro-ui/dist/style/components/list.scss";
// import "taro-ui/dist/style/components/button.scss";
import './index.less';
import RadioButton from "../../components/RadioButton";


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

  const orderValue = useControlValue<FieldControl<ConfigValueOrderType|undefined>>(formInstance.get('order'))

  useLoad(()=>{
    console.log('useLoad================================')
  })

  useUnload(()=>{
    console.log('useUnload================================')
  })


  return <>
      <Group control={formInstance}>
        {()=>{

          return <AtList>

            <AtDivider content='基础设置' />

            <Field<number> name='trainRounds'>{({value,setValue})=>{
              return   <AtListItem title='组数'  extraText={<AtInputNumber
                type='number'
                min={1}
                max={15}
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


            <Field<ConfigValueOrderType|undefined> name='order'>{({value,setValue})=>{
              return  <>
                <AtListItem title='选择指令模式' />
                <RadioButton
                  value={value}
                  setValue={(v)=>{
                    setValue(v as ConfigValueOrderType);
                    formInstance.get('orderTime').setValue(3)
                  }}
                  options={[
                      {label:'不开启',value:undefined},
                      {label:'仅节拍',value:'beat'},
                      {label:'单拳',value:'single',disabled:true},
                      {label:'组合',value:'combo',disabled:true},
                    ]
                  }
                />
              </>
            }}</Field>

            {orderValue && <>
              <Field<number> name='orderTime'>{({value, setValue}) => {
                return <AtListItem title='指令间隔(秒)' extraText={<AtInputNumber
                  type='number'
                  min={1}
                  max={8}
                  step={0.2}
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

      <AtButton className='submit-btn' type='primary' onClick={()=>{
        navigateTo({
          url: `/pages/training/index?value=${JSON.stringify(formInstance.value)}`
        })
      }}
      >开始训练！！！</AtButton>

  </>
}
export default Config

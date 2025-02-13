import {AtTag} from "taro-ui";
// import "taro-ui/dist/style/components/tag.scss";
import './index.less'

interface Props {
  options:{
    label: string;
    value: string|number|undefined;
    disabled?:boolean;
  }[],
  value?: string|number,
  setValue?: (value: string|number|undefined)=>void

}


const RadioButton = (props:Props) => {
  const {options,value,setValue} = props


  return <>
    {
      options.map((opt) => {
        const selected = opt.value === value;

        return <AtTag
          className='radio-btn'
          circle

          key={opt.value}
          active={selected}
          disabled={opt.disabled}
          onClick={()=>{
            setValue?.(opt.value)
          }}
        >
          {opt.label }
        </AtTag>
      })
    }
  </>

}

export default RadioButton

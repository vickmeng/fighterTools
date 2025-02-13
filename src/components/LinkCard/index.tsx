import {View,Image} from "@tarojs/components";
import {PropsWithChildren, useMemo} from "react";
import tinycolor from 'tinycolor2';
import './index.less'


type Props = PropsWithChildren<{
  color:string,
  onClick:()=>void,
  icon?:string;
}>

const LinkCard = (props:Props ) => {

  const {color,children,icon} = props;

  const gradientColor = useMemo(() => {
    // 通过背景颜色计算渐变的浅色
    return tinycolor(color).lighten(40);
  }, [color]);

  const backgroundColor = `linear-gradient(155deg, ${color} 0%, ${gradientColor} 100%)`;


  return <View className='link-card' onClick={props.onClick} style={{background:backgroundColor}}>
    {icon && <Image mode='widthFix' className='link-card__icon' src={icon} />}

    {children}
  </View>

}
export default LinkCard;

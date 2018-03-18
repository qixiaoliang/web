import React from 'react';
import Zxns from '../Zxns';
import SkewBox from '../SkewBox';
import SerisAnim from '../SeriesAnim';
import Card from '../Card';
import Disk from '../Disk';
import { Scale } from '../Transitions';
//@ts-ignore
import line from '@src/line.png';

const sr = 82;
const lr = ( 0.5 / Math.sin( 2 * Math.PI / 14 ) - 0.5 ) * sr * 2;
const width = sr + lr + sr + 'px';

let arr = [
    '五险一金',
    '节日福利',
    '意外惊喜',
    '交通补贴',
    '周末双休',
    '年度拓展',
    '年度奖金'
];

type AnimProps = {
    timeout?: number,
    in?: boolean
} & React.AllHTMLAttributes<any>
const Anim: React.SFC<AnimProps> = ( props ) => {
    return (
        <div style={ props.style }>
            <Scale timeout={ props.timeout } in={ props.in }>
                { props.children }
            </Scale>
        </div>
    )
}
Anim.defaultProps = {
    timeout: 300
}

const items = arr.map( ( item, i ) => (
    <Anim key={ i } style={ {
        width: width,
        height: width,
        marginTop: i === 0 ? '0px' : '-100%',
        display: 'flex',
        justifyContent: 'center',
        transformOrigin: `0.5`,
        transform: `rotate(${ i * 360 / 7 }deg)`,
        borderRadius: '50%'
    } }>
        <Disk
            size={ sr }
            style={ {
                transform: `rotate(${ -i * 360 / 7 }deg)`
            } }>{ item }</Disk>
    </Anim>
) )
items.push(
    <Anim
        key={ items.length }
        style={ {
            width: width,
            height: width,
            marginTop: '-100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        } }>
        <Disk size={ lr }>丰厚福利等着你</Disk>
    </Anim>
)

export default function () {
    return (
        <SerisAnim component={ Card } in>
            <SkewBox>
                { "| 福利待遇 |" }
            </SkewBox>

            <img src={ line } />

            <SerisAnim in>
                { items }
            </SerisAnim>

            <div>
                { "<<<<  青岛乘正科技有限公司  >>>>" }
            </div>
        </SerisAnim>
    )
}
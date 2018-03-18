import React from 'react';
import Zxns from '../Zxns';
import Card from '../Card';
import SerisAnim from '../SeriesAnim';
import { Scale, Slide } from '../Transitions';
import SkewBox from '../SkewBox';
import BorderedBox from '../BordedBox';


const Box = ( props: { title: string, subTitle: string } ) => {
    let style: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '82vw'
    }

    return (
        <Scale appear in timeout={ 500 } from={ 0.5 }>
            <BorderedBox style={ {
                width: '82vw',
                margin: '12px 0'
            } }>
                <div style={ style }>
                    <span style={ {
                        fontSize: '20px',
                        fontWeight: 400
                    } }>{ props.title }</span>
                    <span>{ props.subTitle }</span>
                </div>
            </BorderedBox>
        </Scale>
    )
}


export default function () {
    return (
        <SerisAnim component={ Card } in>

            <SkewBox>
                招聘职位
            </SkewBox>

            <Box title="[场景地形编辑]" subTitle="[招聘人数: 1名]" />

            <Slide appear>
                <div>
                    <ul style={ {
                        listStyleType: 'decimal',
                        paddingLeft: '12px',
                        fontSize: '14px'
                    } }>
                        <li>1年以上建模工作经验；</li>
                        <li>熟练使用Unity3D，3dmax，PS建模、作图软件；</li>
                        <li>对模型结构，比例尺寸把握准确，布线条理；</li>
                        <li>从事过建模工作者优先。（建筑楼宇、家居装修、游戏建模、家具模型）；</li>
                        <li>熟悉Unity 3D引擎。</li>
                    </ul>
                </div>
            </Slide>

            <Zxns />
        </SerisAnim>
    )
}

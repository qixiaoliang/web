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

            <Box title="[产品经理]" subTitle="[招聘人数: 2名]" />

            <Slide appear>
                <div>
                    <ul style={ {
                        listStyleType: 'decimal',
                        paddingLeft: '12px',
                        fontSize: '14px'
                    } }>
                        <li>计算机相关专业本科以上学历；</li>
                        <li>3年以上产品经理工作经验；</li>
                        <li>具有市场分析、市场定位、产品策划能力；</li>
                        <li>具有组织实施能力；</li>
                        <li>具有产品运营推广能力；</li>
                        <li>具有资源调度组织能力；</li>
                        <li>热爱产品。</li>
                    </ul>
                </div>
            </Slide>

            <Zxns />
        </SerisAnim>
    )
}

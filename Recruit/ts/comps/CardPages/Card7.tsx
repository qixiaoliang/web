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

            <Box title="[测试工程师]" subTitle="[招聘人数: 4名]" />

            <Slide appear>
                <div>
                    <ul style={ {
                        listStyleType: 'decimal',
                        paddingLeft: '12px'
                    } }>
                        <li>大专及以上学历；</li>
                        <li>计算机/信息/自动化/电子等相关专业；</li>
                        <li>能编写测试计划、测试报告等文档，设计测试用例；</li>
                        <li>有耐心，责任心强，善于学习和总结思考，具有较强的逻辑思维能力；</li>
                        <li>具有良好的沟通能力、抗压能力和团队合作精神；</li>
                        <li>具有资源调度组织能力；</li>
                        <li>对软件测试有热情。</li>
                    </ul>
                </div>
            </Slide>

            <Zxns />
        </SerisAnim>
    )
}

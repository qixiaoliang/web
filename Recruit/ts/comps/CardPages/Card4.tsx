import React from 'react';
import Zxns from '../Zxns';
import Card from '../Card';
import SerisAnim from '../SeriesAnim';
import { Scale, Slide } from '../Transitions';
import SkewBox from '../SkewBox';
import BorderedBox from '../BordedBox';


const Box = ( props: { title: string, subTitle: string, in?: boolean } ) => {
    let style: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '82vw'
    }

    return (
        <Scale appear in={ props.in } timeout={ 500 } from={ 0.5 }>
            <BorderedBox style={ {
                width: '82vw',
                margin: '6px 0'
            } }>
                <div style={ style }>
                    <span style={ {
                        fontSize: '20px',
                        fontWeight: 400
                    } }>
                        { props.title }
                    </span>
                    <span>
                        { props.subTitle }
                    </span>
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

            <Box title="[GIS数据工程师]" subTitle="[招聘人数: 3名]" />

            <Slide appear>
                <div>
                    <ul style={ {
                        listStyleType: 'decimal',
                        paddingLeft: '12px',
                        fontSize: '14px'
                    } }>
                        <li>本科及以上学历，土地资源管理、地理信息系统、制图、测绘或相关专业；</li>
                        <li>具有测绘、GIS数据技术工作1至3年以上经验；</li>
                        <li>熟悉内业数据处理软件（ArcGIS、MapGIS等）；</li>
                        <li>熟悉ArcGIS地图服务发布、切片工作流程；</li>
                        <li>认真负责、严谨稳健，能够承受一定的工作压力；具有较强的学习研究能力；可以适应短暂出差和加班；</li>
                        <li>有城市规划、专题地图制作，三维GIS工作经验者优先。</li>
                    </ul>
                </div>
            </Slide>

            <Zxns />
        </SerisAnim>
    )
}

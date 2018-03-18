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

            <Box title="[运维部署工程师]" subTitle="[招聘人数: 2名]" />

            <Slide>
                <div>
                    <ul style={ {
                        listStyleType: 'decimal',
                        paddingLeft: '12px',
                        fontSize: '14px'
                    } }>
                        <li>计算机或网络相关专业专科以上学历；</li>
                        <li>有1年以上网络维护经验；</li>
                        <li>对计算机软硬件比较熟悉、能熟练安装各种操作系统；</li>
                        <li>熟悉sqlserver数据库部署以及数据备份、迁移，具备Windows Server操作系统的运维管理能力（安装、配置、故障排错、优化）,IBM、HP、DELL常见型号服务器的运维管理能力（RAID配置、故障排错）。</li>
                    </ul>
                </div>
            </Slide>

            <Zxns />
        </SerisAnim>
    )
}

import React from 'react';
import Zxns from '../Zxns';
import SkewBox from '../SkewBox';
import SerisAnim from '../SeriesAnim';
import Card from '../Card';
import Disk from '../Disk';
import { Scale } from '../Transitions';

export default function () {
    let AnimDisk = ( props: { children: React.ReactNode, in?: boolean } ) => {
        return (
            <Scale in={ props.in }>
                <Disk>{ props.children }</Disk>
            </Scale>
        )
    }

    return (
        <SerisAnim component={ Card } in>
            <SkewBox>
                { "| 公司概况 |" }
            </SkewBox>

            <Scale>
                <span style={ {
                    display: 'inline-block',
                    fontSize: '14px'
                } }>
                    { "青岛乘正科技发展有限公司致力成为“建筑产业+互联网”专家，秉承“为客户提供优质的产品和服务”的价值观念，以“让建筑全生命数字化”为使命，立足工程领域，围绕建筑全生命周期，以工程领域专业应用为核心，以产业大数据、产业咨询、产业综合解决方案为增值服务，打造专业化、平台化、全球化的建筑全生命数字化平台。" }
                </span>
            </Scale>

            <SerisAnim style={ {
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'row',
                width: '100%'
            } }>
                <AnimDisk>
                    <span style={ {
                        fontSize: '12px'
                    } }>
                        环境好
                    </span>
                </AnimDisk>
                <AnimDisk>
                    <span style={ {
                        fontSize: '12px'
                    } }>
                        晋升快
                    </span>
                </AnimDisk>
                <AnimDisk>
                    <span style={ {
                        fontSize: '12px'
                    } }>
                        待遇好
                    </span>
                </AnimDisk>
            </SerisAnim>

            <Zxns />

            <Scale appear from={ 0.6 }>
                <div>
                    { "<<<<  青岛乘正科技有限公司  >>>>" }
                </div>
            </Scale>
        </SerisAnim>
    )
}
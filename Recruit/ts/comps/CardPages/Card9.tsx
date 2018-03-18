import React from 'react';
import Zxns from '../Zxns';
import Card from '../Card';
import SerisAnim from '../SeriesAnim';
import { Scale, Rotate } from '../Transitions';
import SkewBox from '../SkewBox';
//@ts-ignore
import wingLec from '@src/wingLec.png';

export default function () {
    return (
        <SerisAnim component={ Card } in>
            <SkewBox>
                | 联系我们 |
            </SkewBox>

            <Scale appear from={ 0.8 }>
                <img style={ {
                    marginTop: '22px',
                    marginBottom: '12px'
                } } src={ wingLec } />
            </Scale>

            <Rotate appear>
                <div style={ {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontSize: '16px'
                } }>
                    <span>长按二维码识别添加我</span>
                    <span>[加入我们]</span>
                    <span>电话：82107037</span>
                    <span>邮箱：awingtec@163.com</span>
                    <span>地址：青岛市崂山区深圳路21号1号楼4楼</span>
                </div>
            </Rotate>

            <Zxns />
        </SerisAnim>
    )
}
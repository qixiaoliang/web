import React from 'react';
//@ts-ignore
import wing from '@src/wing.png';
import SkewBox from '../SkewBox';
import Zxns from '../Zxns';
import SerisAnim from '../SeriesAnim';
import Card from '../Card';
import { Scale } from '../Transitions';

export default function () {
    return (
        <SerisAnim component={ Card } in>
            <Scale appear from={ 0.8 }>
                <img src={ wing } />
            </Scale>

            <SerisAnim style={ {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            } }>
                <Zxns />
                <SkewBox style={ {
                    margin: '26px 0 28px 0'
                } }>
                    乘正科技2018招聘
                </SkewBox>
                <Scale appear from={ 0.6 }>
                    <span>
                        让建筑全生命数字化
                    </span>
                </Scale>
            </SerisAnim>

            <Scale appear from={ 0.6 }>
                <div>
                    { "<<<<  青岛乘正科技有限公司  >>>>" }
                </div>
            </Scale>
        </SerisAnim>
    )
}
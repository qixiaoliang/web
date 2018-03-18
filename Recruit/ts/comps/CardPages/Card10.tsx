import React from 'react';
import Card from '../Card';
//@ts-ignore
import zxns from '@src/zxns.png';

export default function () {
    return (
        <Card>
            <img src={ zxns } style={ {
                width: '70%'
            } } />

            <h2 style={ {
                flex: '1',
                marginTop: '36px',
                fontWeight: 200
            } }>青岛乘正科技2018第一波招聘</h2>

            <button style={ {
                width: '56vw',
                height: '16vw',
                borderRadius: '8vw',
                fontSize: '22px',
                border: '0',
                background: '#48c',
                color: '#afa',
                marginBottom: '36px'
            } }>
                查看更多
            </button>

        </Card>
    )
}
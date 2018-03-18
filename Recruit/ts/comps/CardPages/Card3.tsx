import React from 'react';
import { Scale } from '../Transitions';
import BorderedBox from '../BordedBox';
import Card from '../Card';

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
                width: '82vw'
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

export default () => {
    return (
        <Card>
            <Box title="[GIS工程师]" subTitle="[招聘人数: 2名]" />
            <Box title="[场景地形编辑]" subTitle="[招聘人数: 1名]" />
            <Box title="[产品经理]" subTitle="[招聘人数: 2名]" />
            <Box title="[测试工程师]" subTitle="[招聘人数: 4名]" />
            <Box title="[运维工程师]" subTitle="[招聘人数: 2名]" />
        </Card>
    )
}
import React from 'react';
import { Scale } from './Transitions';

export type Props = {
    timeout?: number,
    in?: boolean
} & React.AllHTMLAttributes<any>

const SkewBox: React.SFC<Props> = ( props ) => {
    let style: React.CSSProperties = {
        transform: 'skew(30deg)',
        display: 'flex',
        alignItems: 'stretch',
        minWidth: '60vw',
        ...props.style
    }

    return (
        <Scale
            in={ props.in }
            timeout={ props.timeout }>

            <div style={ style }>
                <div style={ {
                    width: '20px',
                    background: '#9cb'
                } }></div>

                <div style={ {
                    flex: '1',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 22px',
                    background: '#8a8',
                    fontSize: '16px',
                    color: 'white'
                } }>
                    <div style={ {
                        transform: 'skew(-30deg)',
                        textAlign: 'center',
                    } }>
                        { props.children }
                    </div>
                </div>
            </div>

        </Scale>
    )
}

SkewBox.defaultProps = {
    timeout: 300
}

export default SkewBox;
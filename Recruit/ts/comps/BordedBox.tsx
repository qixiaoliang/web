import React from 'react';

export type Props = {
    style?: React.CSSProperties,
}

const BorderBox: React.SFC<Props> = ( props ) => {
    let style: React.CSSProperties = {
        padding: '8px',
        border: '2px solid #ada9',
        boxSizing: 'content-box',
        ...props.style
    }

    return (
        <div style={ style }>
            <div style={ {
                background: '#cfc',
                color: 'black',
                padding: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box'
            } }>
                { props.children }
            </div>
        </div>
    )
}

export default BorderBox;
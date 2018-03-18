import React from 'react';

export type Props = {
    color?: string,
    size?: number
} & React.AllHTMLAttributes<any>

const Disk: React.SFC<Props> = ( props ) => {
    return (
        <div style={ {
            borderRadius: '50%',
            padding: '8px',
            height: props.size + 'px',
            width: props.size + 'px',
            boxSizing: 'border-box',
            border: '2px solid #9c8a',
            background: '#9c82',
            ...props.style
        } }>
            <div style={ {
                width: '100%',
                height: '100%',
                padding: '4px 8px 4px',
                boxSizing: 'border-box',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: props.color,
                color: 'black',
                fontSize: '14px',
                textAlign:'center'
            } }>
                { props.children }
            </div>
        </div>
    )
}

Disk.defaultProps = {
    color: '#eee',
    size: 62
}

export default Disk;
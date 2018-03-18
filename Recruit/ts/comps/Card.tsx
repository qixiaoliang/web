import React from 'react';
//@ts-ignore
import '@css/Card.scss';

function Card( props: React.AllHTMLAttributes<{}> ) {
    let style: React.CSSProperties = {
        width: window.screen.availWidth - 8 + 'px',
        height: '94vh'
    }

    return (
        <div className="card" style={ style }>
            { props.children }
        </div>
    )
}

export default Card;
import React from 'react';
export default class FanDiagram extends React.Component {
    constructor () {
        super( ...arguments );
        this.state = {
            hoverItem: -1
        };
    }
    render() {
        let { size, describes, ...restProps } = this.props;
        let { hoverItem } = this.state;
        const paddingTop = size / 15;
        const paddingLeft = describes.reduce( ( prev, cur, index ) => {
            if ( prev.describe.length > cur.describe.length )
                return prev;
            return cur;
        } ).describe.length * 12;
        let curDeg = 0;
        const center = {
            x: size / 2,
            y: size / 2
        };
        return ( <div style={ {
            position: 'relative'
        } } { ...restProps } onMouseMove={ ( e ) => {
            this.hoverTextElm.style.top =
                e.clientY + 12 + 'px';
            this.hoverTextElm.style.left =
                e.clientX + 12 + 'px';
        } }>
            <span style={ {
                display: hoverItem >= 0 ? 'block' : 'none',
                position: 'absolute',
                padding: '6px 12px',
                fontSize: '12px',
                borderRadius: '6px',
                background: 'green',
                color: 'white'
            } } ref={ r => {
                if ( r )
                    this.hoverTextElm = r;
            } }>
                { hoverItem >= 0 ? describes[ hoverItem ].describe : '' }
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={ size + 2 * paddingLeft } height={ size + paddingTop * 4 }>
                { describes.map( ( item, i ) => {
                    let deg = curDeg + Math.PI * 2 * item.percent / 100;
                    let r = i === hoverItem ? ( size / 2 + paddingTop ) : size / 2;
                    let curPoint = {
                        x: center.x + Math.cos( curDeg ) * r,
                        y: center.y - Math.sin( curDeg ) * r
                    };
                    let nextPoint = {
                        x: center.x + Math.cos( deg ) * r,
                        y: center.y - Math.sin( deg ) * r
                    };
                    let d = `M ${ center.x } ${ center.y } L ${ curPoint.x } ${ curPoint.y } ` +
                        `A ${ r } ${ r } 0 ${ deg - curDeg > Math.PI ? '1' : '0' } 0 ${ nextPoint.x } ${ nextPoint.y } ` +
                        `L ${ center.x } ${ center.y }`;
                    let lineStart = {
                        x: center.x + Math.cos( ( deg + curDeg ) / 2 ) * size / 2,
                        y: center.y - Math.sin( ( deg + curDeg ) / 2 ) * size / 2
                    };
                    let lineEnd = {
                        x: center.x + Math.cos( ( deg + curDeg ) / 2 ) * ( size / 2 + 1.5 * paddingTop ),
                        y: center.y - Math.sin( ( deg + curDeg ) / 2 ) * ( size / 2 + 1.5 * paddingTop )
                    };
                    let lineDeg = ( deg + curDeg ) / 4 / Math.PI * 360;
                    let isPositiveAsix = ( 0 <= lineDeg && lineDeg <= 90 ) || ( 270 <= lineDeg );
                    let hLine = isPositiveAsix ?
                        paddingTop * 2 : -paddingTop * 2;
                    curDeg = deg;
                    return ( <g transform={ `translate(${ paddingLeft },${ paddingTop * 2 })` } key={ i } onMouseOver={ () => {
                        this.setState( {
                            hoverItem: i
                        } );
                    } } onMouseOut={ () => {
                        this.setState( {
                            hoverItem: -1
                        } );
                    } }>
                        <text fontSize="14" fontWeight="500" textAnchor={ ( 0 <= lineDeg && lineDeg <= 90 ) || ( 270 <= lineDeg ) ?
                            'start' : 'end' } fill={ item.color } x={ lineEnd.x + hLine +
                                ( isPositiveAsix ? 4 : -4 ) } y={ lineEnd.y + 6 }>
                            { item.describe }
                        </text>
                        <path d={ `M ${ lineStart.x } ${ lineStart.y } ` +
                            `L ${ lineEnd.x } ${ lineEnd.y } ` +
                            `h ${ hLine }` +
                            `M ${ center.x } ${ center.y }` } fill="transparent" strokeWidth="2" stroke={ item.color } />
                        <path fill={ item.color } strokeWidth="0" d={ d } />
                    </g> );
                } ) }
            </svg>
        </div> );
    }
}
FanDiagram.defaultProps = {
    size: 200
};
//# sourceMappingURL=FanDiagram.jsx.map
import React from 'react';
import ReactDOM from 'react-dom';

export type Props = {
    children: React.ReactNode[],
    onSwitch?: ( value: number ) => void
} & React.AllHTMLAttributes<{}>;
type States = {
    curIndex: number,
    preIndex: number
}
class CardSwitcher extends React.Component<Props, States>{
    rootElm: HTMLDivElement = document.createElement( 'div' );
    curElm: HTMLDivElement = document.createElement( 'div' );
    oldElm: HTMLElement;
    moveDirection: 'down' | 'up' = 'down';
    preMovePoint: number = 0;
    isFirstMove: boolean = false;
    totalMoved: number = 0;
    state: States = {
        preIndex: 0,
        curIndex: 0
    }
    onTouchMove( e: React.TouchEvent<HTMLDivElement> ) {
        //e.preventDefault();
        if ( this.preMovePoint === 0 ) {
            this.preMovePoint = e.touches[ 0 ].pageY;
            this.isFirstMove = true;
            return;
        }
        else {
            let moveRange = e.touches[ 0 ].pageY - this.preMovePoint;
            this.totalMoved += moveRange;
            this.preMovePoint = e.touches[ 0 ].pageY;

            if ( this.isFirstMove ) {
                if ( moveRange > 0 ) {
                    this.isFirstMove = false;
                    this.moveDirection = 'down';
                    this.moveIndexPrevious()
                }
                if ( moveRange < 0 ) {
                    this.isFirstMove = false;
                    this.moveDirection = 'up';
                    this.moveIndexNext()
                }
            }

            if ( !this.curElm ) return;
            let height = this.curElm.clientHeight;
            if ( this.moveDirection === 'down' )
                height = -height;
            this.curElm.style.transform =
                'translateY(' + ( height + this.totalMoved ) + 'px)';
            this.curElm.style.transition = 'transform .1s ease';

            if ( !this.oldElm ) return;
            let opacity = Number(
                this.oldElm.style.opacity
            );
            this.oldElm.style.opacity =
                1 - Math.abs( this.totalMoved / this.oldElm.clientHeight ) + '';
            this.oldElm.style.transition = 'opacity .1s ease';
        }
    }
    moveIndexNext() {
        let { curIndex } = this.state;
        let preIndex = curIndex;
        curIndex = ( curIndex + 1 ) % this.props.children.length;

        this.setState( {
            preIndex, curIndex
        } )

        if ( this.props.onSwitch )
            this.props.onSwitch( curIndex );
    }
    moveIndexPrevious() {
        let { curIndex } = this.state;
        let preIndex = curIndex;
        if ( curIndex === 0 )
            curIndex = this.props.children.length;
        curIndex -= 1;

        this.setState( {
            preIndex, curIndex
        } )

        if ( this.props.onSwitch )
            this.props.onSwitch( curIndex );
    }
    getPosition( elm: HTMLElement ) {
        let style = getComputedStyle( elm );

        let marginLeft = Number(
            style.marginLeft.replace( 'px', '' )
        );
        if ( isNaN( marginLeft ) ) marginLeft = 0;

        let marginTop = Number(
            style.marginTop.replace( 'px', '' )
        );
        if ( isNaN( marginTop ) ) marginTop = 0;

        let borderLeftWidth = Number(
            style.borderLeftWidth.replace( 'px', '' )
        );
        if ( isNaN( borderLeftWidth ) ) borderLeftWidth = 0;

        let borderTopWidth = Number(
            style.borderTopWidth.replace( 'px', '' )
        );
        if ( isNaN( borderTopWidth ) ) borderTopWidth = 0;

        let left = elm.offsetLeft + marginLeft + borderLeftWidth;
        let top = elm.offsetTop + marginTop + borderTopWidth;

        while ( elm.offsetParent ) {
            elm = elm.offsetParent as HTMLElement;
            left += elm.offsetLeft;
            top += elm.offsetTop;
        }
        return { left, top };
    }
    switched() {
        this.isFirstMove = false;
        this.preMovePoint = this.totalMoved = 0;

        this.curElm.style.transition = 'transform 1s ease';
        this.curElm.style.transform = 'unset';

        this.oldElm.style.opacity = '0';
        this.oldElm.style.transition = 'opacity 1s ease';

        this.curElm.addEventListener( 'transitionend', () => {
            this.setState( {
                preIndex: this.state.curIndex
            } )
        }, { once: true } )
    }
    render() {
        let { children,onSwitch, style, ...restProps } = this.props;
        let { preIndex, curIndex } = this.state;
        let position = this.getPosition( this.rootElm );

        let preElmStyle: React.CSSProperties = {
            position: 'absolute',
            top: position.top + 'px',
            left: position.left + 'px',
            zIndex: -1,
            transform: 'unset',
            opacity: 1
        }
        let curElmStyle: React.CSSProperties =
            this.moveDirection === 'down' ? {
                transform: 'translateY(-100%)',
                zIndex: 200
            } : {
                    transform: 'translateY(100%)',
                    zIndex: 200
                }
        let isSwitch = curIndex !== preIndex;

        return (
            <div
                { ...restProps }
                style={ {
                    ...style,
                    touchAction: 'none',
                    overflow: 'hidden'
                } }
                ref={ r => { if ( r ) this.rootElm = r } }
                onTouchMove={ this.onTouchMove.bind( this ) }
                onTouchEnd={ this.switched.bind( this ) }
                onTouchCancel={ this.switched.bind( this ) }>
                {
                    children.map( ( item, i ) => {
                        if ( isSwitch ) {
                            if ( i === preIndex ) {
                                return (
                                    <div
                                        ref={ r => { if ( r ) this.oldElm = r } }
                                        key={ i }
                                        style={ preElmStyle }>
                                        { item }
                                    </div>
                                )
                            }
                            else if ( i === curIndex ) {
                                return (
                                    <div
                                        style={ curElmStyle }
                                        ref={ r => { if ( r ) this.curElm = r } }
                                        key={ i }>
                                        { item }
                                    </div>
                                )
                            }
                            else {
                                return null;
                            }
                        }
                        else {
                            return curIndex === i ? (
                                <div key={ i }>
                                    { item }
                                </div>
                            ) : null;
                        }
                    } )
                }
            </div>
        )
    }
}

export default CardSwitcher;
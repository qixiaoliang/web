import React from 'react';
import Paper from 'material-ui/Paper/Paper';
import Transition from 'react-transition-group/Transition';

export type States = {
    index: number,
    slideIn: boolean
}
export type Props = {
    children: React.ReactNode[],
    time?: number,
    className?: string
}
class Carousel extends React.Component<Props, States> {
    interval: NodeJS.Timer = null;
    touchMoved: number = 0;
    preTouchPoint: number = 0;
    childs: React.ReactNode[] = [];
    state = {
        index: 0,
        slideIn: true
    }

    componentDidMount() {
        this.interval = setInterval( () => {
            this.incrementIndex();
        }, this.props.time | 3500 );

        this.createChilds();
    }

    createChilds() {
        let style = {
            width: `${ 100 / this.props.children.length }%`
        }
        this.childs = this.props.children.map( ( n, i ) => {
            if ( React.isValidElement( n ) )
                return React.cloneElement(
                    n as React.ReactHTMLElement<HTMLElement>,
                    { style, key: i }
                );
            else
                return <div style={ style } key={ i }>{ n }</div>
        } )
    }

    shouldComponentUpdate?( nextProps: Props, nextState: States ) {
        if ( nextState.index !== this.state.index ) {
            this.setState( {
                slideIn: true
            } )
        }
        return true;
    }

    componentWillReceiveProps?( nextProps: Props ) {
        if ( nextProps.children !== this.props.children ) {
            this.createChilds();
        }
    }

    componentWillUnmount() {
        clearInterval( this.interval )
    }

    incrementIndex() {
        let index = this.state.index;
        if ( this.state.index >= ( this.props.children.length - 1 ) ) {
            index = -1;
        }
        this.setState( {
            index: index + 1
        } )
    }

    decrementIndex() {
        let index = this.state.index;
        if ( this.state.index === 0 ) {
            index = this.props.children.length
        }
        this.setState( {
            index: index - 1
        } )
    }

    onWheel( e: React.WheelEvent<HTMLDivElement> ) {
        e.preventDefault();
        if ( e.deltaY > 0 ) {
            this.incrementIndex()
        }
        else {
            this.decrementIndex()
        }
    }

    onClick( e: React.MouseEvent<{}> ) {
        let target = e.target as HTMLElement;

        if ( e.clientX > target.clientWidth / 2 ) {
            this.incrementIndex();
        }
        else {
            this.decrementIndex()
        }
    }
    onTouchMove( e: React.TouchEvent<HTMLDivElement> ) {
        //e.preventDefault();
        e.persist();
        let target = e.currentTarget as HTMLDivElement;
        let container = ( target.firstChild as HTMLDivElement );

        container.style.transition = 'unset';
        if ( e.touches.length > 1 ) {
            container.style.transition =
                'transform .3s ease-out';
            container.style.transform =
                `translateX(${ -this.state.index * 100 / this.childs.length }%)`;
            this.touchMoved = this.preTouchPoint = 0;
        }

        let touchs = e.touches;
        if ( this.preTouchPoint ) {
            this.touchMoved +=
                touchs[ 0 ].pageX - this.preTouchPoint;
        }
        this.preTouchPoint = touchs[ 0 ].pageX;

        target.addEventListener( 'touchend', () => {
            if ( this.touchMoved > 30 ) {
                this.decrementIndex()
            }
            else if ( this.touchMoved < -30 ) {
                this.incrementIndex()
            }
            else {
                container.style.transition =
                    'transform .3s ease-out';
                container.style.transform =
                    `translateX(${ -this.state.index * 100 / this.childs.length }%)`;
            }
            this.touchMoved = this.preTouchPoint = 0;
        }, { once: true } )

        let baseDistance =
            - this.state.index / this.childs.length * container.clientWidth;
        container.style.transform =
            `translateX(${ baseDistance + this.touchMoved }px)`;
    }
    render() {
        let { slideIn, index } = this.state;
        let baseStyle: React.CSSProperties = {
            height: '100%',
            width: `${ this.childs.length * 100 }%`,
            display: 'flex',
            flexWrap: 'nowrap',
            transform: `translateX(${ -index * 100 / this.childs.length }%)`,
            transition: 'transform .46s ease-out'
        }

        return (
            <div
                onClick={
                    this.onClick.bind( this )
                }
                onWheel={
                    this.onWheel.bind( this )
                }
                onTouchMove={
                    this.onTouchMove.bind( this )
                }
                style={ {
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    touchAction: 'none'
                } }>
                <div style={ baseStyle }>
                    { this.childs }
                </div>
            </div>
        )
    }
}

export default Carousel;
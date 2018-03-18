import React, { isValidElement, cloneElement, ReactElement } from 'react';
import TransitionGroup, { TransitionGroupProps } from 'react-transition-group/TransitionGroup';
import { Scale } from './Transitions';

export type Props = React.HTMLProps<{}> & {
    children: React.ReactNode[],
    component?: string | React.ReactType,
    in?: boolean,
    timeout?: number
}

type States = {
    index: number
}
class SerisAnim extends React.Component<Props, States>{
    static defaultProps = {
        component: 'div',
        timeout: 300
    }
    state: States = {
        index: 0
    }
    nodes: React.ReactNode[] = []
    constructor( props: Props ) {
        super( props );

        this.nodes = this.props.children.map( ( c, k ) => {
            return this.cloneElement( c, {
                key: k,
                style: {
                    visibility: 'hidden'
                }
            } )
        } )

        if ( this.props.in )
            this.delay();
    }
componentWillUpdate ? () {
    if ( this.props.in )
        this.delay();
}
    cloneElement( element: React.ReactNode, props: { style?: Object, [ key: string ]: any } ) {
    if ( React.isValidElement( element ) ) {
        let style = ( element as ReactElement<any> ).props.style || {};
        let { style: propStyle, ...otherProps } = props;

        return React.cloneElement( ( element as React.ReactElement<{ style: Object }> ), {
            style: Object.assign( propStyle, style ),
            ...otherProps
        } )
    }
    return element;
}
delay() {
    let { index } = this.state;
    let { children } = this.props;

    if ( index >= children.length ) return;
    let child = children[ index ] as React.ReactElement<{ timeout: number }>;
    let timeout = child.props.timeout || this.props.timeout;
    this.nodes[ index ] = this.cloneElement( child, {
        in: true,
        key: index,
        style: {
            visibility: 'visible'
        }
    } )

    setTimeout( () => {
        this.setState( {
            index: index + 1
        } )
    }, timeout );
}

render() {
    let {
        [ 'in' ]: In,
        children,
        component: Comp,
        timeout,
        ...restProps } = this.props;
    let { index } = this.state;

    return (
        <Comp { ...restProps }>
            { this.nodes }
        </Comp>
    )
}
}

export default SerisAnim;
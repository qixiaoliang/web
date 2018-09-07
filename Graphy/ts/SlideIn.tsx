import React from 'react';
import { Transition } from 'react-transition-group';

export type PropType = {
    in: boolean
} & React.AllHTMLAttributes<any>;

export default class SlideIn extends React.Component<PropType>{
    height = '';
    onEnter( node: HTMLElement ) {
        this.height = node.style.height;
        node.style.height = '0';
    }
    onEntering( node: HTMLElement ) {
        node.style.height = this.height;
    }
    render() {
        let { in: In, style, children, ...otherProps } = this.props;
        const duration = 200;
        const styles: { [ k: string ]: React.CSSProperties } = {
            entering: {
                display: 'block',
                opacity: 1
            },
            entered: {
                height: 'auto',
                display: 'block',
                opacity: 1
            },
            exiting: {
                height: 'auto',
                display: 'block',
                opacity: 1
            },
            exited: {
                height: '0',
                display: 'none',
                opacity: 0.7
            }
        }

        return (
            <Transition
                in={ In }
                timeout={ duration }
                mountOnEnter
                onEnter={ this.onEnter.bind( this ) }
                onEntering={ this.onEntering.bind( this ) }
            >
                { ( state: string ) => (
                    <div
                        { ...otherProps }
                        style={ {
                            transition: `height ${ duration }ms ease-in-out,opacity ${ duration } ease-in-out`,
                            overflow: 'hidden',
                            opacity: 0.7,
                            ...style,
                            ...styles[ state ]
                        } }>
                        { children }
                    </div>
                ) }
            </Transition>
        )
    }
}
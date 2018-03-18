import React from 'react';
import Transition, { TransitionProps } from 'react-transition-group/Transition';

export type AppearProps = Partial<TransitionProps> & {
    key?: any,
    children: React.ReactNode,
    from?: number,
    to?: number
}

const Scale: React.StatelessComponent<AppearProps> = ( props: AppearProps ) => {
    let { timeout, children, from, to, ...restProps } = props;

    let style: { [ key: string ]: React.CSSProperties } = {
        entered: {
            transform: 'none',
            opacity: 1
        }
    }

    return (
        <Transition
            onEntering={
                node => {
                    setTimeout( () => {
                        node.style.transform = `scale${ to }`;
                        node.style.opacity = '1';
                    }, 1 );
                }
            }
            exit={ false }
            timeout={ timeout }
            { ...restProps }>
            {
                ( state: string ) => {
                    return (
                        <div style={ {
                            transform: `scale(${ from })`,
                            opacity: 0,
                            transition: `all ${ props.timeout }ms linear`,
                            ...style[ state ]
                        } }>
                            { children }
                        </div>
                    )
                }
            }
        </Transition >
    )
}

Scale.defaultProps = {
    timeout: 300,
    from: 0.3,
    to: 1.0
}

export type SlideProps = Partial<TransitionProps> & {
    key?: any,
    children: React.ReactNode
}

class Slide extends React.Component<SlideProps>{
    static defaultProps = {
        timeout: 300
    }
    render() {
        let { timeout, children, ...restProps } = this.props;
        let style: { [ key: string ]: React.CSSProperties } = {
            entered: {
                opacity: 1,
                transform: 'none'
            }
        }
        return (
            <Transition
                timeout={ timeout }
                { ...restProps }
                exit={ false }
                onEntering={
                    node => {
                        setTimeout( () => {
                            node.style.opacity = '1';
                            node.style.transform = 'translateX(0)';
                        }, 1 );
                    }
                }>
                {
                    ( state: string ) => (
                        <div style={ {
                            opacity: 0.5,
                            transform: 'translateX(-100%)',
                            transition: `all ${ this.props.timeout }ms ease-out`,
                            ...style[ state ]
                        } }>
                            { this.props.children }
                        </div>
                    )
                }
            </Transition>
        )
    }
}

export type RotateProps = Partial<TransitionProps> & {
    children: React.ReactNode
}

const Rotate: React.SFC<RotateProps> = ( props ) => {
    let style: { [ key: string ]: React.CSSProperties } = {
        entered: {
            opacity: 1,
            transform: 'none'
        }
    }

    let { children, timeout, ...restProps } = props;

    return (
        <Transition
            timeout={ timeout }
            { ...restProps }
            exit={ false }
            onEntering={
                node => {
                    setTimeout( () => {
                        node.style.opacity = '1';
                        node.style.transform = 'rotate(0deg)'
                    }, 1 );
                }
            }>
            {
                ( state: string ) => (
                    <div style={ {
                        opacity: 0.5,
                        transform: 'rotate(90deg)',
                        transition: `all ${ timeout }ms linear`,
                        ...style[ state ]
                    } }>
                        { children }
                    </div>
                )
            }
        </Transition>
    )
}

Rotate.defaultProps = {
    timeout: 300
}

export { Scale, Slide, Rotate };
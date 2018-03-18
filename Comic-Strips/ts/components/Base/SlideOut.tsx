import React from 'react';
import Transition from 'react-transition-group/Transition';

export type Props = {
    duration: number;
    in: boolean;
    component?: string | React.ComponentType
}

const SlideOut: React.StatelessComponent<Props> = ( props ) => {

    let transitionStyles: {
        [ key: string ]: React.CSSProperties
    } = {
            entering: {
                transition: `width ${ props.duration }ms ease-in opacity ${ props.duration }ms ease-in`,
                width: '0px',
                opacity: 0
            },
            entered: {
                display: 'none'
            },
            exiting: {
                opacity: 1,
                display: 'block',
                width: 'auto',
                transition: `width,opacity ${ props.duration }ms ease-in`,
            },
            exited: {
            }
        }

    let Root = props.component;

    return (
        <Transition timeout={ props.duration } in={ props.in }>
            {
                ( state: string ) => {
                    if ( React.isValidElement( props.children ) )
                        return React.cloneElement( props.children as React.ReactElement<any>, {
                            style: {
                                ...transitionStyles
                            }
                        } )
                    else
                        return <Root>
                            { props.children }
                        </Root>
                }
            }
        </Transition>
    )
}

SlideOut.defaultProps = {
    component: 'span'
}

export default SlideOut;
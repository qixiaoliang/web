import React from 'react';
import SerisAnim from './SeriesAnim';
import Transition from 'react-transition-group/Transition';
import { Scale } from './Transitions';

//@ts-ignore
import zhao from '@src/zhao.png';
//@ts-ignore
import xian from '@src/xian.png';
//@ts-ignore
import na from '@src/na.png';
//@ts-ignore
import shi from '@src/shi.png';
//@ts-ignore
import yi from '@src/yi.png';

function Na( props: { [ key: string ]: any, in?: boolean } ) {
    const timeout = 300;

    return (
        <Transition timeout={ timeout } { ...props }>
            {
                ( state: string ) => {
                    let style: React.CSSProperties = {
                        transition: `top ${ timeout }ms ease ${ timeout }ms`,
                        visibility: state === 'entered' ? 'visible' : 'hidden',
                        position: 'relative',
                        top: state === 'entered' ? '0' : '50px',
                        marginBottom: '8px'
                    }

                    return (
                        <Scale appear in={ props.in }>
                            <div style={ {
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            } }>
                                <img src={ yi } style={ style } />
                                <img src={ na } />
                            </div>
                        </Scale>
                    )
                }
            }
        </Transition>
    )
}

export type Props = {
    in?: boolean,
    timeout?: number
} & React.AllHTMLAttributes<any>

const Zxns: React.SFC<Props> = ( props ) => {
    return (
        <SerisAnim
            in={ props.in }
            style={ {
                display: 'flex',
                justifyContent: 'flex-start',
                minHeight: '82px'
            } }>
            <Scale key={ 0 } timeout={100}>
                <img src={ zhao } style={ {
                    marginTop: '26px'
                } } />
            </Scale>

            <Scale key={ 1 } from={ 1.5 } timeout={100}>
                <img src={ xian } />
            </Scale>

            <Na key={ 2 } />

            <Scale key={ 3 } from={ 1.5 } timeout={100}>
                <img src={ shi } />
            </Scale>

        </SerisAnim>
    )
}

Zxns.defaultProps = {
    timeout: 300
}

export default Zxns;
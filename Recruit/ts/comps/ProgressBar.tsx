import React from 'react';

export type Props = {
    maxSteps: number,
    step: number
}

const ProgressBar: React.StatelessComponent<Props> = ( props: Props ) => {
    let { step, maxSteps } = props;

    if ( step > maxSteps )
        throw new RangeError( 'step must less than maxSteps' );

    let progressBarStyle: React.CSSProperties = {
        width: step / maxSteps * 100 + '%',
        height: '6px',
        borderRadius: '3px',
        background: '#08a1ef',
        transition: 'width 1s ease',
        marginTop: '6px'
    }

    return (
        <div>
            <div style={ progressBarStyle }></div>
            <div style={ { textAlign: 'right' } }>
                { step + '/' + maxSteps }
            </div>
        </div>
    )
}

ProgressBar.defaultProps = {
    step: 0,
    maxSteps: 1
}

export default ProgressBar;

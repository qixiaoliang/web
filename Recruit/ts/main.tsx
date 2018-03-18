import React from 'react';
import ReactDOM from 'react-dom';
import Loadable, { LoadingComponentProps } from 'react-loadable';

//@ts-ignore
const Root: () => Promise<React.ComponentType> = () => import( './Root' )

const Loading: React.ComponentType<LoadingComponentProps> = ( props ) => {
    let content = null;
    if ( props.isLoading || !props.pastDelay )
        content = (
            <span style={ {
                fontSize: '126px',
                transform: 'rotate(90deg)',
                marginTop: '-22%',
                color: 'white'
            } }>
                8
            </span>
        )

    if ( props.error )
        content = (
            <span style={ {
                fontSize: '58px',
                color: 'red',
                textAlign: 'center'
            } }>
                { 'Load Failed: ' + props.error }
            </span>
        )

    return (
        <div style={ {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        } }>
            { content }
        </div>
    )
}

const LoadableComp = Loadable( {
    loader: Root,
    loading: Loading,
    delay: 500
} );

ReactDOM.render(
    <LoadableComp />,
    document.getElementById( 'app' )
)
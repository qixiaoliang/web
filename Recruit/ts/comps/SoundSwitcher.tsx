import React from 'react';
import ReactDOM from 'react-dom';
//@ts-ignore
import musicIcon from '@src/music.png';
//@ts-ignore
import sound from '@src/sound.mp3';

type States = {
    play: boolean
}
class SoundSwitcher extends React.Component<{}, States> {
    audio: HTMLAudioElement;
    state = {
        play: false
    }

    componentDidMount?() {

    }

    render() {
        let { play } = this.state;

        if ( play && this.audio )
            this.audio.play();
        if ( !play && this.audio )
            this.audio.pause()

        let style: React.CSSProperties = {
            width: '32px',
            height: '32px',
            padding: '6px',
            border: 'solid 2px white',
            borderRadius: '50%',
            animation: play ? 'rotate infinite 1.2s' : 'none',
            position: 'absolute',
            top: '26px',
            right: '20px',
            zIndex: 300
        }

        return ReactDOM.createPortal( (
            <div
                style={ style }
                onClick={
                    () => {
                        this.setState( ( preState ) => {
                            return {
                                play: !preState.play
                            }
                        } )
                    }
                }>
                <img src={ musicIcon }
                    style={ {
                        opacity: 0.8,
                        width: '32px',
                        height: '32px'
                    } } />
                <audio
                    ref={ r => { if ( r ) this.audio = r } }
                    src={ sound }
                    style={ { display: 'none' } }></audio>
            </div>
        ), document.getElementById( 'soundSwitcher' ) );
    }
}

export default SoundSwitcher;
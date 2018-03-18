import React from 'react';
import ReactDOM from 'react-dom';

import {Paper} from 'material-ui';
import {ClickAwayListener} from "material-ui";
import {Grow} from "material-ui";

export type Props = {
    children: React.ReactNode,
    open: boolean,
    onClose?: () => void;
    anchorEl: HTMLElement
}

export type States = {

}

class PopUp extends React.Component<Props, States>{
    calcPosition( elm: HTMLElement ) {
        let left = 0, top = 0;
        let _elm = elm;

        do {
            left += _elm.offsetLeft
            top += _elm.offsetTop;
        } while ( _elm = _elm.offsetParent as HTMLElement );

        return {
            x: left,
            y: top,
            width: elm.clientWidth,
            height: elm.clientHeight
        }
    }

    render() {
        if ( !this.props.anchorEl )
            return null;

        let rect = this.calcPosition(
            this.props.anchorEl
        )

        let paddingTop = 6;
        let styles: React.CSSProperties = {
            width: rect.width + 'px',
            position: 'absolute',
            top: rect.y + rect.height + paddingTop + 'px',
            left: rect.x + 'px',
            transition: 'height 1000ms ease-in'
        }

        if ( !this.props.open )
            return null;
        else
            return (
                ReactDOM.createPortal(
                    <ClickAwayListener
                        onClickAway={
                            ( e ) => {
                                let target = e.target as HTMLElement;
                                if ( this.props.anchorEl.contains( target ) )
                                    return;

                                if ( this.props.onClose )
                                    this.props.onClose();
                            }
                        }>

                        <Grow in={ this.props.open }>
                            <Paper style={ styles }>
                                { this.props.children }
                            </Paper>
                        </Grow>

                    </ClickAwayListener>,
                    document.body )
            )
    }
}

export default PopUp;
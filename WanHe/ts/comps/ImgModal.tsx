import React from 'react';
import ReactDOM from 'react-dom';
import  withStyles ,{StyleRulesCallback,WithStyles} from 'material-ui/styles/withStyles';
import Modal from 'material-ui/Modal';

export type ClassKey = 'modal'|'img';
const styles: StyleRulesCallback<ClassKey> = theme => {
    return {
        modal: {
            width: '100%',
            height: '100%',
            boxSizing: 'content-box',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#0006'
        },
        img: {
            [ theme.breakpoints.up( 'sm' ) ]: {
                maxWidth: '80%',
            },
            [ theme.breakpoints.down( 'md' ) ]: {
                maxWidth: '92%',
            },
            maxHeight: '80%'
        }
    }
}

export type Props = {
    imgSrc: string;
}
class imgModal extends React.Component<Props & WithStyles<ClassKey>>{

    destory() {
        ReactDOM.unmountComponentAtNode(
            document.getElementById( 'modal' )
        );
    }
    render() {
        let { classes } = this.props;
        return ReactDOM.createPortal(
            <Modal
                onBackdropClick={
                    this.destory
                }
                onEscapeKeyDown={
                    this.destory
                }
                open={ true }
                className={ classes.modal }>
                <img src={ this.props.imgSrc } className={ classes.img } />
            </Modal>,
            document.getElementById( 'modal' )
        )
    }
}

let ImgModal = withStyles<ClassKey>( styles )<Props>( imgModal );

export default function ( props: Props ) {
    ReactDOM.render(
        <ImgModal { ...props } />,
        document.getElementById( 'modal' )
    )
}


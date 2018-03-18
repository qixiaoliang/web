import React from 'react';
import ReactDOM from 'react-dom';

import { withStyles } from 'material-ui';
import * as WithStyle from 'material-ui/styles';
import { Input } from 'material-ui'
import { IconButton } from 'material-ui';
import { InputProps } from "material-ui/Input";
import { MenuItem, MenuList } from "material-ui";

import PopUp from '../Base/PopUp';

import Clear from 'material-ui-icons/Clear';
import Search from 'material-ui-icons/Search';

const styles: WithStyle.StyleRulesCallback = theme => {
    return {
        Input: {
            color: 'inherit',
            boxsizing: 'border-box'
        },
        root: {
            borderColor: '#ccca',
            borderRadius: 6,
            borderWidth: 1,
            borderStyle: 'solid',
            '&:hover': {
                background: '#fff2'
            },
            alignItems: 'center',
            padding: '4px 8px'
        },
        noUnderLine: {
            '&:before': {
                display: 'none'
            },
            '&:after': {
                display: 'none'
            }
        },
        focused: {
            borderWidth: 2,
            borderColor: 'inherit',
            background: '#fff5'
        },
        iconButton: {
            width: 'auto',
            height: 'auto'
        },
        input: {
            paddingLeft: 6,
            paddingRight: 6
        }
    }

}

export type Props = {
    width?: string;
    styles?: React.CSSProperties,
    onClose?: () => void,
    suggestionList?: any[]
} & InputProps;

export type States = {
    open: boolean,
    anchorEl: HTMLElement
}

class SearchBox extends React.Component<Props & WithStyle.WithStyles, States> {
    state = {
        open: true,
        //@ts-ignore
        anchorEl: null
    }

    componentDidMount() {
        setTimeout( () => {
            this.forceUpdate()
        }, 800 );
    }

    render(): React.ReactNode {
        let { width, suggestionList, classes, styles, onClose, children, ...restProp } = this.props;

        return (
            <>
                <Input
                    inputRef={ r => {
                        if ( r ) this.setState( {
                            anchorEl: r
                        } )
                    } }
                    { ...restProp }
                    className={ classes.Input }
                    style={ { width: width, ...styles } }
                    fullWidth
                    color="inherit"
                    classes={ {
                        root: classes.root,
                        inkbar: classes.noUnderLine,
                        focused: classes.noUnderLine + ' ' + classes.focused,
                        input: classes.input
                    } }
                    startAdornment={
                        <IconButton
                            color="inherit"
                            className={ classes.iconButton }
                            onClick={
                                () => {
                                    if ( this.props.onClose )
                                        this.props.onClose()
                                }
                            }>
                            <Clear color="inherit" style={ { opacity: 0.6 } } />
                        </IconButton>
                    }
                    endAdornment={
                        <IconButton color="inherit" className={ classes.iconButton }>
                            <Search color="inherit" />
                        </IconButton>
                    }
                />

                <PopUp open={ this.state.open }
                    anchorEl={
                        this.state.anchorEl ?
                            this.state.anchorEl.offsetParent :
                            null
                    }
                    onClose={
                        () => {
                            this.setState( {
                                open: false
                            } )
                        }
                    }>
                    <MenuList>
                        { suggestionList ?
                            suggestionList.map( ( item, i ) => {
                                return <MenuItem key={ i }>{ item }</MenuItem>
                            } )
                            : null }
                    </MenuList>
                </PopUp>
            </>
        )
    }
}

export default withStyles( styles )<Props>( SearchBox );
import React from 'react';
import * as ReactRedux from 'react-redux';

import { State as StoreState, ActionTypes } from '../../model/store';
import { ajaxAuthJson } from "../../util/ajax";;
import { mapDispatchToProps, StoreDispatch } from "../../util/react-redux-util";

import { Typography } from 'material-ui';
import { IconButton } from 'material-ui';
import { Avatar } from 'material-ui';
import { Tooltip } from 'material-ui';
import { withStyles } from 'material-ui';
import * as WithWidth from 'material-ui/utils/withWidth';
import * as WithStyle from 'material-ui/styles/withStyles';
import { Hidden } from 'material-ui';

import Search from 'material-ui-icons/Search';
import Edit from 'material-ui-icons/Edit';
import { withWidth } from 'material-ui';

import SlideOut from '../Base/SlideOut';
import SearchBox from './SearchBox';
import Transition from 'react-transition-group/Transition';

let styles: WithStyle.StyleRulesCallback = theme => {
    return {
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#56f',
            color: 'white',
            padding: '12px 14px'
        },
        right: {
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center'
        },
        avatar: {
            transform: 'scale(0.65)'
        }
    }
}

export type Props = {
    name: string,
    icon: string,
    signed: boolean,
    storeDispatch: StoreDispatch
}

export type States = {
    mobileSearchBoxShow: boolean
}

class Title extends React.Component<Props & WithWidth.WithWidthProps & WithStyle.WithStyles, States>{
    state = {
        mobileSearchBoxShow: false
    }

    signAvatarClick() {
        if ( this.props.signed ) {

        }
        else {
            ajaxAuthJson(
                '/api/privateUserInfo'
            ).then( info => {
                if ( info )
                    this.props.storeDispatch(
                        ActionTypes.User, { ...info, signed: true }
                    )
            } ).catch();
        }
    }

    render() {
        let { name, icon, classes } = this.props;
        let duration = 1200;
        let { mobileSearchBoxShow } = this.state;

        let transitionDefaultStyle = {
            width: '100%',
            opacity: 0
        }

        let transiitionStyles: { [ key: string ]: React.CSSProperties } = {
            entering: {
                opacity: 1,
                width: 22,
                borderRadius: '50%',
                transition: `opacity,width ${ duration }ms ease-in`,
            },
            entered: {
                opacity: 1,
                width: '100%',
            },
            exiting: {
                opacity: 0,
                width: 22,
                borderRadius: '50%',
                transition: 'width,opacity ${duration} ease-in'
            },
            exited: {
            }
        }

        return (
            <div className={ classes.root }>
                <SlideOut duration={ duration } in={ mobileSearchBoxShow }>
                    <Typography type="title" color="inherit">
                        Comic Strips
                    </Typography>
                </SlideOut>

                <div className={ classes.right }>

                    <Hidden smUp>
                        {
                            mobileSearchBoxShow ?
                                (
                                    <Transition
                                        mountOnEnter
                                        unmountOnExit
                                        in={ mobileSearchBoxShow }
                                        timeout={ duration }>
                                        {
                                            ( state: string ) => {
                                                return (
                                                    <SearchBox
                                                        styles={ {
                                                            ...transitionDefaultStyle,
                                                            ...transiitionStyles[ state ]
                                                        } }
                                                        onClose={
                                                            () => this.setState( {
                                                                mobileSearchBoxShow: false
                                                            } )
                                                        } />
                                                )
                                            }
                                        }
                                    </Transition>
                                ) :
                                (
                                    <Tooltip title="搜索" placement="top">
                                        <IconButton
                                            color="inherit"
                                            onClick={
                                                () => this.setState( {
                                                    mobileSearchBoxShow: true
                                                } )
                                            }>
                                            <Search color="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                )
                        }
                    </Hidden>

                    <Hidden xsDown>
                        <SearchBox
                            width="50%"
                            styles={ { marginRight: 10 } } />
                    </Hidden>

                    <SlideOut duration={ duration } in={ mobileSearchBoxShow }>
                        <Tooltip title="写文章">
                            <IconButton color="inherit">
                                <Edit color="inherit" />
                            </IconButton>
                        </Tooltip>
                    </SlideOut>

                    <SlideOut duration={ duration } in={ mobileSearchBoxShow }>
                        <Tooltip title={ name }>
                            <IconButton
                                onClick={
                                    this.signAvatarClick.bind( this )
                                }
                                color="inherit">
                                <Avatar
                                    className={ classes.avatar }
                                    src={
                                        window.serverAddress + '/src/' + icon
                                    } />
                            </IconButton>
                        </Tooltip>
                    </SlideOut>
                </div >
            </div >
        )
    }
}

export default ReactRedux.connect(
    ( state: StoreState ) => {
        return {
            name: state.user.name,
            icon: state.user.icon,
            signed: state.user.signed
        }
    },
    mapDispatchToProps
)( withStyles( styles )<Props & Partial<WithWidth.WithWidthProps>>(
    withWidth()<Props & WithStyle.WithStyles>( Title )
) );


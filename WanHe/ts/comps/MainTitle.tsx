import React from 'react';

import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import Drawer from 'material-ui/Drawer';
import { lime, pink, lightGreen } from 'material-ui/colors';
import { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';

import ArrowBack from 'material-ui-icons/ArrowBack'
import Menu from 'material-ui-icons/Menu'

const appBarHeight = '52px', appBarWidth = '100vw';
export type ClassKey = 'appBar' | 'menuItems';
const styles: StyleRulesCallback<ClassKey> = theme => {
    return {
        appBar: {
            width: appBarWidth,
            height: appBarHeight,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 6px',
            alignItems: 'center',
            borderBottom: `1px solid ${ lightGreen[ 600 ] }`
        },
        menuItems: {
            marginTop: '16px',
            padding: '0 12px'
        }
    }
}

export type Props = {
    title?: string,
    onBack?: () => void
}

type States = {
    open: boolean
}

class MainTitle extends React.Component<Props & WithStyles<ClassKey>, States>{
    static defaultProps = {
        title: '万和装饰'
    }
    state = {
        open: false,
    }
    onClick( e: React.MouseEvent<HTMLElement> ) {
        this.setState( ( preState ) => {
            return {
                open: !preState.open
            }
        } )
    }
    render() {
        let { classes } = this.props;
        let { open } = this.state;

        const appbarItems = [
            ( <Typography
                key={ 0 }
                type="headline">
                { this.props.title }
            </Typography> ),

            ( <IconButton
                key={ 1 }
                onClick={
                    this.onClick.bind( this )
                }>
                <Menu />
            </IconButton> )
        ]

        return (
            <div>
                <div style={ { height: appBarHeight + 'px' } }></div>

                <div
                    style={ {
                        position: 'fixed',
                        background: lime[ 50 ]
                    } }
                    className={ classes.appBar }>
                    <IconButton onClick={ this.props.onBack }>
                        <ArrowBack />
                    </IconButton>
                    { ...appbarItems }

                    <Drawer
                        anchor="right"
                        open={ open }>
                        <div
                            style={ {
                                background: pink[ 50 ]
                            } }
                            className={ classes.appBar }>
                            <span style={ { width: '48px' } }></span>
                            { ...appbarItems }
                        </div>

                        <div className={ classes.menuItems }>
                            <Link to="/" style={ { textDecoration: 'none' } }>
                                <MenuItem
                                    onClick={ this.onClick.bind( this ) }>
                                    首页
                            </MenuItem>
                            </Link>

                            <Link to="/about" style={ { textDecoration: 'none' } }>
                                <MenuItem
                                    onClick={ this.onClick.bind( this ) }>
                                    关于我们
                            </MenuItem>
                            </Link>

                            <Link to="/products" style={ { textDecoration: 'none' } }>
                                <MenuItem
                                    onClick={ this.onClick.bind( this ) }>
                                    所有商品
                            </MenuItem>
                            </Link>

                            <Link to="/instances" style={ { textDecoration: 'none' } }>
                                <MenuItem
                                    onClick={ this.onClick.bind( this ) }>
                                    装修案例
                            </MenuItem>
                            </Link>
                        </div>
                    </Drawer>
                </div >
            </div>
        )
    }
}

export default withStyles<ClassKey>( styles )<Props>( MainTitle );
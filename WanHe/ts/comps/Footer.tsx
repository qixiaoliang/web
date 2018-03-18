import React from 'react';

import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';
import { lime } from 'material-ui/colors';

//@ts-ignore
import github from '@src/github.png';
//@ts-ignore
import wanhe from '@src/wanhe.jpg';

export type ClassKey =
    'root'
    | 'brandImg'
    | 'brandTitle'
    | 'date'
    | 'githubImg'
    | 'githubTitle'
    | 'brandBox'
    | 'githubBox';

const styles: StyleRulesCallback<ClassKey> = theme => {
    let color = lime[ 900 ];

    return {
        root: {
            marginTop: 46,
            marginBottom: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        brandBox: {
            display: 'flex',
            alignItems: 'center',
            margin: '0 0 26px 0'
        },
        brandTitle: {
            marginLeft: 22,
            borderBottom: '8px double lightgreen',
            fontSize: 28,
            padding: '8px 0',
            color
        },
        brandImg: {
            height: 48,
            width: 48
        },
        date: {
            marginBottom: 8,
            color
        },
        githubBox: {
            display: 'flex',
            alignItems: 'center'
        },
        githubImg: {
            height: 32,
            width: 32
        },
        githubTitle: {
            marginLeft: 18,
            fontSize: 22,
            color,
            textDecoration: 'none'
        }
    }
}

export type Props = {

}

function Footer( props: Props & WithStyles<ClassKey> ) {
    let { classes } = props;

    return (
        <div className={ classes.root }>
            <div className={ classes.brandBox }>
                <img src={ wanhe } className={ classes.brandImg } alt="" />
                <Typography className={ classes.brandTitle } type="title">
                    万和装饰
                </Typography>
            </div>

            <Typography className={ classes.date } type="caption">
                Design By 哓哓 2018-02-26
            </Typography>

            <div className={ classes.githubBox }>
                <img src={ github } className={ classes.githubImg } alt="" />
                <a href="">
                    <Typography className={ classes.githubTitle }>
                        GITHUB
                    </Typography>
                </a>
            </div>
        </div>
    )
}

export default withStyles<ClassKey>( styles )<Props>( Footer );
import React from 'react';
//@ts-ignore
import bannerImg from '@src/banner.jpg'

import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography'
import { red, green, lightGreen } from 'material-ui/colors';

export type ClassKey =
    'root' | 'img'
    | 't_box'
    | 't1'
    | 't2'
    | 't3'
    | 'new_word';
const styles: StyleRulesCallback<ClassKey> = theme => {
    return {
        root: {
            width: '100vw',
            height: '120vw'
        },
        img: {
            width: '100%',
            height: '100%',
            display: 'block'
        },
        t_box: {
            width: '100%',
            height: '100%',
            textAlign: 'center',
            verticalAlign: 'middle',
            marginTop: '-100%'
        },
        t1: {
            fontFamily: 'sans-serif',
            color: red[ 600 ]
        },
        t2: {
            marginTop: '10mm',
            color: lightGreen[ 800 ]
        },
        t3: {
            marginTop: '8mm',
            verticalAlign: 'middle',
            color: lightGreen[ 800 ]
        },
        new_word: {
            fontSize: 36,
            color: red[ 600 ],
            margin: 8,
            textShadow: `4px 4px ${ green[ 600 ] },-4px -4px ${ green[ 600 ] }`
        }
    }
}

export type Props = {

}

function BannerPic( props: Props & WithStyles<ClassKey> ) {
    let { classes } = props;

    return (
        <div className={ classes.root }>
            <img src={ bannerImg } alt="" className={ classes.img } />
            <div className={ classes.t_box }>
                <Typography
                    type="display2"
                    className={ classes.t1 }>
                    万和装饰
                </Typography>

                <Typography
                    type="display1"
                    className={ classes.t2 }>
                    诚信经营 用心服务
                </Typography>

                <Typography
                    type="headline"
                    className={ classes.t3 }>
                    <span>
                        给您一个焕然一
                    </span>
                    <span className={ classes.new_word }>新</span>
                    <span>的家</span>
                </Typography>
            </div>
        </div>
    )
}

export default withStyles<ClassKey>( styles )<Props>( BannerPic );
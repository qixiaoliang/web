import React from 'react';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import { lime, lightGreen } from 'material-ui/colors'

//@ts-ignore
import dulux_painter from '@src/dulux-paint.jpg';
//@ts-ignore
import door from '@src/door.png';
//@ts-ignore
import dulux_polyfill from '@src/dulux-polyfill.jpg';
//@ts-ignore
import sheetrock from '@src/sheetrock.jpg';
//@ts-ignore
import plasterboard from '@src/plasterboard.jpg'
//@ts-ignore
import wire from '@src/wire.jpg';
//@ts-ignore
import wood from '@src/wood.jpg';
//@ts-ignore
import light from '@src/light.jpg';

export type ClassKey =
    'root'
    | 'labelIcon'
    | 'label'
    | 'icon'
    | 'labelIconContainer'
    | 'paddingContainer'
    | 'title'
    | 'btn'
    | 'img';

const styles: StyleRulesCallback<ClassKey> = theme => {
    return {
        root: {
            width: '100vw',
            textAlign: 'left',
            margin: '16px 0'
        },
        labelIcon: {
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            margin: '12px 0',
            width: '25%'
        },
        label: {
            color: lightGreen[ 900 ]
        },
        icon: {
            width: 36,
            height: 36,
            marginBottom: 8,
            borderRadius: '25%'
        },
        labelIconContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: 16

        },
        paddingContainer: {
            padding: '0 16px',
            textAlign: 'center',
            marginTop: 16
        },
        title: {
            margin: 16,
        },
        btn: {
            marginTop: 22
        },
        img: {
            width: '100vw',
            margin: '8px 0'
        }
    }
}

export type Props = {

}

function Goods( props: Props & WithStyles<ClassKey> ) {
    let { classes } = props;

    function LabelIcon( props: { icon: React.ReactNode, label: string } ) {
        return (
            <div className={ classes.labelIcon }>
                { props.icon }
                <Typography
                    className={ classes.label }
                    type="body1">
                    { props.label }
                </Typography>
            </div>
        )
    }

    return (
        <div className={ classes.root }>
            <Typography
                className={ classes.title }
                type="headline">
                精选原材料
            </Typography>

            <img src={ sheetrock } alt="" className={ classes.img } />
            <img src={ dulux_painter } alt="" className={ classes.img } />

            <div className={ classes.paddingContainer }>
                <Typography type="title">
                    在售商品
                </Typography>

                <div className={ classes.labelIconContainer }>
                    <LabelIcon
                        icon={
                            <img
                                className={ classes.icon }
                                src={ sheetrock } alt="" />
                        }
                        label="石膏板" />
                    <LabelIcon
                        icon={
                            <img
                                className={ classes.icon }
                                src={ plasterboard } alt="" />
                        }
                        label="扣板" />
                    <LabelIcon
                        icon={
                            <img
                                className={ classes.icon }
                                src={ door } alt="" />
                        }
                        label="室内门" />
                    <LabelIcon
                        icon={
                            <img
                                className={ classes.icon }
                                src={ dulux_polyfill } alt="" />
                        }
                        label="腻子" />
                    <LabelIcon
                        icon={
                            <img
                                className={ classes.icon }
                                src={ dulux_painter } alt="" />
                        }
                        label="内墙漆" />
                    <LabelIcon
                        icon={
                            <img
                                className={ classes.icon }
                                src={ wire } alt="" />
                        }
                        label="电线" />
                    <LabelIcon
                        icon={
                            <img
                                className={ classes.icon }
                                src={ light } alt="" />
                        }
                        label="灯饰" />
                    <LabelIcon
                        icon={
                            <img
                                className={ classes.icon }
                                src={ wood } alt="" />
                        }
                        label="龙骨" />
                </div>

                <Button
                    className={ classes.btn }
                    color="primary"
                    raised
                    fullWidth>
                    所有商品
            </Button>
            </div>
        </div>
    )
}

export default withStyles<ClassKey>( styles )<Props>( Goods );
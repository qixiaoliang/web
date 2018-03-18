import React from 'react';

import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { lime, lightGreen } from 'material-ui/colors';

import Crop from 'material-ui-icons/Crop';
import CropDin from 'material-ui-icons/CropDin';
import CropPortrait from 'material-ui-icons/CropPortrait';
import HdrStrong from 'material-ui-icons/HdrStrong';

export type ClassKey =
    'root'
    | 'labelIcon'
    | 'label'
    | 'icon'
    | 'title'
    | 'btn'
    | 'labelIconContainer';

const styles: StyleRulesCallback<ClassKey> = theme => {
    return {
        root: {
            padding: 16,
            textAlign: 'center'
        },
        labelIcon: {
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            margin: '0 12px',
            width: '25%'
        },
        label: {
            color: lightGreen[ 900 ]
        },
        icon: {
            color: lime[ 700 ],
            fontSize: 48,
            marginBottom: 8
        },
        title: {
            marginTop: 12,
            marginBottom: 22
        },
        btn: {
            marginTop: 16
        },
        labelIconContainer: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-start'
        }
    }
}

export type Props = {

}

function MainProducts( props: Props & WithStyles<ClassKey> ) {
    let { classes } = props;

    function MainProducts( props: { icon: React.ReactNode, label: string } ) {
        return (
            <div className={ classes.labelIcon }>
                <span>
                    { props.icon }
                </span>
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
            <Typography className={ classes.title } type="title">
                主营范围
            </Typography>

            <div className={ classes.labelIconContainer }>
                <MainProducts
                    icon={ <Crop className={ classes.icon } /> }
                    label="石膏顶" />
                <MainProducts
                    icon={ <CropDin className={ classes.icon } /> }
                    label="扣板顶" />
                <MainProducts
                    icon={ <CropPortrait className={ classes.icon } /> }
                    label="室内门柜子" />
                <MainProducts
                    icon={ <HdrStrong className={ classes.icon } /> }
                    label="各种装修材料" />
            </div>

            <Button
                raised
                fullWidth
                color="primary"
                className={ classes.btn }>
                更多关于我们
            </Button>
        </div>
    )
}

export default withStyles<ClassKey>( styles )<Props>( MainProducts );    
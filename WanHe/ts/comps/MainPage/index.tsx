import React from 'react';
import BannerPic from './BannerPic';
import CalcAmount from './CalcAmount';
import ImgGroups from './ImgGroups';
import MainProducts from './MainProducts';
import Goods from './Goods';

import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';

export type ClassKey = 'root';
const styles: StyleRulesCallback<ClassKey> = theme => {
    return {
        root: {

        }
    }
}

export type Props = {

}

function MainPage( props: Props & WithStyles<ClassKey> ) {
    return (
        <div>
            <BannerPic />
            <CalcAmount />
            <ImgGroups />
            <MainProducts />
            <Goods />
        </div>
    )
}

export default withStyles<ClassKey>( styles )<Props>( MainPage );   
import React from 'react';
import Carousel from '../Carousel';

import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';

export type ClassKey =
    'root'
    | 'carousel'
    | 'recommendImg';

const styles: StyleRulesCallback<ClassKey> = theme => {
    return {
        root: {

        },
        carousel: {

        },
        recommendImg: {

        }
    }
}

export type Props = {

}

function InstancePage( props: Props & WithStyles<ClassKey> ) {
    let { classes } = props;
    let recommentImgs = window.imgFiles.find( files => files.dirName === "推荐" );
    let anotherImgs = window.imgFiles.filter( files => files.dirName !== "推荐" );

    return (
        <div>
            <Carousel time={ 5000 }>
                {
                    recommentImgs.files.map( ( imgFile, i ) => {
                        return (
                            <img src={ imgFile } key={ i } />
                        )
                    } )
                }
            </Carousel>

            
        </div>
    )
}

export default withStyles<ClassKey>( styles )<Props>( InstancePage );
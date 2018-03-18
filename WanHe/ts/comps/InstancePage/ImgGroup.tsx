import React from 'react';

import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';

export type ClassKey = 'root';
const styles: StyleRulesCallback<ClassKey> = theme => {
    return {
        root: {

        }
    }
}

export type Props = {

}

function ImgGroup( props: Props & WithStyles<ClassKey> ) {
    return (
        <div>
            
        </div>
    )
}

export default withStyles<ClassKey>( styles )<Props>( ImgGroup );
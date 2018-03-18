import React from 'react';
import { withStyles } from 'material-ui';
import * as WithStyle from 'material-ui/styles';

const styles: WithStyle.StyleRulesCallback = theme => {
    return {
        main: {
            [ theme.breakpoints.up( 'sm' ) ]: {
                width: '60%'
            },
            [ theme.breakpoints.down( 'md' ) ]: {
                width: '100%'
            }
        }
    }
}
function Root( props: { children: React.ReactNode } & WithStyle.WithStyles ) {
    return <div id="main" className={ props.classes.main }>
        { props.children }
    </div>
}

export default withStyles( styles )( Root );
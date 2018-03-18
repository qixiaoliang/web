import React from 'react';
import Routers from './Routers';

import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider } from 'material-ui/styles';
import { createMuiTheme } from 'material-ui/styles';
import { orange, lightGreen } from 'material-ui/colors';

const theme = createMuiTheme( {
    palette: {
        primary: {
            main: orange[ 200 ]
        },
        background: {
            status: lightGreen[ 50 ]
        }
    }
} );

function AppFrame( props: {} ) {
    return (
        <MuiThemeProvider theme={ theme }>
            <Reboot />
            <Routers />
        </MuiThemeProvider>
    )
}

export default AppFrame;
import * as React from 'react';

import { MuiThemeProvider } from 'material-ui';
import { createMuiTheme } from 'material-ui';
import store from '../model/store';
import * as ReactRedux from 'react-redux';

let { Provider } = ReactRedux;

const theme = createMuiTheme( {
	palette: {
		type: 'light',
		background: {

		}
	}
} );

export type Props = {
	children?: React.ReactNode
}

function AppFrame( props: Props ) {

	return (
		<MuiThemeProvider theme={ theme }>
			<Provider store={ store }>
				{ props.children }
			</Provider>
		</MuiThemeProvider>
	)
}

export default AppFrame;
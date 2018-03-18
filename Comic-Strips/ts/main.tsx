import * as React from 'react';
import * as ReactDOM from 'react-dom';

import boot from './model/boot';
import AppFrame from './components/AppFrame';
import Routers from './components/Routers/Routers';
import { ajaxWithAuth, ajaxAuthJson } from "./util/ajax";

ReactDOM.render(
	<AppFrame>
		<Routers />
	</AppFrame>,
	document.getElementById( 'app' )
);

boot();

console.log( window );


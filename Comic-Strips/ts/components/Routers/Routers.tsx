import React from 'react';
import * as Routers from 'react-router-dom';
import { withStyles } from 'material-ui';
import { WithStyles } from 'material-ui';

import MainRoute from './MainRoute';

const { Route, BrowserRouter, Switch } = Routers;

export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <MainRoute />
            </Switch>
        </BrowserRouter>
    )
}
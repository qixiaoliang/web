import React from 'react';
import { Route } from 'react-router-dom';

import Root from './Root';
import Title from '../MainPage/Title';

export default () => (
    <Route
        exact
        path="/"
        render={
            () => {
                return (
                    <Root>
                        <Title />
                    </Root>
                )
            }
        } />
)
import * as Redux from 'redux';
import reducer, { ActionTypes } from './reducer';

export type State = {
    user: {
        name: string,
        icon: string,
        signed: boolean
    }
}

export { ActionTypes } from './reducer'

export type Action<T> = {
    type: T,
    [ value: string ]: any
}

const LogAction: Redux.Middleware = ( { dispatch, getState } ) => {
    return next => action => {
        let result = next( action );
        console.log( result );
        return result;
    }
}

export default Redux.createStore(
    reducer, {
        user: {
            name: '未登录',
            icon: 'default.png',
            signed: false
        }
    },
    Redux.applyMiddleware(
        LogAction
    )
)


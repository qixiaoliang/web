import * as Redux from 'redux';
import { State, Action } from './store';

export enum ActionTypes {
    User = "user"
}

export default function ( state: State, action: Action<ActionTypes> ): State {
    let change: { [ k: string ]: any } = state[ action.type ];
    if ( !change ) return state;

    Object.keys(
        action.value
    ).forEach( k => {
        if ( k in change )
            change[ k ] = action.value[ k ];
    } )

    return Object.assign( {}, state, {
        [ action.type ]: change
    } )
}
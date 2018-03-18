import store from './store';
import { ajaxAuthJson } from "../util/ajax";
import { ActionTypes } from '../model/reducer';

export default function boot() {
    loadUser();
}

function loadUser() {
    const keepSignIn = JSON.parse( localStorage.getItem( 'keepSignIn' ) );

    if ( keepSignIn != null ) {
        ajaxAuthJson(
            '/api/privateUserInfo'
        ).then( info => {
            if ( info )
                store.dispatch( {
                    type: ActionTypes.User,
                    value: { ...info, signed: true }
                } )
        } ).catch()
    }

    else return;
}
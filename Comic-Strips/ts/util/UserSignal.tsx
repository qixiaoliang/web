//@ts-ignore
import Hashes from 'jshashes';
import React from 'react';
import ReactDOM from 'react-dom';

import store from '../model/store';
import { ActionTypes } from '../model/reducer';
import { ajaxWithAuth } from "./ajax";

import { ShowSignIn } from '../components/RegisterOrSignIn/RegisterOrSignIn';

function getStorage() {
    let storage: Storage;
    if ( JSON.parse( localStorage.getItem( 'keepSignIn' ) ) === true )
        storage = localStorage;
    else
        storage = sessionStorage;

    let name: null | string = storage[ 'username' ];
    let pw: null | string = storage[ 'password' ];

    return { pw, name };
}

export async function getAuthInfo() {
    let { pw, name } = getStorage();
    let timeStamp = Date.now().toString();

    if ( !( name && pw ) ) {
        await SignIn();

        let result = getStorage();
        if ( !( result.pw && result.name ) )
            return null;
        else {
            pw = result.pw;
            name = result.name;
        }
    }

    let sha256 = new Hashes.SHA256( null );
    let password = sha256.hex_hmac( timeStamp, pw );
    return { name, password, timeStamp };
}

export type AuthInfo = { name: string, password: string };

export function saveUserAuth( info: AuthInfo, keepSignIn: boolean ) {
    localStorage.setItem( 'keepSignIn', JSON.stringify( keepSignIn ) );

    let storage: Storage;
    if ( keepSignIn )
        storage = localStorage;
    else
        storage = sessionStorage;

    let name = info.name, pw = info.password;
    let md5 = new Hashes.MD5( null );
    let hex: string = md5.hex( pw );
    storage.setItem( 'username', name );
    storage.setItem( 'password', hex );

    try {
        store.dispatch( {
            type: ActionTypes,
            value: ajaxWithAuth(
                '/api/privateUserInfo'
            )
        } )
    }

    catch ( e ) { }
}

export function SignIn() {
    return new Promise( ( resolve, reject ) => {
        ShowSignIn(
            () => {
                resolve();
            }
        )
    } )
}

export function clearUserAuth() {
    localStorage.removeItem( 'username' );
    localStorage.removeItem( 'password' );
    localStorage.removeItem( 'keepSignIn' );

    sessionStorage.removeItem( 'username' );
    sessionStorage.removeItem( 'password' );
    sessionStorage.removeItem( 'keepSignIn' );
}



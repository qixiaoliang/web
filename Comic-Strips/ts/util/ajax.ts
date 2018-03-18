import * as qs from 'query-string';
import { getAuthInfo } from './UserSignal';

async function ajaxWithAuth( path: string, params?: object | null, option?: RequestInit ) {
	let host = window.serverAddress + path;
	params = params || {};
	Object.assign( params, await getAuthInfo() );
	let query = '?' + qs.stringify( params );
	return await fetch( host + query, option );
}

function ajax( path: string, params?: object | null, option?: RequestInit ) {
	let host = window.serverAddress + path;
	let query = params ? '?' + qs.stringify( params ) : '';
	return fetch( host + query, option );
}

async function ajaxJson( path: string, params?: object | null, option?: RequestInit ) {
	let result;
	try {
		result = await ajax( path, params, option );
	}
	catch ( e ) { }
	if ( result && result.ok ) {
		let json = await result.json();
		return json;
	}
	return null;
}

async function ajaxAuthJson( path: string, params?: object | null, option?: RequestInit ) {
	let result;
	try {
		result = await ajaxWithAuth( path, params, option );
	}
	catch ( e ) { }
	if ( result && result.ok ) {
		let json = await result.json();
		return json;
	}
	return null;
}

export { ajaxAuthJson, ajax, ajaxJson, ajaxWithAuth };
//@ts-ignore
let Cards = require.context( '../CardPages/', false, /Card\d+\.tsx/ );
import React from 'react';

let keys: string[] = Cards.keys();
keys = keys.sort( ( a: string, b: string ) => {
    let m = a.match( /Card(\d+)/ )[ 1 ];
    let n = b.match( /Card(\d+)/ )[ 1 ];

    return Number( m ) - Number( n );
} )

export default (
    keys.map( ( a: string ) => {
        return Cards( a ).default || Cards( a )
    } ) as React.ReactType[]
)



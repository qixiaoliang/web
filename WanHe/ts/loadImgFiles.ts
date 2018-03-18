//@ts-ignore
let imgFiles = require.context( '../src/MiDrop/', true );

let files: {
    [ key: string ]: string[]
} = {};

imgFiles.keys().forEach( ( f: string ) => {
    let file: string = imgFiles( f );
    let m = file.match( /.*\/(.*)\// )[ 1 ];
    if ( !( m in files ) ) files[ m ] = [];
    files[ m ].push( file );
} );

let arrFiles: Window[ 'imgFiles' ] = [];

Object.keys( files ).forEach( k => {
    arrFiles.push( {
        dirName: k,
        files: files[ k ]
    } )
} )

export default arrFiles;
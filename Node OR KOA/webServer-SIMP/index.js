const Koa = require( 'koa' );
const app = new Koa();
const static = require( 'koa-static' );
const http = require( 'http' );
const fs = require( 'fs' );
const watch = require( 'watch' );
const path = require( 'path' );
const { relative } = path;
const ejs = require( 'ejs' );

let config = loadConfig();
print( 'input path' );
process.stdin.on( 'data', chunk => {
    lauch( chunk.toString().trim() );
    process.stdin.removeAllListeners( 'data' );
} )

function lauch ( _path ) {
    app.use( async ( ctx, next ) => {
        await next();
        if ( /html/i.test( ctx.type ) ) {
            let body = await getBody( ctx.body );
            ctx.status = 200;
            ctx.body = body.replace(
                /(<\/head>)/i,
                `\n<script>
                    var ws = new WebSocket(
                        'ws://' + location.host + '/io'
                    )
                    ws.onmessage = function ( e ) {
                        location.reload( true );
                    }
                </script>\n$1` )
        }
        if ( ctx.status === 404 ) {
            try {
                ctx.body = await ejsRender(
                    path.join( __dirname, '/Templates/404.ejs' ), {
                        docTitle: ' 404 ',
                        title: ctx.path + ' is not found!',
                        handles: [
                            'check your network',
                            'try it again'
                        ]
                    }
                )
                ctx.status = 200;
                ctx.type = 'text/html';
            }
            catch ( e ) { print( e ) }
        }
    } )

    app.use( async ( ctx, next ) => {
        if ( ctx.path.startsWith( '/serverPath' ) ) {
            ctx.path = ctx.path.replace( '/serverPath', '' );
            await static( __dirname, config.fileServerOption )( ctx, next );
        } else {
            await static( _path, config.fileServerOption )( ctx, next );
        }
    } )

    const { host, port } = config;
    const server = http.createServer( app.callback() );
    server.listen( port, host, () => {
        print( `server run on http://${host}:${port}` )
        require( 'child_process' ).exec( `start http://${host}:${port}` );
    } )
    process.on( 'uncaughtException', ( err ) => {
        print( err );
    } )

    const io = webSocket( server );
    watchFiles( _path, io );
}

function webSocket ( server ) {
    const WebSocket = require( 'ws' );
    const io = new WebSocket.Server( { server: server, path: '/io' } );

    io.on( 'connection', ( socket, req ) => {
        const ua = require( 'useragent.js' )
            .analyze( req.headers['user-agent'] );
        const info = `${ua.device.name} ${ua.os.full} ${ua.browser.full} `;
        print(
            info +
            `connected [${new Date().toLocaleString()}]`
        )
        socket.on( 'close', ( code, reason ) => {
            print(
                `${reason} ${info} disconnect [${new Date().toLocaleString()}]`
            )
        } )
    } )

    io.broadcast = function ( data ) {
        io.clients.forEach( client => {
            if ( client.readyState === WebSocket.OPEN )
                client.send( data );
        } )
    }
    return io;
}

function watchFiles ( _path, io ) {
    watch.watchTree( _path, config.watchOption
        , ( f, curr, prev ) => {
            if ( typeof f == "object" && prev === null && curr === null ) {
                print( 'server watching ' + _path + ' changes' );
            } else {
                f = relative( _path, f );
                if ( prev === null ) {
                    print(
                        `${f} is added [${new Date().toLocaleString()}]`
                    )
                } else if ( curr.nlink === 0 ) {
                    print(
                        `${f} is removed [${new Date().toLocaleString()}]`
                    )
                } else {
                    print(
                        `${f} is changed [${new Date().toLocaleString()}]`
                    )
                }
                io.broadcast( 'upd' );
            }
        } )
}

function ejsRender ( _path, data ) {
    return new Promise( ( result, reject ) => {
        ejs.renderFile( _path, data, { cache: false }, ( err, str ) => {
            if ( err ) reject( err );
            else result( str );
        } )
    } )
}

function print ( msg ) {
    process.stdout.write( msg + '\n' );
}

function printErr ( msg ) {
    process.stderr.write( msg + '\n' );
}

function loadConfig () {
    let config = null;
    try {
        config = fs.readFileSync(
            path.join( process.cwd(), '/webServerConfig.json' ),
            'utf8'
        )
        try {
            config = JSON.parse( config );
        } catch ( e ) {
            config = null;
            printErr(
                'webServerConfig.json error ' + e
            )
        }
    } catch ( e ) { }
    if ( config )
        print( 'config file find' );
    config = Object.assign( {
        host: 'localhost',
        port: 81,
        watchOption: {},
        fileServerOption: {}
    }, config || {} );
    return config;
}

function getBody ( body ) {
    return new Promise( ( result ) => {
        if ( typeof body === 'string' )
            result( body );
        if ( Buffer.isBuffer( body ) )
            result( body );
        if ( typeof body.pipe === 'function' ) {
            let _data = "";
            body.setEncoding( 'utf8' );
            body.on( 'data', ( chunk ) => {
                _data += chunk;
            } )
            body.on( 'end', () => {
                result( _data );
            } )
        }
    } )
}
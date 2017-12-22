const animImg = document.getElementById( 'animImg' );
let xhr = new XMLHttpRequest();
xhr.open( 'GET', '/src/desc.txt', false );
xhr.send( null );
const text = xhr.responseText;

const linesParam = text.split( '\n' )
    .filter( l => !l.startsWith( '#' ) )
    .map( l => l.split( ' ' ) );

const parts = linesParam.slice( 1 );
let part = 0;
let imgNumber = 0;
infinitePlay();

function infinitePlay () {
    play().then( () => {
        part++;
        if ( part >= parts.length ) {
            part = 0;
            imgNumber = 0;
        }
        infinitePlay();
    } )
}


function play () {
    return new Promise( result => {
        const f = Math.round(
            1000 / Number( linesParam[0][2] )
        );
        let path = parts[part][3];
        let delay = Number( parts[part][2] ) || f;
        let playTimes = Number( parts[part][1] ) || ( 3 );
        const initImgNumber = imgNumber;
        let i = 0;
        ff();

        function ff () {
            playAFrame( '/src/' + path + '/' + fillToLength( imgNumber ) + '.png', delay ).then( r => {
                if ( r ) {
                    imgNumber++;
                    ff();
                }
                else {
                    i++;
                    if ( i >= playTimes ) {
                        result();
                    }
                    else {
                        imgNumber = initImgNumber;
                        ff();
                    }
                }
            } )
        }
    } )
}

function playAFrame ( path, delay ) {
    return new Promise( result => {
        animImg.src = path;
        animImg.addEventListener( 'error', () => result( false ), { once: true } );
        animImg.addEventListener( 'load', () => setTimeout( () => {
            result( true )
        }, delay ), { once: true } )
    } )
}

function fillToLength ( number, length = 4 ) {
    const s = '0'.repeat( length );
    const n = number.toString();
    if ( s.length > n.length ) {
        return s.slice( 0, s.length - n.length ) + n;
    }
}
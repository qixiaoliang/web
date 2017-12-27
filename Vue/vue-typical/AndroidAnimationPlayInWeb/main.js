//import desc.txt文件
import text from './src/desc.txt';
//所有图片的挂载点#animImg
const animImg = document.getElementById('animImg')

const linesParam = text.split( '\n' )
	.filter( l => !l.startsWith( '#' ) )
	.map( l => l.split( ' ' ) );

const parts = linesParam.slice( 1 );
let part = 0;
let imgNumber = 0;

CO( play() );

/* 循环播放所有part */
function* play () {
	while ( true ) {
		yield CO( playAPart() );
		part++;
		if ( part >= parts.length ) {
			part = 0;
			imgNumber = 0;
		}
	}
}

/* 播放一个part文件夹中的所有图片 */
function* playAPart () {
	const f = Math.round(
		1000 / Number( linesParam[0][2] )
	);
	let path = parts[part][3];
	let delay = Number( parts[part][2] ) || f;
	let playTimes = Number( parts[part][1] ) || 2;
	const initImgNumber = imgNumber;
	let i = 0;

	let partPlaying = true;
	while ( partPlaying ) {
		partPlaying = yield playAFrame(
			'/Anim/src/' + path + '/' + fillToLength( imgNumber ) + '.png',
			delay
		);
		if ( partPlaying ) {
			imgNumber++;
		}
		else {
			i++;
			if ( playTimes > i ) {
				partPlaying = true;
				imgNumber = initImgNumber;
			}
		}
	}
}

/* 播放一帧图像 */
function playAFrame ( path, delay ) {
	return new Promise( resolve => {
		animImg.src = path;
		animImg.addEventListener( 'error', () => resolve( false ), { once: true } );
		animImg.addEventListener( 'load', () => setTimeout( () => {
			resolve( true )
		}, delay ), { once: true } )
	} )
}

/* 把一个number转换成'00...n'的形式 */
function fillToLength ( number, length = 4 ) {
	const s = '0'.repeat( length );
	const n = number.toString();
	if ( s.length > n.length ) {
		return s.slice( 0, s.length - n.length ) + n;
	}
}

/* 一个简单的CO */
function CO ( gen ) {
	return new Promise( ( resolve, reject ) => {
		f( gen );
		function f ( gen, result ) {
			let { value, done } = gen.next( result );
			if ( done ) {
				resolve();
			}
			else {
				value.then( v => {
					f( gen, v )
				} ).catch( reject )
			}
		}
	} )
}
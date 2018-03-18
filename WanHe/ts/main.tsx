import React from 'react';
import ReactDOM from 'react-dom';
import AppFrame from './comps/AppFrame';
import imgFiles from './loadImgFiles';

window.imgFiles = imgFiles;
console.log( imgFiles );

ReactDOM.render(
    <AppFrame />,
    document.getElementById( 'app' )
)
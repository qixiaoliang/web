import FanDiagram, { GraphyProps } from './FanDiagram';
import React from 'react';
import { render } from 'react-dom';

const describes: GraphyProps['describes'] = [
    { percent: 22, color: 'pink', describe: 'this is pink color' },
    { percent: 12, color: 'green', describe: 'this is green color' },
    { percent: 8, color: 'lime', describe: 'this is lime color' },
    { percent: 58, color: 'orange', describe: 'this is orange color' }
]

render(
    <FanDiagram
        size={240}
        describes={describes}
    />,
    document.getElementById( 'app' )
)

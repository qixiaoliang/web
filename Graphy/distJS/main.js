import React from 'react';
import ReactDOM from 'react-dom';
import FanDiagram from './FanDiagram';
ReactDOM.render(React.createElement(FanDiagram, { style: {
        background: '#9c5'
    }, size: 300, describes: [
        { color: 'red', percent: 20, describe: '20%: red' },
        { color: 'orange', percent: 20, describe: '20%: orange' },
        { color: 'blue', percent: 20, describe: '20%: blue' },
        { color: 'gray', percent: 20, describe: '20%: gray' },
        { color: 'green', percent: 20, describe: '20%: green' }
    ] }), document.getElementById('app'));
//# sourceMappingURL=main.js.map
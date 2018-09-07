import React from 'react';
import ReactDOM from 'react-dom';
import FanDiagram from './FanDiagram';
ReactDOM.render(<FanDiagram size={220} describes={[
    { color: 'lime', percent: 15, describe: '20%: red' },
    { color: 'orange', percent: 25, describe: '20%: orange' },
    { color: 'pink', percent: 20, describe: '20%: blue' },
    { color: 'gray', percent: 30, describe: '20%: gray' },
    { color: 'green', percent: 10, describe: '20%: green' }
]}/>, document.getElementById('app'));
//# sourceMappingURL=main.jsx.map
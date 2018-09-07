import React from 'react';
import ReactDOM from 'react-dom';
import TreeSelect from './TreeSelect';
import { DataType } from './TreeSelect';
import './main.css';
import '../src/iconfont.css';
import data from './Data';
import { ExampleDataType } from './Data';
import FileSelector from './FileSelector';

class Test extends React.Component {
    data: DataType[] = this.format( data );
    format( data: ExampleDataType[] ) {
        let o: DataType[] = [];
        const render = ( files: string[] ) => () => {
            this.setState( {
                content: <FileSelector files={ files.map( f => ( f + '  ' ).repeat( 3 ) ) }>
                </FileSelector>
            } )
        }

        data.forEach( d => {
            if ( d.files ) {
                o.push( {
                    text: d.name,
                    expand: false,
                    render: render( d.files ).bind( this )
                } )
            }
            else {
                o.push( {
                    text: d.name,
                    expand: false,
                    children: this.format( d.folders )
                } )
            }
        } )
        return o;
    }

    state = {
        content: <div></div>
    }
    render() {
        return <div className="container">
            <div className="header">
                <p>选择文件</p>
            </div>
            <hr />
            <div className="panels">
                <TreeSelect data={ this.data } />
                <hr className="vertical"/>
                <div className="right">
                    { this.state.content }
                </div>
            </div>
            <hr/>
        </div>
    }
}
ReactDOM.render(
    <Test></Test>,
    document.getElementById( 'app' )
)


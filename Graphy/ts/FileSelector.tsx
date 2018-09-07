import React from 'react';
import './FileSelector.css'

export type Props = {
    /** 要显示的文件列表 */
    files: string[]
}
export type States = {
    select: Set<string>;
    multiSlelect: boolean;
    allSlelect: boolean;
}
export default class FileSelector extends React.Component<Props, States>{
    state = {
        select: new Set<string>(),
        multiSlelect: false,
        allSlelect: false
    }
    fileSelect( f: string ) {
        return () => {
            if ( this.state.multiSlelect ) {
                if ( this.state.select.has( f ) ) {
                    this.state.select.delete( f );
                }
                else {
                    this.state.select.add( f );
                }
                this.setState( {
                    select: new Set(
                        this.state.select
                    )
                } )
            }
            else {
                this.setState( {
                    select: this.state.select.has( f ) ?
                        new Set() : new Set( [ f ] )
                } )
            }
        }
    }
    render() {
        return (
            <div className="fileRoot">
                    <div className="fileList">
                        { this.props.files.map( ( f, i ) => {
                            return (
                                <div
                                    onClick={ this.fileSelect( f ).bind( this ) }
                                    className="file"
                                    key={ i }>
                                    <input
                                        checked={ this.state.select.has( f ) }
                                        type="checkbox" />
                                    <span className="iconfont icon-pdf"></span>
                                    <span>{ f }</span>
                                </div>
                            )
                        } ) }
                    </div>
                    <div className="confirm">
                        <div className="selectChange">

                            <div
                                onClick={ e => {
                                    this.setState( {
                                        multiSlelect: !this.state.multiSlelect
                                    }, () => {
                                        if ( !this.state.multiSlelect && this.state.select.size > 1 )
                                            this.setState( { select: new Set() } )
                                    } )
                                } }>
                                <input
                                    checked={ this.state.multiSlelect }
                                    type="checkbox" />
                                <span>多选</span>
                            </div>
                            <div
                                onClick={ e =>
                                    this.setState( {
                                        allSlelect: !this.state.allSlelect,
                                        select: !this.state.allSlelect ? new Set( this.props.files ) : new Set()
                                    } )
                                }>
                                <input
                                    checked={ this.state.allSlelect }
                                    type="checkbox" />
                                <span>全选</span>
                            </div>
                        </div>
                        <div>
                            <button onClick={ () => this.setState( { select: new Set<string>() } ) }>取消</button>
                            <button
                                disabled={ this.state.select.size <= 0 }
                                onClick={
                                    ( () => alert(
                                        '您选择的文件是：\n' +
                                        Array.from( this.state.select ) ) ).bind( this )
                                }
                                className="primary"
                            >确认</button>
                        </div>
                    </div>
                </div>
        )
    }
}
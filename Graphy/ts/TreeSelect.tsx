import React from 'react';
import './TreeSelector.css';
import SlideIn from './SlideIn';

export interface DataType {
    /** 树节点的文本说明 */
    text: string,
    /** 该节点的子节点 */
    children?: Array<DataType>,
    /** 节点是否战默认展开 */
    expand: boolean,
    /** 叶子节点被点击时调用的函数，通常用来render该节点。 */
    render?: ( node: DataType ) => void,
    /** 可选，该节点的id */
    id?: string
}

export type Props = {
    data: DataType[]
}

export type State = {
    data: DataType[],
    selectedItem: DataType
}

class TreeSelect extends React.Component<Props, State> {
    state: State = {
        data: this.props.data.slice( 0 ),
        selectedItem: null
    }
    componentWillReceiveProps( nextProps: Props ) {
        if ( nextProps.data !== this.props.data ) {
            this.setState( {
                data: nextProps.data.slice( 0 )
            } )
        }
    }
    renderNode( nodes: DataType[], nodeIndent = 0 ): React.ReactNode {
        return nodes.map( ( node, i ) => {
            let content;
            if ( node.children ) {
                content = (
                    <div key={ i }>
                        <span
                            className="itemText"
                            style={ { marginLeft: nodeIndent + 'px' } }
                            onClick={
                                () => {
                                    node.expand = !node.expand;
                                    this.setState( {
                                        data: this.state.data.slice( 0 )
                                    } )
                                }
                            }>
                            { node.expand ?
                                <span className="caret caret-expand iconfont icon-right"></span> :
                                <span className="caret iconfont icon-right"></span>
                            }
                            <span className="iconfont icon-folder icon-folder-green"></span>
                            { node.text }
                        </span>
                        <SlideIn
                            in={ node.expand }
                            className="itemContainer">
                            { this.renderNode( node.children, nodeIndent + 28 ) }
                        </SlideIn>
                    </div>
                )
            }
            else {
                content = <span
                    key={ i }
                    className={ "itemText" + ( node === this.state.selectedItem ? ' itemSelect' : '' ) }
                    style={ { marginLeft: nodeIndent + 'px' } }
                    onClick={
                        () => {
                            node === this.state.selectedItem ? ' itemSelect' : ''
                            this.setState( {
                                selectedItem: node
                            } )
                            node.render( node )
                        }
                    }>
                    <span className="caret iconfont icon-right" style={ { visibility: 'hidden' } }></span>
                    <span className="iconfont icon-folder icon-folder-pink"></span>
                    { node.text }
                </span>
            }
            return content;
        } )
    }
    render() {
        return (
            <div className="treeSelector">
                <div className="search">
                    <input type="text" />
                    <span className="iconfont icon-sousuo"></span>
                </div>
                <div className="itemContainer">
                    { this.renderNode( this.state.data ) }
                </div>

            </div>
        )
    }
}

export default TreeSelect;
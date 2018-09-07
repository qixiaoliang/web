/// <reference types="react" />
import React from 'react';
export declare type GraphyProps = {
    /**
     * 设置扇形图的大小
     */
    size?: number;
    /**
     * 一个数组，用来描述扇形图的每一部分
     */
    describes: {
        /** 描述该部分的颜色  */
        color: string;
        /** 描述该部分的百分比 */
        percent: number;
        /** 对该部分的说明 */
        describe?: string;
    }[];
} & React.AllHTMLAttributes<any>;
export declare type State = {
    /** 当前鼠标指针hover的部分 */
    hoverItem: number;
};
export default class FanDiagram extends React.Component<GraphyProps, State> {
    static defaultProps: Partial<GraphyProps>;
    hoverTextElm: HTMLSpanElement;
    state: State;
    render(): JSX.Element;
}

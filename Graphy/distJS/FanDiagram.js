var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
var FanDiagram = /** @class */ (function (_super) {
    __extends(FanDiagram, _super);
    function FanDiagram() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hoverItem: -1
        };
        return _this;
    }
    FanDiagram.prototype.render = function () {
        var _this = this;
        var _a = this.props, size = _a.size, describes = _a.describes, restProps = __rest(_a, ["size", "describes"]);
        var hoverItem = this.state.hoverItem;
        var paddingTop = size / 15;
        var paddingLeft = describes.reduce(function (prev, cur, index) {
            if (prev.describe.length > cur.describe.length)
                return prev;
            return cur;
        }).describe.length * 12;
        var curDeg = 0;
        var center = {
            x: size / 2,
            y: size / 2
        };
        return (React.createElement("div", __assign({ style: {
                position: 'relative'
            } }, restProps, { onMouseMove: function (e) {
                _this.hoverTextElm.style.top =
                    e.clientY + 12 + 'px';
                _this.hoverTextElm.style.left =
                    e.clientX + 12 + 'px';
            } }),
            React.createElement("span", { style: {
                    display: hoverItem >= 0 ? 'block' : 'none',
                    position: 'absolute',
                    padding: '6px 12px',
                    fontSize: '12px',
                    borderRadius: '6px',
                    background: 'green',
                    color: 'white'
                }, ref: function (r) { if (r)
                    _this.hoverTextElm = r; } }, hoverItem >= 0 ? describes[hoverItem].describe : ''),
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size + 2 * paddingLeft, height: size + paddingTop * 4 }, describes.map(function (item, i) {
                var deg = curDeg + Math.PI * 2 * item.percent / 100;
                var r = i === hoverItem ? (size / 2 + paddingTop) : size / 2;
                var curPoint = {
                    x: center.x + Math.cos(curDeg) * r,
                    y: center.y - Math.sin(curDeg) * r
                };
                var nextPoint = {
                    x: center.x + Math.cos(deg) * r,
                    y: center.y - Math.sin(deg) * r
                };
                var d = "M " + center.x + " " + center.y + " L " + curPoint.x + " " + curPoint.y + " " +
                    ("A " + r + " " + r + " 0 " + (deg - curDeg > Math.PI ? '1' : '0') + " 0 " + nextPoint.x + " " + nextPoint.y + " ") +
                    ("L " + center.x + " " + center.y);
                var lineStart = {
                    x: center.x + Math.cos((deg + curDeg) / 2) * size / 2,
                    y: center.y - Math.sin((deg + curDeg) / 2) * size / 2
                };
                var lineEnd = {
                    x: center.x + Math.cos((deg + curDeg) / 2) * (size / 2 + 1.5 * paddingTop),
                    y: center.y - Math.sin((deg + curDeg) / 2) * (size / 2 + 1.5 * paddingTop)
                };
                var lineDeg = (deg + curDeg) / 4 / Math.PI * 360;
                var isPositiveAsix = (0 <= lineDeg && lineDeg <= 90) || (270 <= lineDeg);
                var hLine = isPositiveAsix ?
                    paddingTop * 2 : -paddingTop * 2;
                curDeg = deg;
                return (React.createElement("g", { transform: "translate(" + paddingLeft + "," + paddingTop * 2 + ")", key: i, onMouseOver: function () {
                        _this.setState({
                            hoverItem: i
                        });
                    }, onMouseOut: function () {
                        _this.setState({
                            hoverItem: -1
                        });
                    } },
                    React.createElement("text", { fontSize: "14", fontWeight: "500", textAnchor: (0 <= lineDeg && lineDeg <= 90) || (270 <= lineDeg) ?
                            'start' : 'end', fill: item.color, x: lineEnd.x + hLine +
                            (isPositiveAsix ? 4 : -4), y: lineEnd.y + 6 }, item.describe),
                    React.createElement("path", { d: "M " + lineStart.x + " " + lineStart.y + " " +
                            ("L " + lineEnd.x + " " + lineEnd.y + " ") +
                            ("h " + hLine) +
                            ("M " + center.x + " " + center.y), fill: "transparent", strokeWidth: "2", stroke: item.color }),
                    React.createElement("path", { fill: item.color, strokeWidth: "0", d: d })));
            }))));
    };
    FanDiagram.defaultProps = {
        size: 200
    };
    return FanDiagram;
}(React.Component));
export default FanDiagram;
//# sourceMappingURL=FanDiagram.js.map
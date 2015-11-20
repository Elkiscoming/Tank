/**
 * Created by erfan on 11/20/15.
 */

/**
 * Created by erfan on 11/19/15.
 */

var React = require('react');
var TankStore = require('../stores/TankStore');

var Tank = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
    },

    componentWillUnmount: function() {
    },

    /**
     * @return {object}
     */
    render: function() {
        var position = this.props.position;
        var angle = parseFloat(this.props.angle) / 180 * Math.PI;

        var lineStart = 15;
        var lineEnd = 25;
        var lineStartX = position.x + lineStart * Math.cos(angle);
        var lineStartY = position.y + lineStart * Math.sin(angle);

        var lineEndX = position.x + lineEnd * Math.cos(angle);
        var lineEndY = position.y + lineEnd * Math.sin(angle);
        return (
            <g>
                <circle cx={position.x} cy={position.y} r="20" stroke="red" stroke-width="4" fill="white"/>
                <line x1={lineStartX} y1={lineStartY} x2={lineEndX} y2={lineEndY} stroke="red" stroke-width="4" />
            </g>
        );
    }
});

module.exports = Tank;

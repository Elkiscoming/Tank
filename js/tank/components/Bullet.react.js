/**
 * Created by erfan on 11/20/15.
 */

var React = require('react');
var TankStore = require('../stores/TankStore');

Bullet = React.createClass({

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
        return (
            <g>
                <circle cx={position.x} cy={position.y} r="4" stroke="red" stroke-width="1" fill="red"/>
            </g>
        );
    }
});

module.exports = Bullet;

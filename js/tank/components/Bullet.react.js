/**
 * Created by erfan on 11/20/15.
 */

var React = require('react');
var TankStore = require('../stores/TankStore');
var TankConstants = require('../constants/TankConstants');

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
                <circle cx={position.x} cy={position.y} r={TankConstants.values.BULLET_RAD} stroke="red" stroke-width="1" fill="red"/>
            </g>
        );
    }
});

module.exports = Bullet;

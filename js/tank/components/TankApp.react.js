/**
 * Created by erfan on 11/19/15.
 */
var React = require('react');
var TankStore = require('../stores/TankStore');

function getTodoState() {
    return {
        allTodos: TankStore.getAll()
    };
}

var TankApp = React.createClass({

    getInitialState: function() {
        return getTodoState();
    },

    componentDidMount: function() {
        TankStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TankStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {
        return (
            <div>
                <svg width="1000" height="1000">
                    <circle cx="50" cy="50" r="20" stroke="red" stroke-width="4" fill="white"/>
                </svg>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getTodoState());
    }

});

module.exports = TankApp;
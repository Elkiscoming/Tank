/**
 * Created by erfan on 11/19/15.
 */
var React = require('react');
var Tank = require('./Tank.react');
var TankStore = require('../stores/TankStore');
var TankActions = require('../actions/TankActions');

function getTankState() {
    return {
        allTanks: TankStore.getAll()
    };
}

var TankApp = React.createClass({

    getInitialState: function() {
        return getTankState();
    },

    componentDidMount: function() {
        $('.tank-trouble').focus();
        console.log('focus');
        TankStore.addChangeListener(this._onChange);
        interval = setInterval(function(){
            TankActions.update();
        }, 50);
    },

    componentWillUnmount: function() {
        TankStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {
        var allTanks = this.state.allTanks;
        var tanks = [];
        for(var index in allTanks){
            tanks[index] = (
                <Tank position={allTanks[index].position} angle={allTanks[index].angle} />
            );
        }
        return (
            <div className="tank-trouble" onKeyDown={this._onKeyDown} onKeyUp={this._onKeyUp} tabIndex="0">
                <svg width="1000" height="1000">
                    {tanks}
                </svg>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getTankState());
    },

    _onKeyDown: function(event) {
        if(event.keyCode >= 37 && event.keyCode <= 40)
            event.preventDefault();
        TankActions.keyDown(event.keyCode);
    },

    _onKeyUp: function(event) {
        if(event.keyCode >= 37 && event.keyCode <= 40)
            event.preventDefault();
        TankActions.keyUp(event.keyCode);
    }

});

module.exports = TankApp;
/**
 * Created by erfan on 11/19/15.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TankConstants = require('../constants/TankConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _tanks = [
    {
        id: 0,
        position: {
            x: 50,
            y: 50
        },
        angle: 0,
        maxV: 1,
        dir : 0
    }
]; // collection of tanks

var _bullets = [];

function createBullet(playerIndex){
    var id = Date.now();
    _bullets[id] = {
        playerID: playerIndex,
        position: {
            x: _tanks[playerIndex].position.x,
            y: _tanks[playerIndex].position.y
        },
        angle: _tanks[playerIndex].angle
    };
}

var TankStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function() {
        return {
            tanks: _tanks,
            bullets: _bullets
        };
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        var tank = _tanks[0];
        var dt = 1;
        var number;
        switch(action.actionType) {
            case TankConstants.UPDATE:
                var angle = tank.angle / 180 * Math.PI;
                if((tank.dir >> 0) % 2 === 1) {
                    tank.angle -= dt;
                }
                if((tank.dir >> 2) % 2 === 1) {
                    tank.angle += dt;
                }
                if((tank.dir >> 1) % 2 === 1){
                    tank.position.x += tank.maxV * Math.cos(angle) * dt;
                    tank.position.y += tank.maxV * Math.sin(angle) * dt;
                }
                if((tank.dir >> 3) % 2 === 1){
                    tank.position.x -= tank.maxV * Math.cos(angle) * dt;
                    tank.position.y -= tank.maxV * Math.sin(angle) * dt;
                }

                for(var index in _bullets){
                    var bulletAngle = _bullets[index].angle / 180 * Math.PI;
                    console.log(bulletAngle);
                    _bullets[index].position.x += 2 * tank.maxV * Math.cos(bulletAngle) * dt;
                    _bullets[index].position.y += 2 * tank.maxV * Math.sin(bulletAngle) * dt;
                }
                TankStore.emitChange();
                break;
            case TankConstants.KEY_DOWN:
                number = (1 << action.keyCode);
                if((tank.dir >> action.keyCode) % 2 === 0)
                    tank.dir += number;
                break;
            case TankConstants.KEY_UP:
                number = (1 << action.keyCode);
                tank.dir -= number;
                break;
            case TankConstants.NEW_BULLET:
                var playerIndex = action.playerIndex;
                createBullet(playerIndex);
                break;
            // add more cases for other actionTypes, like TODO_UPDATE, etc.
        }

        return true; // No errors. Needed by promise in Dispatcher.
    })

});

module.exports = TankStore;
/**
 * Created by erfan on 11/19/15.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TankConstants = require('../constants/TankConstants');

var TankActions = {

    /**
     * updates game
     */
    update: function() {
        AppDispatcher.handleViewAction({
            actionType: TankConstants.UPDATE
        });
    },

};

module.exports = TankActions;
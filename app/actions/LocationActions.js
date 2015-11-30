'use strict';

var alt = require('../alt');
var LocationSource = require('../sources/LocationSource');

var LocationActions = alt.createActions({

  updateLocations: function (locations) {
    this.dispatch(locations);
  },

  fetchLocations: function () {
    // we dispatch an even here so we can have "loading" state
    this.dispatch();

    LocationSource.fetch()
      .then((locations) => {
        // we can access other actions within our action through 'this.actions'
        this.actions.updateLocations(locations);
      })
      .catch((errorMessage) => {
        this.actions.locationsFailed(errorMessage);
      });
  },

  locationsFailed: function (errorMessage) {
    this.dispatch(errorMessage);
  },

  favoriteLocation: function (locationId) {
    this.dispatch(locationId);
  }

});

// Export the created actions
// module.exports = alt.createActions(LocationActions);
module.exports = LocationActions;

'use strict';

var alt = require('../alt');

class LocationActions {

  updateLocations(locations) {
    this.dispatch(locations);
  }

  fetchLocations() {
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
  }

  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  favoriteLocation(locationId) {
    this.dispatch(locationId);
  }

}

// Export the created actions
module.exports = alt.createActions(LocationActions);

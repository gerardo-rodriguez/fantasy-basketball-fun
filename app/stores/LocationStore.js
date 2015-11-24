'use strict';

var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');

class LocationStore {

  constructor() {
    this.locations = [];
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
      handleFetchLocations: LocationActions.FETCH_LOCATIONS,
      handleLocationsFailed: LocationActions.LOCATIONS_FAILED,
      setFavorties: LocationActions.FAVORITE_LOCATION
    });
  }

  handleUpdateLocations(locations) {
    this.locations = locations;
    this.errorMessage = null;
  }

  handleFetchLocations() {
    // Reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    this.locations = [];
  }

  handleLocationsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  resetAllFavorites() {
    this.locations = this.locations.map((location) => {
      return {
        id: location.id,
        name: location.name,
        hasFavorite: false
      };
    });
  }

  setFavorties(location) {
    this.waitFor(FavoritesStore);

    var favoritedLocations = FavoritesStore.getState().locations;

    this.resetAllFavorites();

    favoritedLocations.forEach((location) => {
      // find each location in the array
      for (var i = 0; i < this.locations.length; i += 1) {

        // set hasFavorite to true
        if (this.locations[i].id === location.id) {
          this.locations[i].hasFavorite = true;
          break;
        }
      }
    });
  }

}

module.exports = alt.createStore(LocationStore, 'LocationStore');

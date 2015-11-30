'use strict';

var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');
var FavoritesStore = require('./FavoritesStore');

var LocationStore = alt.createStore({
  displayName: 'LocationStore',

  bindListeners: {
    handleUpdateLocations: LocationActions.updateLocations,
    handleFetchLocations: LocationActions.fetchLocations,
    handleLocationsFailed: LocationActions.locationsFailed,
    setFavorties: LocationActions.favoriteLocation
  },

  state: {
    locations: [],
    errorMessage: null
  },

  publicMethods: {

  },

  // constructor() {
  //   this.locations = [];
  //   this.errorMessage = null;
  //
  //   this.bindListeners({
  //     handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
  //     handleFetchLocations: LocationActions.FETCH_LOCATIONS,
  //     handleLocationsFailed: LocationActions.LOCATIONS_FAILED,
  //     setFavorties: LocationActions.FAVORITE_LOCATION
  //   });
  // }

  handleUpdateLocations: function (locations) {
    this.state.locations = locations;
    this.state.errorMessage = null;
  },

  handleFetchLocations: function() {
    // Reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    this.state.locations = [];
  },

  handleLocationsFailed: function (errorMessage) {
    this.state.errorMessage = errorMessage;
  },

  resetAllFavorites: function () {
    this.state.locations = this.state.locations.map((location) => {
      return {
        id: location.id,
        name: location.name,
        hasFavorite: false
      };
    });
  },

  setFavorties: function(location) {
    this.waitFor(FavoritesStore);

    var favoritedLocations = FavoritesStore.getState().locations;

    this.resetAllFavorites();

    favoritedLocations.forEach((location) => {
      // find each location in the array
      for (var i = 0; i < this.state.locations.length; i += 1) {

        // set hasFavorite to true
        if (this.state.locations[i].id === location.id) {
          this.state.locations[i].hasFavorite = true;
          break;
        }
      }
    });
  }

});

// module.exports = alt.createStore(LocationStore, 'LocationStore');
module.exports = LocationStore;

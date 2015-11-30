'use strict';

var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');

var FavoritesStore = alt.createStore({
  displayName: 'FavoritesStore',

  bindListeners: {
    addFavoriteLocation: LocationActions.favoriteLocation
  },

  state: {
    location: []
  },

  publicMethods: {

  },

  // constructor() {
  //   this.locations = [];
  //
  //   this.bindListeners({
  //     addFavoriteLocation: LocationActions.FAVORITE_LOCATION
  //   });
  // }

  addFavoriteLocation: function (location) {
    this.state.locations.push(location);
  }
});

// module.exports = alt.createStore(FavoritesStore, 'FavoritesStore');
module.exports = FavoritesStore;

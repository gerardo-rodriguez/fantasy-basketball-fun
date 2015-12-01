'use strict';

var React = require('react');
var LocationStore = require('../../app/stores/LocationStore');
var LocationActions = require('../../app/actions/LocationActions');

var Locations = React.createClass({
  getInitialState() {
    return LocationStore.getState();
  },

  componentDidMount() {
  // componentWillMount() {
    console.log('GERARDO!!!');
    LocationStore.listen(this.onChange);

    LocationActions.fetchLocations();
  },

  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  render() {

    // if (this.state.errorMessage) {
    //   return (<div>Something is wrong. {this.state.errorMessage}</div>);
    // }
    //
    // if (!this.state.locations.length) {
    //   return (
    //     <div>
    //       <img src="/my-cool-spinner.gif" />
    //     </div>
    //   );
    // }

    return (
      <div>
        <h3>Locations listed below:</h3>
        <ul>
          {this.state.locations.map((location) => {
            return (
              <li>{location.name}</li>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = Locations;

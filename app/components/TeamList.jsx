'use strict';

import React from 'react';
import reqwest from 'reqwest';
import config from '../../config';

// TODO: Make league ID dynamic
const API_URL = config.app.apiURL + 'leagues/353.l.104969/teams';

var TeamList = React.createClass({
  getInitialState: function() {
    return {
      "teams": []
    };
  },

  componentDidMount: function() {
    // TODO: Figure out 'loading' delay. What to display? How to handle?
    reqwest({
      url: API_URL,
      type: 'json',
      success: function (resp) {
        console.log('respONSE', resp);
        this.setState({
          "teams": resp.data.teams
        });
      }.bind(this),
      error: function(err) {
        // TODO: Handle errors
        console.log("ERR", err);
      }.bind(this)
    });
  },

  render: function() {
    var teamNodes = this.state.teams.map(function(team, index) {
      return (
        <li key={index}>{team.name}</li>
      );
    });

    return (
      <ul className="team-list">
        {teamNodes}
      </ul>
    );
  }
});

module.exports = TeamList;

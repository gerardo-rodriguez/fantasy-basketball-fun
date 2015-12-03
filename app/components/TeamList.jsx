'use strict';

import React from 'react';
import reqwest from 'reqwest';

const API_URL = 'http://www.mocky.io/v2/5660921e1200009244abd950';

var TeamList = React.createClass({
  getInitialState: function() {
    return {
      "teams": []
    };
  },

  componentDidMount: function() {
    reqwest({
      url: API_URL,
      type: 'jsonp',
      success: function (resp) {
        console.log('respONSE', resp);
        this.setState({
          "teams": resp.teams
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

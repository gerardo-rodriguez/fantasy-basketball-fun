'use strict';

var R = require('ramda');

var cleanup = {

  teams: function(data) {
    // var manual = () => data['fantasy_content'].league[1].teams; // manual version
    // Get to the team data first.
    var teams = R.path(['fantasy_content','league','1','teams']);

    // Helper functions
    var objsOnly = item => R.is(Object, item);
    var keys = item => R.keys(item);
    var values = item => R.values(item);

    // Our composed functions
    var teamObjsMixed = R.compose(R.values, teams);
    var teamObjs = R.compose(R.filter(objsOnly), teamObjsMixed);
    var teamObjArr = R.compose( R.map(team => R.reject(R.isEmpty, team)), R.map(obj => obj.team[0]), teamObjs );
    var keysValues = R.compose( R.map(team => [R.unnest(R.map(keys, team)), R.unnest(R.map(values, team))]), teamObjArr);
    var cleanTeamData = R.compose(R.map(team => R.zipObj(team[0], team[1])), keysValues);

    // console.log( 'manual', manual );
    // console.log( 'clean data:', cleanTeamData(data) );

    return cleanTeamData(data);
  }
};

module.exports = cleanup;

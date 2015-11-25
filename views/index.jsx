'use strict';
// <h1>{{title}}</h1>
// <p>Welcome to {{title}}</p>
// <p><a href="/auth/oauth">Yahoo! OAuth FTW!!!</a></p>
// <!-- <p><a href="/go">Show me something!</a></p> -->

var React = require('react');
var DefaultLayout = require('./layouts/default');
// var Locations = require('../app/components/Locations');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <h1>{this.props.title}</h1>
        <p>Hello {this.props.name}, welcome to {this.props.title}</p>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;

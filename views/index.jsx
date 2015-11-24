'use strict';
// <h1>{{title}}</h1>
// <p>Welcome to {{title}}</p>
// <p><a href="/auth/oauth">Yahoo! OAuth FTW!!!</a></p>
// <!-- <p><a href="/go">Show me something!</a></p> -->

var React = require('react');
var DefaultLayout = require('./layouts/default');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <h1>Hello {this.props.name}</h1>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;

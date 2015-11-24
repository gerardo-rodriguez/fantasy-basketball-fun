'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default');

var ErrorView = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <h1>Hi</h1>
        // <h1>messages: {this.props.message}</h1>
        // <h2>status: {this.props.error.status}</h2>
        // <pre>error stack: {this.props.error.stack}</pre>
      </DefaultLayout>
    );
  }
});

module.exports = ErrorView;

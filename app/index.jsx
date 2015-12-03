'use strict';

// var React = require('react');
// var ReactDOM = require('react-dom');
// var Note = require('./components/Note');
import React from 'react';
import ReactDOM from 'react-dom';
import Note from './components/Note';

main();

function main() {
  var app = document.createElement('div');
  document.body.appendChild(app);

  ReactDOM.render(<Note />, app);
}

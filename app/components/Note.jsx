'use strict';

import React from 'react';

var Note = React.createClass({
  render: function() {
    return (
      <div className="note">
        <p>Hi, I am a note!</p>
      </div>
    );
  }
});

module.exports = Note;

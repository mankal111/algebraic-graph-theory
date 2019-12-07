import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import GraphCanvas from './components/GraphCanvas';
import GraphDataPanel from './components/GraphDataPanel.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Algebraic Graph Theory</h1>
        <GraphDataPanel />
        <GraphCanvas />
      </div>
    );
  }
  
  
}

export default connect() (App);

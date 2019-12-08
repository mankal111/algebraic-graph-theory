import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import GraphCanvas from './components/GraphCanvas';
import GraphDataPanel from './components/GraphDataPanel.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container fluid>
              <h1>Algebraic Graph Theory</h1>
          <Row>
            <Col md={7}>
              <GraphCanvas/>
            </Col>
            <Col md={5}>
              <GraphDataPanel />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  
  
}

export default connect() (App);

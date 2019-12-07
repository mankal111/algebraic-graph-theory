import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import GraphCanvas from './components/GraphCanvas';
import GraphDataPanel from './components/GraphDataPanel.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
              <h1>Algebraic Graph Theory</h1>
          <Row>
            <Col md={8}>
              <Jumbotron>
                <GraphCanvas />
              </Jumbotron>
            </Col>
            <Col md={4}>
              <GraphDataPanel />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  
  
}

export default connect() (App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeGraph } from '../actions/graphActions';
import { Dropdown } from 'react-bootstrap';

class CreateGraphCard extends Component {
    constructor(...args) {
        super(...args);
        this.deleteGraph = this.deleteGraph.bind(this);
    }

    deleteGraph() {
        this.props.initializeGraph([],[])
    }

    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Create
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onSelect={this.deleteGraph}>New</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

const mapStateToProps = state => ({
    ...state.graphReducer
});

const mapDispatchToProps = dispatch => ({
    initializeGraph: (vertices, edges) => dispatch(initializeGraph(vertices, edges))
});
  
export default connect(mapStateToProps, mapDispatchToProps) (CreateGraphCard);
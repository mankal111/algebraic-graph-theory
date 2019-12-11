import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeGraph } from '../actions/graphActions';
import { Dropdown } from 'react-bootstrap';

class CreateGraphCard extends Component {
    constructor(...args) {
        super(...args);
        this.deleteGraph = this.deleteGraph.bind(this);
        this.cycleGraph = this.cycleGraph.bind(this);
        this.completeGraph = this.completeGraph.bind(this);
    }

    deleteGraph() {
        this.props.initializeGraph([],[])
    }

    cycleGraph() {
        const center = [window.innerWidth/4, window.innerHeight/3];
        const radius = window.innerWidth/9;
        let numberOfVertices = Number.parseInt(prompt("Please enter the number of vertices", 5));
        if (!Number.isInteger(numberOfVertices)) numberOfVertices = 5;
        let vertices = [];
        let edges = [];
        for (let i = 0; i < numberOfVertices; i++){
            vertices[i] = [
                center[0]+radius*Math.cos(2*Math.PI*i/numberOfVertices),
                center[1]+radius*Math.sin(2*Math.PI*i/numberOfVertices)
            ];
            edges[i] = [i, (i+1)%numberOfVertices];
        }
        this.props.initializeGraph(vertices,edges)
    }

    completeGraph() {
        const center = [window.innerWidth/4, window.innerHeight/3];
        const radius = window.innerWidth/9;
        let numberOfVertices = Number.parseInt(prompt("Please enter the number of vertices", 5));
        if (!Number.isInteger(numberOfVertices)) numberOfVertices = 5;
        let vertices = [];
        let edges = [];
        for (let i = 0; i < numberOfVertices; i++){
            vertices[i] = [
                center[0]+radius*Math.cos(2*Math.PI*i/numberOfVertices),
                center[1]+radius*Math.sin(2*Math.PI*i/numberOfVertices)
            ];
        }
        for (let i = 0; i < numberOfVertices; i++){
            for (let j = 0; j < numberOfVertices; j++){
                if (i !== j) edges.push([i,j]);
            }
        }
        this.props.initializeGraph(vertices,edges)
    }

    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Create
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onSelect={this.deleteGraph}>New</Dropdown.Item>
                    <Dropdown.Item onSelect={this.cycleGraph}>Cycle Graph</Dropdown.Item>
                    <Dropdown.Item onSelect={this.completeGraph}>Complete Graph</Dropdown.Item>
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
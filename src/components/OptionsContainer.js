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
        this.margulisExpander = this.margulisExpander.bind(this);
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
        this.props.initializeGraph(vertices,edges);
    }

    completeGraph() {
        const center = [window.innerWidth/4, window.innerHeight/3];
        const radius = window.innerWidth/9;
        let numberOfVertices = Number.parseInt(prompt("Please enter the number of vertices", 5));
        if (!Number.isInteger(numberOfVertices)) return;
        let vertices = [];
        let edges = [];
        for (let i = 0; i < numberOfVertices; i++){
            vertices[i] = [
                center[0]+radius*Math.cos(2*Math.PI*i/numberOfVertices),
                center[1]+radius*Math.sin(2*Math.PI*i/numberOfVertices)
            ];
        }
        // Fill edges with all possible non-oriented combinations
        for (let i = 0; i < numberOfVertices; i++){
            for (let j = i + 1; j < numberOfVertices; j++){
                edges.push([i,j]);
            }
        }
        this.props.initializeGraph(vertices,edges);
    }

    margulisExpander() {
        const first = [window.innerWidth/10, window.innerHeight/10];
        let m = Number.parseInt(prompt("Please enter a positive number m", 3));
        const space = window.innerWidth/(3.5*m);
        if (!Number.isInteger(m) && m > 1) return;
        let vertices = [];
        let edges = [];
        const toIndex = (x,y) => x*m+y;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < m; j++){
                vertices.push([
                    first[0] + space * i + ((Math.pow(j-m/2,2)+j) * 30/m),
                    first[1] + space * j + ((Math.pow(i-m/2,2)+i) * 30/m)
                ]);
                edges.push([toIndex(i,j),toIndex(i,(j+1)%m)]);
                edges.push([toIndex(i,j),toIndex((i+1)%m,j)]);
                edges.push([toIndex(i,j),toIndex(i,(i+j)%m)]);
                edges.push([toIndex(i,j),toIndex(m-j-1, i)]);
            }
        }
        // Remove loops and double edges
        let normalizedEdges = [];
        edges.forEach((edge) => {
            if (!normalizedEdges.some(e =>
                (e[0] === edge[0] && e[1] === edge[1]) ||
                (e[0] === edge[1] && e[1] === edge[0]) ||
                (edge[0] === edge[1])
            )) normalizedEdges.push(edge);
        });
        this.props.initializeGraph(vertices,normalizedEdges);
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
                    <Dropdown.Item onSelect={this.margulisExpander}>Margulis expander</Dropdown.Item>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeGraph, moveCanvas } from '../actions/graphActions';
import { Dropdown, ButtonGroup, Button, Row } from 'react-bootstrap';

class CreateGraphCard extends Component {
    constructor(...args) {
        super(...args);
        this.deleteGraph = this.deleteGraph.bind(this);
        this.cycleGraph = this.cycleGraph.bind(this);
        this.completeGraph = this.completeGraph.bind(this);
        this.margulisExpander = this.margulisExpander.bind(this);
        this.moveUp = () => this.props.moveCanvas(0, 50);
        this.moveDown = () => this.props.moveCanvas(0, -50);
        this.moveLeft = () => this.props.moveCanvas(50, 0);
        this.moveRight = () => this.props.moveCanvas(-50, 0);
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
        if (!Number.isInteger(numberOfVertices)) return;
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
        this.props.initializeGraph(vertices,edges);
    }

    render() {
        return (
            <Row>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" onClick={this.moveLeft}>Left</Button>
                    <Button variant="secondary" onClick={this.moveUp}>Up</Button>
                    <Button variant="secondary" onClick={this.moveDown}>Down</Button>
                    <Button variant="secondary" onClick={this.moveRight}>Right</Button>
                </ButtonGroup>
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
            </Row>
        )
    }
}

const mapStateToProps = state => ({
    ...state.graphReducer
});

const mapDispatchToProps = dispatch => ({
    initializeGraph: (vertices, edges) => dispatch(initializeGraph(vertices, edges)),
    moveCanvas: (dx, dy) => dispatch(moveCanvas(dx, dy))
});
  
export default connect(mapStateToProps, mapDispatchToProps) (CreateGraphCard);
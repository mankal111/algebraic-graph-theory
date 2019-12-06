import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import Vertex from './Vertex';
import Edge from './Edge';
import { connect } from 'react-redux';
import { addVertex, selectVertex, addEdge } from '../actions/graphActions';

class GraphCanvas extends Component {
    constructor(...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var {x, y} = this.refs.stage.getPointerPosition();
        this.props.selectVertex(null);
        this.props.addVertex(x, y);
    }

    render() {
        const { vertices, edges, selectedVertex, selectVertex, addEdge } = this.props;
        return (
            <Stage width={window.innerWidth} height={window.innerHeight} onClick={this.handleClick} ref="stage" >
                <Layer>
                    {
                        edges.map( (edge, index) =>
                            <Edge
                                key={index}
                                v1={vertices[edge[0]]}
                                v2={vertices[edge[1]]}
                            />
                        )
                    }
                </Layer>
                <Layer>
                    {
                        vertices.map( (vertice, index) => 
                            <Vertex
                                key={index}
                                x={vertice[0]}
                                y={vertice[1]}
                                index={index}
                                selectedVertex={selectedVertex}
                                selectVertex={selectVertex}
                                addEdge={addEdge}
                            />
                        )
                    }
                </Layer>
            </Stage>
        )
    }
}

const mapStateToProps = state => ({
    ...state.graphReducer
});

const mapDispatchToProps = dispatch => ({
    addVertex: (x,y) => dispatch(addVertex(x,y)),
    selectVertex: index => dispatch(selectVertex(index)),
    addEdge: (v1, v2) => dispatch(addEdge(v1, v2))
});
  
export default connect(mapStateToProps, mapDispatchToProps) (GraphCanvas);
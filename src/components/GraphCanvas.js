import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import Vertex from './Vertex';
import Edge from './Edge';
import { connect } from 'react-redux';
import { addVertex, selectVertex, updateVertex, addEdge } from '../actions/graphActions';

class GraphCanvas extends Component {
    constructor(...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        var {x, y} = this.refs.stage.getPointerPosition();
        this.props.selectVertex(null);
        if (e.evt.button === 0)
            this.props.addVertex(x, y);
    }

    render() {
        const { vertices, edges, selectedVertex, selectVertex, addEdge, updateVertex } = this.props;
        return (
            <Stage 
                width={window.innerWidth}
                height={window.innerHeight}
                onClick={this.handleClick}
                ref="stage"
                onContextMenu={(e) => e.evt.preventDefault()}
            >
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
                                updateVertex={updateVertex}
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
    addEdge: (v1, v2) => dispatch(addEdge(v1, v2)),
    updateVertex: (index, x, y) => dispatch(updateVertex(index, x, y))
});
  
export default connect(mapStateToProps, mapDispatchToProps) (GraphCanvas);
import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import Vertex from './Vertex';
import Edge from './Edge';
import { connect } from 'react-redux';
import { addVertex, deleteVertex, selectVertex, updateVertex, addEdge, deleteEdge } from '../actions/graphActions';

class GraphCanvas extends Component {
    constructor(...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        var {x, y} = this.refs.stage.getPointerPosition();
        // Deselect vertices when any mouse button is clicked in canvas(not on its elements)
        this.props.selectVertex(null);
        // Add vertex if left button is clicked
        if (e.evt.button === 0)
            this.props.addVertex(x, y);
    }

    render() {
        const { vertices, edges, selectedVertex, deleteVertex,
            selectVertex, addEdge, deleteEdge, updateVertex } = this.props;
        return (
            <Stage 
                width={window.innerWidth}
                height={window.innerHeight}
                onClick={this.handleClick}
                ref="stage"
                // Prevent context menu since we are using right click for deselecting and deleting
                onContextMenu={(e) => e.evt.preventDefault()}
            >
                <Layer>
                    {
                        edges.map( (edge, index) =>
                            <Edge
                                key={index}
                                index={index}
                                v1={vertices[edge[0]]}
                                v2={vertices[edge[1]]}
                                deleteEdge={deleteEdge}
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
                                deleteVertex={deleteVertex}
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
    deleteVertex: index => dispatch(deleteVertex(index)),
    selectVertex: index => dispatch(selectVertex(index)),
    addEdge: (v1, v2) => dispatch(addEdge(v1, v2)),
    deleteEdge: index => dispatch(deleteEdge(index)),
    updateVertex: (index, x, y) => dispatch(updateVertex(index, x, y))
});
  
export default connect(mapStateToProps, mapDispatchToProps) (GraphCanvas);
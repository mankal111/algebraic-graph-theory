import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import Vertex from './Vertex';
import Edge from './Edge';
import { connect } from 'react-redux';
import { addVertex, deleteVertex, selectVertex, updateVertex, addEdge,
    deleteEdge, moveCanvas } from '../actions/graphActions';

class GraphCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dragStartX: 0,
            dragStartY: 0
        }
        this.handleClick = this.handleClick.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
    }

    handleClick(e) {
        const {x: px, y: py} = this.refs.stage.getPointerPosition();
        const [cx, cy] = this.props.canvasPosition;
        // Deselect vertices when any mouse button is clicked in canvas(not on its elements)
        this.props.selectVertex(null);
        // Add vertex if left button is clicked
        if (e.evt.button === 0)
            // The coordinates of the new vertex are the pointer minus the canvas origin coordinates
            this.props.addVertex(px - cx, py - cy);
    }

    startDrag() {
        const {x, y} = this.refs.stage.getPointerPosition();
        // Keep coordinates of the pointer
        this.setState({dragStartX: x, dragStartY: y});
    }

    endDrag() {
        const {dragStartX, dragStartY} = this.state;
        const {x, y} = this.refs.stage.getPointerPosition();
        // Find distance of drag
        const dx = x - dragStartX;
        const dy = y - dragStartY;
        // Update store with the new coordinates
        this.props.moveCanvas(dx, dy);
    }

    render() {
        const { vertices, edges, selectedVertex, deleteVertex,
            selectVertex, addEdge, deleteEdge, updateVertex, canvasPosition } = this.props;
        return (
            <Stage 
                width={window.innerWidth}
                height={window.innerHeight}
                onClick={this.handleClick}
                draggable
                onDragStart={this.startDrag}
                onDragEnd={this.endDrag}
                x={canvasPosition[0]} y={canvasPosition[1]}
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
    updateVertex: (index, x, y) => dispatch(updateVertex(index, x, y)),
    moveCanvas: (dx, dy) => dispatch(moveCanvas(dx, dy))
});
  
export default connect(mapStateToProps, mapDispatchToProps) (GraphCanvas);
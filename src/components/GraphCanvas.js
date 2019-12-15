import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import { throttle } from 'lodash';
import Vertex from './Vertex';
import Edge from './Edge';
import { connect } from 'react-redux';
import { addVertex, deleteVertex, selectVertex, updateVertex, addEdge,
    deleteEdge, moveCanvas, zoomCanvas } from '../actions/graphActions';
import Icon from '@material-ui/core/Icon';

class GraphCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dragStartX: 0,
            dragStartY: 0,
            width: 0,
            height: 0,
        }
        this.handleClick = this.handleClick.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
        this.wheelListener = this.wheelListener.bind(this);
        // used throttle to call zoomCanvas only once every 1/10 second
        this.delayedZoomCanvas = throttle((x, y, zoom) => this.props.zoomCanvas(x, y, zoom), 100);
        this.zoomIn = () => this.props.zoomCanvas(
            this.state.width/2,
            this.state.height/2,
            1.5
        );
        this.zoomOut = () => this.props.zoomCanvas(
            this.state.width/2,
            this.state.height/2,
            0.75
        );
        // update stage size 
        this.updateSize = this.updateSize.bind(this);
        // used throttle to call updateSize only once every 1/2 second
        this.delayedUpdateSize = throttle(this.updateSize, 500);
    }

    componentDidMount(){
        window.addEventListener('resize', this.delayedUpdateSize);
        this.updateSize();
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.delayedUpdateSize);
    }

    updateSize(){
        const {width, height} = this.refs.container.getBoundingClientRect();
        this.setState({width, height});
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

     wheelListener(e) {
        const {x, y} = this.refs.stage.getPointerPosition();
        e.evt.preventDefault();
        // Zoom in or out by steps of 0.1
        if (e.evt.deltaY > 0)
            this.delayedZoomCanvas(x, y, 1.1);
        else if (e.evt.deltaY < 0)
            this.delayedZoomCanvas(x, y, 0.9);
     }

    render() {
        const { vertices, edges, selectedVertex, deleteVertex,
            selectVertex, addEdge, deleteEdge, updateVertex, canvasPosition } = this.props;
        return (
            <div ref='container' style={{height: '100%', position: 'relative'}}>
                <span style={{position: 'absolute', bottom: 0, right: 0, cursor: 'pointer', zIndex: 100}}>
                    <Icon onClick={this.zoomIn}>zoom_in</Icon>
                    <Icon onClick={this.zoomOut}>zoom_out</Icon>
                </span>
                <Stage
                    style={{border: "solid 1px"}}
                    width={this.state.width - 2}
                    height={this.state.height}
                    onClick={this.handleClick}
                    draggable
                    onDragStart={this.startDrag}
                    onDragEnd={this.endDrag}
                    onWheel={this.wheelListener}
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
            </div>
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
    moveCanvas: (dx, dy) => dispatch(moveCanvas(dx, dy)),
    zoomCanvas: (x, y, zoom) => dispatch(zoomCanvas(x, y, zoom))
});
  
export default connect(mapStateToProps, mapDispatchToProps) (GraphCanvas);
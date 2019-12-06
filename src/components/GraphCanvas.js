import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import Vertex from './Vertex';
import {connect} from 'react-redux';
import {addVertex} from '../actions/vertexActions';

class GraphCanvas extends Component {
    constructor(...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        var {x, y} = this.refs.stage.getPointerPosition();
        console.log(x,y)
        this.props.addVertex(x, y);
    }
    render() {
        const vertices = this.props.vertices;
        console.log(this.props.vertices)
        return (
            <Stage width={window.innerWidth} height={window.innerHeight} onClick={this.handleClick} ref="stage" >
                <Layer>
                    {
                        vertices.map( (vertice, key) => 
                            <Vertex
                                key={key}
                                x={vertice[0]}
                                y={vertice[1]}
                                index={key}
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
    addVertex: (x,y) => dispatch(addVertex(x,y))
});
  
export default connect(mapStateToProps, mapDispatchToProps) (GraphCanvas);
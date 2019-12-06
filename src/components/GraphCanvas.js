import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import Vertex from './Vertex';
import { connect } from 'react-redux';
import { addVertex, selectVertex } from '../actions/graphActions';

class GraphCanvas extends Component {
    constructor(...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var {x, y} = this.refs.stage.getPointerPosition();
        this.props.addVertex(x, y);
    }

    render() {
        const { vertices, selectedVertex, selectVertex } = this.props;

        return (
            <Stage width={window.innerWidth} height={window.innerHeight} onClick={this.handleClick} ref="stage" >
                <Layer>
                    {
                        vertices.map( (vertice, index) => 
                            <Vertex
                                key={index}
                                x={vertice[0]}
                                y={vertice[1]}
                                index={index}
                                selected={index === selectedVertex}
                                selectVertex={selectVertex}
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
    selectVertex: index => dispatch(selectVertex(index))
});
  
export default connect(mapStateToProps, mapDispatchToProps) (GraphCanvas);
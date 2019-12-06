import React, { Component } from 'react';
import { Circle } from 'react-konva';

class Vertex extends Component {
    constructor(...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.cancelBubble = true;
        if (this.props.selected)
            this.props.selectVertex(null);
        else
            this.props.selectVertex(this.props.index);
    }

    render() {
        return (
            <Circle
                x={this.props.x} y={this.props.y} radius={6}
                fill={this.props.selected ? 'red' : 'blue'}
                stroke={'black'}
                strokeWidth={2}
                onClick={this.handleClick}
                draggable={true}
            />
        )
    }
}
  
export default Vertex;
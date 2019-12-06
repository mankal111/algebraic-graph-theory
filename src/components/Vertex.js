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
                x={this.props.x} y={this.props.y}
                radius={this.props.selected ? 8 : 6}
                fill={'blue'}
                stroke={'black'}
                strokeWidth={this.props.selected ? 2 : 1}
                onClick={this.handleClick}
                draggable={true}
                shadowColor={'black'}
                shadowBlur={this.props.selected ? 4 : 2}
                shadowOffset={this.props.selected ? {x: 2, y: 2 } : {x: 1, y: 1 }}
                shadowOpacity={0.5}
            />
        )
    }
}
  
export default Vertex;
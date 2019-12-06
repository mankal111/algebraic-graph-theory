import React, { Component } from 'react';
import { Circle } from 'react-konva';

class Vertex extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            color: 'blue'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.cancelBubble = true;
    }

    render() {
        return (
            <Circle
                x={this.props.x} y={this.props.y} radius={6}
                fill={this.state.color}
                stroke={'black'}
                strokeWidth={2}
                onClick={this.handleClick}
                draggable={true}
            />
        )
    }
}

export default Vertex;
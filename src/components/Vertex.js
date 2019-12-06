import React, { Component } from 'react';
import { Circle } from 'react-konva';

class Vertex extends Component {
    constructor(...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.cancelBubble = true;
        const {index, selectedVertex, selectVertex, addEdge} = this.props
        console.log(this.props)
        if (index === selectedVertex)
            selectVertex(null);
        else if (selectedVertex)
            addEdge(selectedVertex, index);
        else
            selectVertex(index);
    }

    render() {
        const isSelected = this.props.index === this.props.selectedVertex;
        return (
            <Circle
                x={this.props.x} y={this.props.y}
                radius={isSelected ? 8 : 6}
                fill={'blue'}
                stroke={'black'}
                strokeWidth={isSelected ? 2 : 1}
                onClick={this.handleClick}
                draggable={true}
                shadowColor={'black'}
                shadowBlur={isSelected ? 4 : 2}
                shadowOffset={isSelected ? {x: 2, y: 2 } : {x: 1, y: 1 }}
                shadowOpacity={0.5}
            />
        )
    }
}
  
export default Vertex;
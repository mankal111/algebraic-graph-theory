import React, { Component } from 'react';
import { Circle } from 'react-konva';
import { throttle } from 'lodash';

class Vertex extends Component {
    constructor(...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
        this.onDrag = this.onDrag.bind(this);
        // used throttle to prevent too many updates
        this.delayedUpdateVertex = throttle((i,x,y) => this.props.updateVertex(i,x,y), 50);
    }

    handleClick(e){
        e.cancelBubble = true;
        const {index, selectedVertex, selectVertex, deleteVertex, addEdge} = this.props;
        if (e.evt.button === 0) {
            if (index === selectedVertex)
                selectVertex(null);
            else if (selectedVertex !== null)
                addEdge(selectedVertex, index);
            else
                selectVertex(index);
        } else if (e.evt.button === 2) {
            deleteVertex(index);
        }
    }

    onDrag(e){
        this.delayedUpdateVertex(this.props.index, e.target.x(), e.target.y());
    }

    render() {
        const isSelected = this.props.index === this.props.selectedVertex;
        return (
            <Circle
                x={this.props.x} y={this.props.y}
                radius={isSelected ? 8 : 6}
                fill={'blue'}
                stroke={isSelected ? 'LimeGreen' : 'black'}
                strokeWidth={isSelected ? 4 : 1}
                onClick={this.handleClick}
                draggable={true}
                shadowColor={'black'}
                shadowBlur={isSelected ? 4 : 2}
                shadowOffset={isSelected ? {x: 2, y: 2 } : {x: 1, y: 1 }}
                shadowOpacity={0.5}
                onDragMove={this.onDrag}
                // Allow click 20 pixels around vertex
                hitStrokeWidth={20}
            />
        )
    }
}
  
export default Vertex;
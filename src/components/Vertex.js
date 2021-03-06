import React, { Component } from 'react';
import { Circle, Group, Text } from 'react-konva';
import { throttle } from 'lodash';

class Vertex extends Component {
    constructor(...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.leftClick = this.leftClick.bind(this);
        // used throttle to prevent too many updates
        this.delayedUpdateVertex = throttle((i,x,y) => this.props.updateVertex(i,x,y), 50);
        // prevent this event from reaching stage
        this.dragEnd = e => e.cancelBubble = true;
    }

    leftClick(){
        const {index, selectedVertex, selectVertex, addEdge} = this.props;
        if (index === selectedVertex)
                selectVertex(null);
            else if (selectedVertex !== null)
                addEdge(selectedVertex, index);
            else
                selectVertex(index);
    }

    handleClick(e){
        e.cancelBubble = true;
        const {index, deleteVertex} = this.props;
        if (e.evt.button === 0) {
            this.leftClick(e);
        } else if (e.evt.button === 2) {
            deleteVertex(index);
        }
    }

    onDrag(e){
        this.delayedUpdateVertex(this.props.index, e.target.x(), e.target.y());
    }

    render() {
        const {x, y, index, selectedVertex} = this.props
        const isSelected = index === selectedVertex;
        return (
            <Group>
                <Text
                    x={x + 8}
                    y={y + 8}
                    text={index + 1}
                    fill={'black'}
                    fontFamily={'ArialBlack'}
                    fontStyle={'bold'}
                />
                <Circle
                    x={x} y={y}
                    radius={isSelected ? 8 : 6}
                    fill={'blue'}
                    stroke={isSelected ? 'LimeGreen' : 'black'}
                    strokeWidth={isSelected ? 4 : 1}
                    onClick={this.handleClick}
                    onTouchStart={this.leftClick}
                    draggable={true}
                    shadowColor={'black'}
                    shadowBlur={isSelected ? 4 : 2}
                    shadowOffset={isSelected ? {x: 2, y: 2 } : {x: 1, y: 1 }}
                    shadowOpacity={0.5}
                    onDragMove={this.onDrag}
                    onDragEnd={this.dragEnd}
                    // Allow click 20 pixels around vertex
                    hitStrokeWidth={20}
                />
            </Group>
        )
    }
}
  
export default Vertex;
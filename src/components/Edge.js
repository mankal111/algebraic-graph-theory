import React, { Component } from 'react';
import { Line } from 'react-konva';

class Edge extends Component {
    constructor(...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        const {index, deleteEdge} = this.props;
        // Remove edge on right click
        if (e.evt.button === 2)
            deleteEdge(index);
    }

    render() {
        const {v1, v2} = this.props;
        return (
            <Line
                points={[v1[0], v1[1], v2[0], v2[1]]}
                stroke={'black'}
                strokeWidth={5}
                onClick={this.handleClick}
                shadowColor={'black'}
                shadowBlur={2}
                shadowOffset={{x: 1, y: 1 }}
                shadowOpacity={0.5}
                // Allow click 20 pixels around edge
                hitStrokeWidth={20}
            />
        )
    }
}
  
export default Edge;
import React, { Component } from 'react';
import { Line } from 'react-konva';

class Edge extends Component {
    constructor(...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.cancelBubble = true;
    }

    render() {
        const {v1, v2} = this.props;
        return (
            <Line
                points={[v1[0], v1[1], v2[0], v2[1]]}
                stroke={'black'}
                strokeWidth={3}
                onClick={this.handleClick}
                shadowColor={'black'}
                shadowBlur={2}
                shadowOffset={{x: 1, y: 1 }}
                shadowOpacity={0.5}
            />
        )
    }
}
  
export default Edge;
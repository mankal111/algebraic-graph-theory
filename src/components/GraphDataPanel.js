import React, { Component } from 'react';
import { connect } from 'react-redux';
import VESetsCard from './VESetsCard';
import AdjacencyMatrixCard from './AdjacencyMatrixCard';

class GraphDataPanel extends Component {
    shouldComponentUpdate(nextProps){
        // The data in this component change only if a vertex or a edge is added or deleted.
        return nextProps.vertices.length !== this.props.vertices.length ||
            nextProps.edges.length !== this.props.edges.length;
    }

    render() {
        const {vertices, edges} = this.props;
        return (
            <div>
                <VESetsCard vertices={vertices} edges={edges} />
                <AdjacencyMatrixCard vertices={vertices} edges={edges} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.graphReducer
});
  
export default connect(mapStateToProps, null) (GraphDataPanel);
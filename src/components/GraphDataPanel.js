import React, { Component } from 'react';
import { connect } from 'react-redux';
import VESetsCard from './VESetsCard';

class GraphDataPanel extends Component {
    render() {
        const {vertices, edges} = this.props;
        return (
            <div>
                <VESetsCard vertices={vertices} edges={edges} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.graphReducer
});
  
export default connect(mapStateToProps, null) (GraphDataPanel);
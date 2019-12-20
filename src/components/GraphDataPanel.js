import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adjacencyMatrix, degreeMatrix, laplacianMatrix,
    symNorLaplacianMatrix } from '../matrix';
import GraphRepresentation from './GraphRepresentation';
import CharPolAndSpectrum from './CharPolAndSpectrum';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
class GraphDataPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            representation: 'Adjacency',
        }
        this.setRepresentation = this.setRepresentation.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        // The data in this component change only if a vertex or a edge is added or deleted.
        return nextProps.vertices.length !== this.props.vertices.length ||
            nextProps.edges.length !== this.props.edges.length ||
            nextState.representation !== this.state.representation;
    }

    getMatrixRepresentation(representation, verticesLength, edges, exprStyle){
        let matrix;
        switch(representation) {
            case 'Degree':
                matrix = degreeMatrix(verticesLength, edges);
                break;
            case 'Laplacian':
                matrix = laplacianMatrix(verticesLength, edges);
                break;
            case 'SNLaplacian':
                matrix = symNorLaplacianMatrix(verticesLength, edges, exprStyle);
                break;
            case 'Adjacency':
            default:
                matrix = adjacencyMatrix(verticesLength, edges);
        }
        return matrix;
    }

    setRepresentation(r){
        this.setState({representation: r});
    }

    render() {
        const {vertices, edges} = this.props;
        const {representation} = this.state;
        return (
            <div>
                <Typography gutterBottom variant="h5">
                    Graph representation
                </Typography>
                <Divider variant="middle" style={{margin: '16px'}} />
                <GraphRepresentation
                    matrix={this.getMatrixRepresentation(representation, vertices.length, edges, 'latex')}
                    representation={this.state.representation}
                    setRepresentation={this.setRepresentation}
                />
                <Divider variant="middle" style={{margin: '16px'}} />
                <CharPolAndSpectrum
                    matrix={this.getMatrixRepresentation(representation, vertices.length, edges, 'approx')}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.graphReducer
});
  
export default connect(mapStateToProps, null) (GraphDataPanel);
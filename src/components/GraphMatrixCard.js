import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
import { Card, Collapse, Alert, Dropdown, DropdownButton } from 'react-bootstrap';
import { arrayToLatexMatrix, adjacencyMatrix, degreeMatrix, laplacianMatrix } from '../matrix';

export default function GraphMatrixCard({ vertices, edges }){
    const [open, setOpen] = useState(true);
    const [type, setType] = useState('Adjacency');
    // Create the latex text that describes the adjacencyMatrix
    let latexMatrix;
    switch(type) {
        case 'Degree':
            latexMatrix = arrayToLatexMatrix(degreeMatrix(vertices.length, edges));
            break;
        case 'Laplacian':
            latexMatrix = arrayToLatexMatrix(laplacianMatrix(vertices.length, edges));
            break;
        case 'Adjacency':
        default:
            latexMatrix = arrayToLatexMatrix(adjacencyMatrix(vertices.length, edges));
    }
    return (
        <Card>
            <Card.Header
                onClick={() => setOpen(!open)}
                aria-controls="GraphMatrix"
                aria-expanded={open}
            >
                Graph Matrices
            </Card.Header>
            <Collapse in={open}>
                <Card.Body id="GraphMatrix">
                <DropdownButton id="dropdown-basic-button" title={type}>
                    <Dropdown.Item onClick={() => setType('Adjacency')}>Adjacency</Dropdown.Item>
                    <Dropdown.Item onClick={() => setType('Degree')}>Degree</Dropdown.Item>
                    <Dropdown.Item onClick={() => setType('Laplacian')}>Laplacian</Dropdown.Item>
                </DropdownButton>
                {
                    (vertices.length < 14) ?
                    (<InlineMath math={latexMatrix}/>) :
                    (<Alert variant={'warning'}>The matrix is too big to show it here.<br/> But you can still download it.</Alert>)
                }
                </Card.Body>
            </Collapse>
        </Card>
    );
}
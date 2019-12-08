import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
import { Card, Collapse } from 'react-bootstrap';
import { arrayToLatexMatrix } from '../matrix';

export default function AdjacencyMatrixCard({ vertices, edges }){
    const [open, setOpen] = useState(true);
    // Create a new matrix with zeros
    let matrix = Array(vertices.length).fill().map(() => Array(vertices.length).fill(0));
    // Put 1 in matrix for every edge
    for (let i=0; i < edges.length; i++) {
        matrix[edges[i][0]][edges[i][1]] = 1;
        matrix[edges[i][1]][edges[i][0]] = 1;
    }
    return (
        <Card>
            <Card.Header
                onClick={() => setOpen(!open)}
                aria-controls="AdjMatrix"
                aria-expanded={open}
            >
                Adjacency Matrix
            </Card.Header>
            <Collapse in={open}>
                <Card.Body id="AdjMatrix">
                <InlineMath math={arrayToLatexMatrix(matrix)}/>
                </Card.Body>
            </Collapse>
        </Card>
    );
}
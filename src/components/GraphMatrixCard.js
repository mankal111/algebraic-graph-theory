import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
import { Card, Collapse } from 'react-bootstrap';
import { arrayToLatexMatrix, adjacencyMatrix } from '../matrix';

export default function GraphMatrixCard({ vertices, edges }){
    const [open, setOpen] = useState(true);
    // Create the latex text that describes the adjacencyMatrix
    let latexAdjMatrix = arrayToLatexMatrix(adjacencyMatrix(vertices.length, edges));
    return (
        <Card>
            <Card.Header
                onClick={() => setOpen(!open)}
                aria-controls="GraphMatrix"
                aria-expanded={open}
            >
                Graph Matrix
            </Card.Header>
            <Collapse in={open}>
                <Card.Body id="GraphMatrix">
                <InlineMath math={latexAdjMatrix}/>
                </Card.Body>
            </Collapse>
        </Card>
    );
}
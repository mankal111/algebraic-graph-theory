import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
import { Card, Collapse } from 'react-bootstrap';
import { charAndSpecLatex, adjacencyMatrix } from '../matrix';

export default function CharPolAndSpecCard({ vertices, edges }){
    const [open, setOpen] = useState(true);
    // Create the latex text that describes the adjacencyMatrix
    let adjMatrix = adjacencyMatrix(vertices.length, edges);
    let { characteristicPolynomial, spectrum } = charAndSpecLatex(adjMatrix);
    return (
        <Card>
            <Card.Header
                onClick={() => setOpen(!open)}
                aria-controls="CPASC"
                aria-expanded={open}
            >
                Characteristic polynomial and spectrum
            </Card.Header>
            <Collapse in={open}>
                <Card.Body id="CPASC">
                <InlineMath math={characteristicPolynomial}/>
                <br/>
                <InlineMath math={spectrum}/>
                </Card.Body>
            </Collapse>
        </Card>
    );
}
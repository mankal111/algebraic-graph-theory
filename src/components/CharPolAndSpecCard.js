import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
import { Card, Collapse } from 'react-bootstrap';
import { charAndSpecLatex, adjacencyMatrix } from '../matrix';

export default function CharPolAndSpecCard({ vertices, edges }){
    const [open, setOpen] = useState(false);
    // Create the latex text that describes the adjacencyMatrix
    let adjMatrix = adjacencyMatrix(vertices.length, edges);
    let charAndSpecLatexObj = {};
    if (edges.length<20){
        charAndSpecLatexObj = charAndSpecLatex(adjMatrix);
    } else {
        charAndSpecLatexObj = {
            characteristicPolynomial: '\\text{I will not try to compute the characteristic polynomial.}',
            spectrum: '\\text{The computation would take long time in your browser.}'
        };
    }
    let {characteristicPolynomial, spectrum} = charAndSpecLatexObj;
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
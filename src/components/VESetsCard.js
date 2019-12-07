import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import {InlineMath} from "react-katex";
import { Card, Collapse } from 'react-bootstrap';

export default function VESetsCard({ vertices, edges }){
    const [open, setOpen] = useState(true);

    return (
        <Card>
            <Card.Header
                onClick={() => setOpen(!open)}
                aria-controls="VAndESets"
                aria-expanded={open}
            >
                Vertex and Edge sets of the graph
            </Card.Header>
            <Collapse in={open}>
                <Card.Body id="VAndESets">
                    <InlineMath math={`V\\Gamma=\\{`}/>
                    {vertices.map((v,i) => <InlineMath key={i} math={`v_{${i+1}}${i<vertices.length-1?',':''}`}/>)}
                    <InlineMath math={`\\}`} />
                    <br/>
                    <InlineMath math={`E\\Gamma=\\{`}/>
                    {edges.map((v,i) => <InlineMath key={i} math={`\\{v_${v[0]+1}, v_{${v[1]+1}}\\}${i<edges.length-1?',':''}`}/>)}
                    <InlineMath math={`\\}`} />
                </Card.Body>
            </Collapse>
        </Card>
    );
}
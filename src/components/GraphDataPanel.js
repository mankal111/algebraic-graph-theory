import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'katex/dist/katex.min.css';
import {InlineMath} from "react-katex";

class GraphDataPanel extends Component {
    render() {
        const {vertices, edges} = this.props;
        return (
            <div>
                <InlineMath math={`V\\Gamma=\\{`}/>
                {vertices.map((v,i) => <InlineMath key={i} math={`v_{${i+1}}${i<vertices.length-1?',':''}`}/>)}
                <InlineMath math={`\\}`} />
                <br/>
                <InlineMath math={`E\\Gamma=\\{`}/>
                {edges.map((v,i) => <InlineMath key={i} math={`\\{v_${v[0]+1}, v_{${v[1]+1}}\\}${i<edges.length-1?',':''}`}/>)}
                <InlineMath math={`\\}`} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.graphReducer
});
  
export default connect(mapStateToProps, null) (GraphDataPanel);
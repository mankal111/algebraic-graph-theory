const initialState = {
    vertices: [],
    edges: [],
    selectedVertex: null,
    canvasPosition: [0, 0]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_VERTEX':
            const {x, y} = action;
            return {
                ...state,
                vertices:
                    [
                        ...state.vertices, [x, y]
                    ]
            }
        case 'SELECT_VERTEX':
            const { index } = action;
            return {
                ...state,
                selectedVertex: index
            }
        case 'DELETE_VERTEX':
            {
                const {index} = action;
                const {vertices, edges, selectedVertex} = state;

                return {
                    ...state,
                    vertices: vertices.filter((v, i) => i !== index),
                    edges: edges
                        // Remove all edges containing the vertex
                        .filter(v => v[0] !== index && v[1] !== index)
                        // Transpose all indices above the deleted one
                        .map(
                            v =>
                            [
                                v[0] > index ? v[0] - 1 : v[0],
                                v[1] > index ? v[1] - 1 : v[1]
                            ]
                        ),
                    // If the deleted vertex was the selected one, deselect it
                    // if not, update its value
                    selectedVertex: selectedVertex === index ?
                        null :
                        selectedVertex > index ? selectedVertex - 1 : selectedVertex
                }
            }
        case 'UPDATE_VERTEX':
            {
                const {index, x, y} = action;
                const newVertices = [...state.vertices];
                newVertices[index][0] = x;
                newVertices[index][1] = y;
                return {
                    ...state,
                    vertices: newVertices
                }
            }
        case 'ADD_EDGE':
            let {v1, v2} = action;
            if (state.edges.some(a => a[0]===v1 && a[1]===v2))
                return state;
            else
                return {
                    ...state,
                    edges:
                        [
                            ...state.edges, [v1, v2]
                        ]
                }
        case 'DELETE_EDGE':
            {
                const {index} = action;
                const {edges} = state;
                return {
                    ...state,
                    edges:
                        edges.filter((v, i) => i !== index)
                }
            }
        case 'INITIALIZE_GRAPH':
            return {
                ...state,
                vertices: action.vertices,
                edges: action.edges,
                selectedVertex: null
            }
        case 'MOVE_CANVAS':
            {
                const {dx, dy} = action;
                const [x, y] = state.canvasPosition;
                return {
                    ...state,
                    canvasPosition: [x + dx, y + dy]
                }
            }
        default:
            return state
    }
}
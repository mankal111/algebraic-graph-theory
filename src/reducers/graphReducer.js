const initialState = {
    vertices: [],
    edges: [],
    selectedVertex: null
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
        default:
            return state
    }
}
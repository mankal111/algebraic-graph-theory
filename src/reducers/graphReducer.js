const initialState = {
    vertices: [],
    edges: [],
    selectedVertex: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_VERTEX':
            let {x, y} = action;
            return {
                ...state,
                vertices:
                    [
                        ...state.vertices, [x, y]
                    ]
            }
        case 'SELECT_VERTEX':
            let { index } = action;
            return {
                ...state,
                selectedVertex: index
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
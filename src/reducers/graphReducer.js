const initialState = {
    vertices: [],
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
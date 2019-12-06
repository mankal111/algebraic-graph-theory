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
        default:
            return state
    }
}
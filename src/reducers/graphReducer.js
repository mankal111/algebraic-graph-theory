export default (state = { vertices: [] }, action) => {
    switch (action.type) {
        case 'ADD_VERTEX':
            let {x,y} = action;
            return {
                vertices:
                    [
                        ...state.vertices, [x,y]
                    ]
            }
        default:
            return state
    }
}
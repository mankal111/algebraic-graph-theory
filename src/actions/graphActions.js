export const addVertex = (x, y) => dispatch => {
    dispatch({
        type: 'ADD_VERTEX',
        x,
        y
    });
}

export const selectVertex = (index) => dispatch => {
    dispatch({
        type: 'SELECT_VERTEX',
        index
    });
}

export const updateVertex = (index, x, y) => dispatch => {
    dispatch({
        type: 'UPDATE_VERTEX',
        index,
        x,
        y
    });
}

export const addEdge = (v1, v2) => dispatch => {
    dispatch({
        type: 'ADD_EDGE',
        v1,
        v2
    });
}

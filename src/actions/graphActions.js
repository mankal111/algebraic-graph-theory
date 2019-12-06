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

export const addEgde = (v1, v2) => dispatch => {
    dispatch({
        type: 'ADD_EDGE',
        v1,
        v2
    });
}

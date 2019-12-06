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
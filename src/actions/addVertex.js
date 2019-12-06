export const addVertex = (x, y) => dispatch => {
    dispatch({
        type: 'ADD_VERTEX',
        x,
        y
    })
}
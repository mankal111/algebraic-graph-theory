export const addVertex = (x, y) => dispatch => {
    dispatch({
        type: 'ADD_VERTEX',
        x,
        y
    });
}

export const deleteVertex = (index) => dispatch => {
    dispatch({
        type: 'DELETE_VERTEX',
        index
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

export const deleteEdge = (index) => dispatch => {
    dispatch({
        type: 'DELETE_EDGE',
        index
    });
}

export const initializeGraph = (vertices, edges) => dispatch => {
    dispatch({
        type: 'INITIALIZE_GRAPH',
        vertices,
        edges
    });
}

export const moveCanvas = (dx, dy) => dispatch => {
    dispatch({
        type: 'MOVE_CANVAS',
        dx,
        dy
    });
}

export const zoomCanvas = (x, y, zoom) => dispatch => {
    dispatch({
        type: 'ZOOM_CANVAS',
        x,
        y,
        zoom
    });
}

export const arrayToLatexMatrix = (array) =>
    `\\begin{vmatrix}${array.map(row => row.join('&')).join('\\\\')}\\end{vmatrix}`;

export const zeros = (h, w) =>
    Array(h).fill().map(() => Array(w).fill(0));

export const adjacencyMatrix = (numberOfVertices, arrayOfEdges) => {
    // Create a new matrix with zeros
    let matrix = zeros(numberOfVertices, numberOfVertices);
    // Put 1 in matrix for every edge
    for (let i=0; i < arrayOfEdges.length; i++) {
        matrix[arrayOfEdges[i][0]][arrayOfEdges[i][1]] = 1;
        matrix[arrayOfEdges[i][1]][arrayOfEdges[i][0]] = 1;
    }
    return matrix;
}
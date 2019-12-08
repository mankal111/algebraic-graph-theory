import { create, all } from 'mathjs';

const config = { };
const math = create(all, config);


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

export const minorMatrix = (array, i, j) => {
    return array
        // Get all the rows leaving out the ith
        .filter((row, index) => index !== i)
        // In each row get all elements leaving out the jth
        .map(row => row.filter((el,index) => index !== j));
}

// This is not the fastest algorithm for finding the determinant
export const determinant = (array) => {
    if (array.length === 1) {
        // In 1X1 the determinant is the unique element
        return array[0][0];
    } else if (array.length === 2) {
        // In 2X2 the following is the determinant. We will use it as
        // the first step in this recursive method.
        return array[0][0]*array[1][1] - array[0][1]*array[1][0];
    }
    let det = 0;
    for (let i = 0; i < array.length; i++){
        det += Math.pow(-1, i)*array[0][i]*determinant(minorMatrix(array,0,i));
    }
    return det;
}

// Returns the determinant expression which will be used
// for the computation of the characterestic polynomial
export const determinantExpression = (array) => {
    if (array.length === 1) {
        // In 1X1 the determinant is the unique element
        return array[0][0];
    } else if (array.length === 2) {
        // In 2X2 the following is the determinant. We will use it as
        // the first step in this recursive method.
        return `${array[0][0]}*${array[1][1]}-${array[0][1]}*${array[1][0]}`;
    }
    let det = '';
    for (let i = 0; i < array.length; i++){
        det += `${Math.pow(-1, i) < 0 ? '-' : '+'}*${array[0][i]}*(${determinant(minorMatrix(array,0,i))})`;
    }
    return math.evaluate(math.parse(det)).toString();
}

export const characteristicPolynomial = (array) => {
    // Clone given array
    let matrix = [...array];
    // Add -l to the diagonal
    for (let i=0; i < matrix.length; i++){
        matrix[i][i] = 't';
    }
    return determinantExpression(matrix);
}
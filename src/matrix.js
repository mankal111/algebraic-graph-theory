import { create, all } from 'mathjs';
import  algebra from 'algebra.js';

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
export const determinantExpressionObject = (array) => {
    if (array.length === 1) {
        // In 1X1 the determinant is the unique element
        return array[0][0];
    } else if (array.length === 2) {
        // In 2X2 the following is the determinant. We will use it as
        // the first step in this recursive method.
        return array[0][0].multiply(array[1][1]).subtract(array[0][1].multiply(array[1][0]));
    }
    let det = new algebra.Expression(0);
    for (let i = 0; i < array.length; i++){
        let exp = new algebra.Expression(Math.pow(-1, i));
        exp = exp.multiply(array[0][i]);
        exp = exp.multiply(determinantExpressionObject(minorMatrix(array,0,i)));
        det = det.add(exp);
    }
    return det;
}

export const determinantExpressionString = (array) =>
    determinantExpressionObject(array).toString();

export const determinantExpressionLatex = (array) =>
    algebra.toTex(determinantExpressionObject(array));

export const convertArrayToObjectMatrix = (array) => {
    // Convert array to algebra.Expression matrix
    let matrix = [];
    for (let i=0; i < array.length; i++){
        matrix[i] = [];
        for (let j=0; j < array.length; j++) {
            matrix[i][j] = new algebra.Expression(array[i][j]);
        }
    }
    return matrix;
}

export const characteristicPolynomialLatex = (array) => {
    let matrix = convertArrayToObjectMatrix(array);
    // Subtract t from the diagonal
    for (let i=0; i < matrix.length; i++){
        matrix[i][i] = matrix[i][i].subtract('t');
    }
    return determinantExpressionLatex(matrix);
}
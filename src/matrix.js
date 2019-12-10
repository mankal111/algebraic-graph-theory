import algebra from 'algebra.js';
const Algebrite = require('algebrite');

export const arrayToLatexMatrix = (array) =>
    `\\begin{bmatrix}${array.map(row => row.join('&')).join('\\\\')}\\end{bmatrix}`;

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
        if (array[0][i].toString() !== '0') {
            let exp = new algebra.Expression(Math.pow(-1, i));
            exp = exp.multiply(array[0][i]);
            exp = exp.multiply(determinantExpressionObject(minorMatrix(array,0,i)));
            det = det.add(exp);
        }
    }
    return det;
}

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

export const roundComplex = n => {
    // Function that rounds a number to at most 2 decimal places
    const roundToTwoD = n => Math.round(n * 100) / 100;
    // If the expression contains 'i', it is complex
    if (n.includes('i')){
        // Extract the two numbers of the expression
        const [real, imaginary] = n.match(/[+-]*\d*\.?\d+/g).map(x => roundToTwoD(x));
        // If imaginary is undefined it means that there is no real,
        // and the imaginary is in the first position
        if (imaginary === undefined) return `${real}i`;
        // If imaginary is 0 then just return the real part
        if (imaginary === 0) return real;
        // If the real part is 0 just return the imaginary
        if (real === 0) return `${imaginary}i`;
        // Else return the complex
        return `${real}${imaginary > 0 ? '+' : ''}${imaginary}i`;
    }
    return roundToTwoD(n);
}

export const getRootsFromObject = (obj) => {
    // Get the roots of the polynomial
    return Algebrite.run(`nroots(${obj.toString()})`)
        .toString()
        // remove '[', ']' and '...'
        .replace(/(\[|\]|\.\.\.)/g, '')
        // split the numbers
        .split(',')
        // and round them
        .map(n => roundComplex(n));
}

export const characteristicPolynomialObject = (array) => {
    let matrix = convertArrayToObjectMatrix(array);
    // Subtract t from the diagonal
    for (let i=0; i < matrix.length; i++){
        matrix[i][i] = matrix[i][i].subtract('t');
    }
    return determinantExpressionObject(matrix);
}

export const spectrumMatrixLatex = (charObj) => {
    const eigenvalues = getRootsFromObject(charObj);
    const spectrum = [...new Set(eigenvalues)].map(
        x => [x, eigenvalues.filter(y => y === x).length]
      );
    return `\\begin{bmatrix}${spectrum.map(row => row[0]).join('&')}\\\\${spectrum.map(row => row[1]).join('&')}\\end{bmatrix}`;
}

// since the computation of the characteristic polynomial is very complex, this function
// will return characteristic polynomial and spectrum at the same time
export const charAndSpecLatex = (array) => {
    const charPolObj = characteristicPolynomialObject(array);
    return {
        characteristicPolynomial: algebra.toTex(charPolObj),
        spectrum: spectrumMatrixLatex(charPolObj)
    }
}
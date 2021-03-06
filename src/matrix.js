import algebra from 'algebra.js';
const Algebrite = require('algebrite');

export const arrayToLatexMatrix = (array) =>
    arrayToTextMatrix(array, '\\begin{bmatrix}', '\\end{bmatrix}', '&', '\\\\');

export const arrayToTextMatrix = (array, start, end, elSep, lineSep) =>
    `${start}${array.map(row => row.join(elSep)).join(lineSep)}${end}`;

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

export const degreeMatrix = (numberOfVertices, arrayOfEdges) => {
    // Create a new matrix with zeros
    let matrix = zeros(numberOfVertices, numberOfVertices);
    // Put 1 in the diagonal for each vertex of every edge
    for (let i=0; i < arrayOfEdges.length; i++) {
        matrix[arrayOfEdges[i][0]][arrayOfEdges[i][0]] += 1;
        matrix[arrayOfEdges[i][1]][arrayOfEdges[i][1]] += 1;
    }
    return matrix;
}

export const laplacianMatrix = (numberOfVertices, arrayOfEdges) => {
    const adj = adjacencyMatrix(numberOfVertices, arrayOfEdges);
    const deg = degreeMatrix(numberOfVertices, arrayOfEdges);
    let laplacianMatrix = [];
    for (let i = 0; i < numberOfVertices; i++) {
        laplacianMatrix[i] = [];
        for (let j = 0; j < numberOfVertices; j++) {
            laplacianMatrix[i][j] = deg[i][j] - adj[i][j];
        }
    }
    return laplacianMatrix;
}

export const symNorLaplacianMatrix = (
    numberOfVertices,
    arrayOfEdges,
    expressions = 'approximate'
) => {
    const adj = adjacencyMatrix(numberOfVertices, arrayOfEdges);
    const deg = degreeMatrix(numberOfVertices, arrayOfEdges);
    const simplifiedLatexSqrt = (n) => {
        if (n === 1) return 1;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--){
            let r = n/(i*i);
            if(Number.isInteger(r)){
                return `${i}${(r !== 1) ? `\\sqrt{${n/(i*i)}}` : ''}`;
            }
        }
        return `\\sqrt{${n}}`;
    }
    const simplifiedMatlabSqrt = (n) => {
        if (n === 1) return 1;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--){
            let r = n/(i*i);
            if(Number.isInteger(r)){
                if (r !== 1)
                    return `(${i}*sqrt(${n/(i*i)}))`;
                else
                    return i;
            }
        }
        return `sqrt(${n})`;
    }
    let SNLMatrix = [];
    for (let i = 0; i < numberOfVertices; i++) {
        SNLMatrix[i] = [];
        for (let j = 0; j < numberOfVertices; j++) {
            if (i === j) {
                SNLMatrix[i][j] = 1;
            } else if (adj[i][j] === 0) {
                SNLMatrix[i][j] = 0;
            } else if (deg[i][i]*deg[j][j] === 1) {
                SNLMatrix[i][j] = -1;
            } else {
                switch (expressions){
                    case 'latex':
                        SNLMatrix[i][j] =
                            `\\frac{${-adj[i][j]}}{${simplifiedLatexSqrt(deg[i][i]*deg[j][j])}}`;
                        break;
                    case 'mathematica':
                        SNLMatrix[i][j] = `${-adj[i][j]}/Sqrt[${deg[i][i]*deg[j][j]}]`;
                        break;
                    case 'python':
                        SNLMatrix[i][j] = `${-adj[i][j]}/math.sqrt(${deg[i][i]*deg[j][j]})`;
                        break;
                    case 'matlab':
                        SNLMatrix[i][j] = `${-adj[i][j]}/${simplifiedMatlabSqrt(deg[i][i]*deg[j][j])}`;
                        break;
                    case 'approximate':
                    default:
                        SNLMatrix[i][j] =
                            Math.round(((-adj[i][j])/(Math.sqrt(deg[i][i]*deg[j][j]))) * 100) / 100;
                } 
            }
        }
    }
    return SNLMatrix;
}

//Not used yet
export const rWNorLaplacianMatrix = (numberOfVertices, arrayOfEdges) => {
    const adj = adjacencyMatrix(numberOfVertices, arrayOfEdges);
    const deg = degreeMatrix(numberOfVertices, arrayOfEdges);
    let rWNLMatrix = [];
    for (let i = 0; i < numberOfVertices; i++) {
        rWNLMatrix[i] = [];
        for (let j = 0; j < numberOfVertices; j++) {
            if (i === j) {
                rWNLMatrix[i][j] = 1;
            } else {
                rWNLMatrix[i][j] = Math.round(((-adj[i][j])/(deg[i][i])) * 100) / 100;
            }
        }
    }
    return rWNLMatrix;
}

export const getMatrixRepresentation = (verticesLength, edges, representation, exprStyle) => {
    let matrix;
    switch(representation) {
        case 'Degree':
            matrix = degreeMatrix(verticesLength, edges);
            break;
        case 'Laplacian':
            matrix = laplacianMatrix(verticesLength, edges);
            break;
        case 'SNLaplacian':
            matrix = symNorLaplacianMatrix(verticesLength, edges, exprStyle);
            break;
        case 'Adjacency':
        default:
            matrix = adjacencyMatrix(verticesLength, edges);
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

const countDecimals = function (value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}
export const convertArrayToObjectMatrix = (array) => {
    // Convert array to algebra.Expression matrix
    let matrix = [];
    for (let i=0; i < array.length; i++){
        matrix[i] = [];
        for (let j=0; j < array.length; j++) {
            const decimals = countDecimals(array[i][j]);
            matrix[i][j] = new algebra.Expression(Math.round(array[i][j]*(Math.pow(10, decimals))))
                .divide(Math.pow(10, decimals));
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
        .map(n => roundComplex(n))
        .sort();
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
    return `Spec\\ \\Gamma=\\begin{pmatrix}${spectrum.map(row => row[0]).join('&')}\\\\${spectrum.map(row => row[1]).join('&')}\\end{pmatrix}`;
}

// since the computation of the characteristic polynomial is very complex, this function
// will return characteristic polynomial and spectrum at the same time
export const charAndSpecLatex = (array) => {
    if (array.length === 0) return {
        characteristicPolynomial: '\\chi(\\Gamma ; \\lambda)=0',
        spectrum: 'Spec\\ \\Gamma=\\begin{pmatrix}\\\\\\end{pmatrix}'
    };
    const charPolObj = characteristicPolynomialObject(array);
    return {
        characteristicPolynomial: `\\chi(\\Gamma ; \\lambda)=${algebra.toTex(charPolObj).replace(/t/g, '\\lambda')}`,
        spectrum: spectrumMatrixLatex(charPolObj)
    }
}
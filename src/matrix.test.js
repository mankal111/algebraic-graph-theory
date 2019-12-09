import { arrayToLatexMatrix, zeros, adjacencyMatrix, characteristicPolynomialLatex,
    determinant, determinantExpressionString, minorMatrix, convertArrayToObjectMatrix } from './matrix';

it('converts array to latex matrix', () => {
    expect(arrayToLatexMatrix([[1, 2],[3, 4]])).toEqual("\\begin{vmatrix}1&2\\\\3&4\\end{vmatrix}");
});

it('returns array of zeros', () => {
    expect(zeros(2,3)).toEqual([[0,0,0],[0,0,0]]);
});

it('returns the adjacency matrix of a graph', () => {
    expect(adjacencyMatrix(3,[[0,1],[0,2]])).toEqual([[0,1,1],[1,0,0],[1,0,0]]);
});

it('returns the minor matrix', () => {
    expect(minorMatrix([[1,2],[3,4]], 0, 0)).toEqual([[4]]);
    expect(minorMatrix([[1,2,3],[4,5,6],[7,8,9]], 1, 1)).toEqual([[1,3],[7,9]]);
});

it('returns the determinant', () => {
    expect(determinant([[1,2],[3,4]])).toEqual(-2);
    expect(determinant([[1,2,3],[4,5,6],[7,8,9]])).toEqual(0);
    expect(determinant([[1,2,3],[1,5,6],[7,8,9]])).toEqual(-18);
});

it('returns the determinant expression string', () => {
    let matrix = convertArrayToObjectMatrix([['t',1],[1,'t']]);
    expect(determinantExpressionString(matrix)).toEqual('t^2 - 1');
    matrix = convertArrayToObjectMatrix([['t',1,1],[1,'t',1],[1,1,'t']]);
    expect(determinantExpressionString(matrix)).toEqual("t^3 - 3t + 2");
});

it('returns the characteristic polynomial latex of an array', () => {
    expect(characteristicPolynomialLatex([[0,1],[1,0]])).toEqual("t^{2} - 1");
    expect(characteristicPolynomialLatex([[0,1,1],[1,0,1],[1,1,0]])).toEqual("-t^{3} + 3t + 2");
});


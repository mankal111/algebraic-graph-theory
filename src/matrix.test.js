import { arrayToLatexMatrix, zeros, adjacencyMatrix, characteristicPolynomialLatex,
    spectrumMatrixLatex, minorMatrix, getEigenvalues, roundComplex, determinantExpression } from './matrix';

it('converts array to latex matrix', () => {
    expect(arrayToLatexMatrix([[1, 2],[3, 4]])).toEqual("\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}");
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

it('returns the characteristic polynomial latex of an array', () => {
    expect(characteristicPolynomialLatex([[0,1],[1,0]])).toEqual("t^{2} - 1");
    expect(characteristicPolynomialLatex([[0,1,1],[1,0,1],[1,1,0]])).toEqual("-t^{3} + 3t + 2");
});

it('returns the eigenvalues of an array', () => {
    expect(getEigenvalues([[0,1],[1,0]])).toEqual([-1,1]);
    expect(getEigenvalues([[0,1,1],[1,0,1],[1,1,0]])).toEqual([2,-1,-1]);
});

it('rounds complex', () => {
    expect(roundComplex('2.000')).toEqual(2);
    expect(roundComplex('-3.000001i')).toEqual('-3i');
    expect(roundComplex('2.123456-3.000001i')).toEqual('2.12-3i');
    expect(roundComplex('2-3i')).toEqual('2-3i');
})

it('get spectrum latex', () => {
    expect(spectrumMatrixLatex([[0,1,1,1],[1,0,1,1],[1,1,0,1],[1,1,1,0]])).toEqual("\\begin{bmatrix}3&-1\\\\1&3\\end{bmatrix}");
})

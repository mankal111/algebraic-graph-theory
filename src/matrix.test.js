import { arrayToLatexMatrix, zeros, adjacencyMatrix, charAndSpecLatex,
    minorMatrix, roundComplex, getRootsFromObject, characteristicPolynomialObject } from './matrix';

it('converts array to latex matrix', () => {
    expect(arrayToLatexMatrix([[1, 2],[3, 4]])).toEqual("A(\\Gamma)=\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}");
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

it('returns the characteristic polynomial and spectrum latex of an array', () => {
    const charAndSpec = charAndSpecLatex([[0,1,1],[1,0,1],[1,1,0]]);
    expect(charAndSpec.characteristicPolynomial).toEqual("\\chi(\\Gamma ; \\lambda)=-\\lambda^{3} + 3\\lambda + 2");
    expect(charAndSpec.spectrum).toEqual("Spec\\ \\Gamma=\\begin{pmatrix}2&-1\\\\1&2\\end{pmatrix}");
});

it('returns the eigenvalues of an array', () => {
    expect(getRootsFromObject(characteristicPolynomialObject([[0,1],[1,0]]))).toEqual([-1,1]);
    expect(getRootsFromObject(characteristicPolynomialObject([[0,1,1],[1,0,1],[1,1,0]]))).toEqual([2,-1,-1]);
});

it('rounds complex', () => {
    expect(roundComplex('2.000')).toEqual(2);
    expect(roundComplex('-3.000001i')).toEqual('-3i');
    expect(roundComplex('2.123456-3.000001i')).toEqual('2.12-3i');
    expect(roundComplex('2-3i')).toEqual('2-3i');
});

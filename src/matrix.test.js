import { arrayToLatexMatrix, zeros, adjacencyMatrix } from './matrix';

it('converts array to latex matrix', () => {
    expect(arrayToLatexMatrix([[1, 2],[3, 4]])).toEqual("\\begin{vmatrix}1&2\\\\3&4\\end{vmatrix}");
});

it('returns array of zeros', () => {
    expect(zeros(2,3)).toEqual([[0,0,0],[0,0,0]]);
});

it('returns the adjacency matrix of a graph', () => {
    expect(adjacencyMatrix(3,[[0,1],[0,2]])).toEqual([[0,1,1],[1,0,0],[1,0,0]]);
});
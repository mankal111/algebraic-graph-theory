import {arrayToLatexMatrix} from './matrix';

it('converts array to latex matrix', () => {
  expect(arrayToLatexMatrix([[1, 2],[3, 4]])).toEqual("\\begin{vmatrix}1&2\\\\3&4\\end{vmatrix}");
});
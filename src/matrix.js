export const arrayToLatexMatrix = (array) =>
    `\\begin{vmatrix}${array.map(row => row.join('&')).join('\\\\')}\\end{vmatrix}`
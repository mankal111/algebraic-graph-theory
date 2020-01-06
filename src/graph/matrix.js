export const arrayOfEmptyObjects = n => {
    let array = [];
    for (let i = 0; i < n; i++)
        array.push({});
    return array;
}

export const zeros = (h, w = h) =>
    Array(h).fill().map(() => Array(w).fill(0));
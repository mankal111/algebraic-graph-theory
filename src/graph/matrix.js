export const arrayOfEmptyObjects = n => {
    let array = [];
    for (let i = 0; i < n; i++)
        array.push({});
    return array;
}
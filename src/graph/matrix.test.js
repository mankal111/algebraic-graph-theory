import { arrayOfEmptyObjects, zeros } from "./matrix";

it('Creates array of empty objects', () => {
    const array = arrayOfEmptyObjects(3);
    expect(array).toEqual([{},{},{}]);
});

it('Creates array of zeros', () => {
    expect(zeros(2, 3)).toEqual([[0, 0, 0], [0, 0, 0]]);
    expect(zeros(2)).toEqual([[0, 0], [0, 0]]);
});
import { arrayOfEmptyObjects } from "./matrix";

it('Creates array of empty objects', () => {
    const array = arrayOfEmptyObjects(3);
    expect(array).toEqual([{},{},{}]);
});
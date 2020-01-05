import Graph from "./graph";

it('Creates new object', () => {
    const graph = new Graph();
    expect(graph).toBeTruthy();
});

it('Throws error if parameters are not empty or integer and array or two arrays', () => {
    let graph;
    expect(() => {
        graph = new Graph('string', []);
    }).toThrow();
});

it('Returns the number of points', () => {
    const graph = new Graph(5);
    expect(graph.numberOfPoints()).toEqual(5);
});

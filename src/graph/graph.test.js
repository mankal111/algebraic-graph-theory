import Graph from "./graph";

it('Creates new object', () => {
    const graph = new Graph();
    console.log(graph);
    expect(graph).toBeTruthy();
})
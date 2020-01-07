import Graph from "./graph";

it('Creates new Graph object', () => {
    const graph = new Graph();
    expect(graph).toBeTruthy();
});

it('Creates new Graph object using create() method', () => {
    const graph = Graph.create();
    expect(graph).toBeTruthy();
});

it('Initializes vertices', () => {
    let graph = Graph.create().initializeVertices(5);
    expect(graph.numberOfVertices()).toEqual(5);
    expect(
        graph
        .initializeVertices([{some: 'data'}, {some: 'otherData'}, {}])
        .numberOfVertices()
    ).toEqual(3);
    expect(graph.initializeVertices().numberOfVertices()).toEqual(0);
});

it('Returns the number of edges', () => {
    let graph = Graph.create().initializeVertices(3);
    expect(graph.addEdge([0, 1]).addEdge([1, 2]).numberOfEdges()).toEqual(2);
    expect(() => graph.addEdge([1])).toThrow();
    expect(() => graph.addEdge(['string', 1])).toThrow();
    expect(() => graph.addEdge([1, 'string'])).toThrow();
});

it('Returns the number of vertices', () => {
    const graph = new Graph();
    expect(graph.numberOfVertices()).toEqual(0);
    expect(graph.initializeVertices(5).numberOfVertices()).toEqual(5);
});

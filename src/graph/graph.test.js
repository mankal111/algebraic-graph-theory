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
    expect(Graph.create().initializeVertices(5).numberOfVertices()).toEqual(5);
    expect(
        Graph
        .create()
        .initializeVertices([{some: 'data'}, {some: 'otherData'}, {}])
        .numberOfVertices()
    ).toEqual(3);
});

it('Returns the number of edges', () => {
    expect(
        Graph
        .create()
        .initializeVertices(3)
        .addEdge([0, 1])
        .addEdge([1, 2])
        .numberOfEdges()
    ).toEqual(2);
});

it('Returns the number of vertices', () => {
    const graph = new Graph();
    expect(graph.numberOfVertices()).toEqual(0);
    expect(graph.initializeVertices(5).numberOfVertices()).toEqual(5);
});

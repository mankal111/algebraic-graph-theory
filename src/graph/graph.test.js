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

it('Adds edges', () => {
    let graph = Graph.create().initializeVertices(3);
    expect(graph.addEdge([0, 1]).addEdge([1, 2]).numberOfEdges()).toEqual(2);
    expect(() => graph.addEdge([1])).toThrow();
    expect(() => graph.addEdge(['string', 1])).toThrow();
    expect(() => graph.addEdge([1, 'string'])).toThrow();
});

it('Checks adjacency', () => {
    let graph = Graph.create().initializeVertices(3).addEdge([1, 2]);
    expect(graph.areAdjacent(1, 2)).toBe(true);
    expect(graph.areAdjacent(0, 1)).toBe(false);
});

it('Returns the number of vertices', () => {
    const graph = new Graph();
    expect(graph.numberOfVertices()).toEqual(0);
    expect(graph.initializeVertices(5).numberOfVertices()).toEqual(5);
});

it('Removes loops', () => {
    // Add loop in vertex 1
    let graph = Graph.create().allowLoops().initializeVertices(3).addEdge([1, 1]);
    // Check that there is a loop
    expect(graph.areAdjacent(1, 1)).toBe(true);
    // Remove loops and do not allow creating one from now on
    graph.allowLoops(false);
    // The loop should be removed
    expect(graph.areAdjacent(1, 1)).toBe(false);
    // We should not be allowed to add loops
    expect(graph.addEdge([2, 2]).areAdjacent(2, 2)).toBe(false);
});
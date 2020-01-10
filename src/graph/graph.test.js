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

it('Deletes edges', () => {
    let graph = Graph.create().initializeVertices(3);
    expect(graph.addEdge([0, 1]).deleteEdge([0, 1]).areAdjacent(0, 1)).toBe(false);
    expect(graph.directed(false).addEdge([1, 0]).deleteEdge([0, 1]).areAdjacent(0, 1)).toBe(false);
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

it('Removes multiple edges', () => {
    // Add double edge between vertices 1 and 2
    let graph = Graph.create().allowMultipleEdges().initializeVertices(3).addEdge([1, 2]).addEdge([1, 2]);
    // Ensure that the multiplicity of 1-2 edge is 2
    expect(graph.edgeMultiplicity(1, 2)).toBe(2);
    // Remove multiple edges and do not allow creating one from now on
    graph.allowMultipleEdges(false);
    // The second edge should be removed
    expect(graph.edgeMultiplicity(1, 2)).toBe(1);
    // We should not be allowed to add multiple edges
    expect(graph.addEdge([1, 2]).edgeMultiplicity(1, 2)).toBe(1);
});

it('Directed graph behaves properly', () => {
    // Add two edges between vertices 1 and 2 with opposite direction
    let graph = Graph.create()
        .directed().allowMultipleEdges()
        .initializeVertices(3)
        .addEdge([1, 2]).addEdge([2, 1]);
    // Ensure that the multiplicity of 1-2 edge is 1
    expect(graph.edgeMultiplicity(1, 2)).toBe(1);
    // Ensure that the multiplicity of 2-1 edge is 1
    expect(graph.edgeMultiplicity(2, 1)).toBe(1);
    // Turn the directed graph to a non directed one
    graph.directed(false);
    // Forgeting direction there are now 2 edges between 1 and 2
    expect(graph.edgeMultiplicity(1, 2)).toBe(2);
    // Even if we add an edge 2-1, it counts as an edge 1-2
    expect(graph.addEdge([2, 1]).edgeMultiplicity(1, 2)).toBe(3);
});
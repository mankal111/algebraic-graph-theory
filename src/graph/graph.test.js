import Graph from "./graph";

it('Creates new Graph object', () => {
    const graph = new Graph();
    expect(graph).toBeTruthy();
});

it('Creates new Graph object using create() method', () => {
    const graph = Graph.create();
    expect(graph).toBeTruthy();
})

it('Returns the number of vertices', () => {
    const graph = new Graph();
    expect(graph.numberOfVertices()).toEqual(0);
    expect(graph.initializeVertices(5).numberOfVertices()).toEqual(5);
});

it('Initializes vertices', () => {
    expect(Graph.create().initializeVertices(5).numberOfVertices()).toEqual(5);
    expect(Graph.create()
        .initializeVertices([{some: 'data'},{some: 'otherData'},{}])
        .numberOfVertices()).toEqual(3);
})

import { arrayOfEmptyObjects, zeros } from './matrix';

export default class Graph {
    constructor() {
        this._vertices = [];
        this._adjacencyMatrix = [[]];
        this._numberOfEdges = 0;
        this._allow = {
            multiple: true,
            directed: true,
            loops: true,
        }
    }

    static create() {
        return new Graph();
    }

    initializeVertices(v) {
        if (Number.isInteger(v))
            this._vertices = arrayOfEmptyObjects(v);
        else if (Array.isArray(v))
            this._vertices = v;
        else
            this._vertices = [];
        this._adjacencyMatrix = zeros(this._vertices.length);
        return this;
    }

    addEdge(edge) {
        if (
            edge.length !== 2 ||
            !Number.isInteger(edge[0]) ||
            !Number.isInteger(edge[1])
        ) {
            throw new Error('The edge should be represented by an array of 2 integers');
        } else {
            if (!this._allow.loops && (edge[0] === edge[1])) return this;
            this._adjacencyMatrix[edge[0]][edge[1]] += 1;
            this._numberOfEdges++;
        }
        return this;
    }

    areAdjacent(n1, n2) {
        return !!this._adjacencyMatrix[n1][n2];
    }

    numberOfEdges() {
        return this._numberOfEdges;
    }

    numberOfVertices() {
        return this._vertices.length;
    }

    allowMultipleEdges(b = true) {
        this._allow.multiple = b;
        return this;
    }

    allowDirectedEdges(b = true) {
        this._allow.directed = b;
        return this;
    }

    removeLoops() {
        this._adjacencyMatrix.forEach((row, index) => this._adjacencyMatrix[index][index] = 0);
    }

    allowLoops(b = true) {
        this._allow.loops = b;
        if (!b) this.removeLoops();
        return this;
    }
}
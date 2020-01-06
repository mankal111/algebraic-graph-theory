import { arrayOfEmptyObjects } from './matrix';

export default class Graph {
    constructor() {
        this.vertices = [];
        this.adjacencyMatrix = [[]];
        this.simple = true;
        this.directed = false;
        this.allowLoops = false;
    }

    static create() {
        return new Graph();
    }

    initializeVertices(v) {
        if (Number.isInteger(v))
            this.vertices = arrayOfEmptyObjects(v);
        else if (Array.isArray(v))
            this.vertices = v;
        else
            this.vertices = [];
        return this;
    }

    numberOfVertices() {
        return this.vertices.length;
    }
}
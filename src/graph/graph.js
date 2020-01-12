import { arrayOfEmptyObjects, zeros } from './matrix';

export default class Graph {
    constructor() {
        this._vertices = [];
        this._adjacencyMatrix = [[]];
        this._numberOfEdges = 0;
        this._allow = {
            multiple: true,
            loops: true,
        }
        this._directed = false;
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

    checkEdgeRepresentation(edge){
        if (
            edge.length !== 2 ||
            !Number.isInteger(edge[0]) ||
            !Number.isInteger(edge[1])
        ) throw new Error('The edge should be represented by an array of 2 integers');
    }

    addEdge(edge) {
        this.checkEdgeRepresentation(edge);
        if (!this._allow.loops && (edge[0] === edge[1])) return this;
        if (!this._allow.multiple && this.areAdjacent(edge)) return this;
        this._adjacencyMatrix[edge[0]][edge[1]] += 1;
        if (!this._directed) this._adjacencyMatrix[edge[1]][edge[0]] += 1;
        this._numberOfEdges++;
        return this;
    }

    deleteEdge(edge) {
        this.checkEdgeRepresentation(edge);
        if (this.areAdjacent(...edge)) {
            this._adjacencyMatrix[edge[0]][edge[1]] -= 1;
            if (!this._directed) this._adjacencyMatrix[edge[1]][edge[0]] -= 1;
            this._numberOfEdges--;
        }
        return this;
    }

    areAdjacent(v1, v2) {
        if (Array.isArray(v1)) [v1, v2] = v1;
        return !!this._adjacencyMatrix[v1][v2];
    }

    edgeMultiplicity(v1, v2) {
        return this._adjacencyMatrix[v1][v2];
    }

    numberOfEdges() {
        return this._numberOfEdges;
    }

    numberOfVertices() {
        return this._vertices.length;
    }

    removeMultipleEdges() {
        this._adjacencyMatrix.forEach((row, rowIndex) => 
            row.forEach((element, elementIndex) => {
                this._adjacencyMatrix[rowIndex][elementIndex] = 
                    element > 0 ? 1 : 0;
            })
        );
    }

    allowMultipleEdges(b = true) {
        this._allow.multiple = b;
        if(!b) this.removeMultipleEdges();
        return this;
    }

    removeDirections() {
        for (let i = 0; i < this.numberOfVertices(); i++){
            for (let j = i; j < this.numberOfVertices(); j++) {
                this._adjacencyMatrix[i][j] += this._adjacencyMatrix[j][i];
                this._adjacencyMatrix[j][i] = this._adjacencyMatrix[i][j];
            };
        };
        this._directed = false;
    }

    directed(b = true) {
        if (b) {
            this._directed = true;
        } else {
            this.removeDirections();
        };
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
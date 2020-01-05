import { arrayOfEmptyObjects } from './matrix';

export default class Graph {
    constructor(points = [], edges = []){
        if (Number.isInteger(points)) {
            this.points = arrayOfEmptyObjects(points);
            this.edges = edges;
        } else if (Array.isArray(points) && Array.isArray(edges)) {
            this.points = points;
            this.edges = edges;
        } else throw new Error('Parameters should be empty or integer and array or two arrays');
    }

    numberOfPoints() {
        return this.points.length;
    }
}
class Graph {
    constructor(){
        this.start = null;
        this.end = null;
        this.nodes = [];
    }
    sort(){
        this.nodes.sort((a, b) => a.x - b.x);
    }
}
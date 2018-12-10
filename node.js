class Node {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.g = 0;
        this.searched = false;
        this.parent = null;
        this.neighbors = [];
    }

    get cost(){
        return this.g + d(this, graph.end);
    }

    render(){
        fill(0);
        ellipse(this.x, this.y, Node.width, Node.width);
    }

    connectToNeighbors(graph){
        const threshold = 170;
        let idx = graph.nodes.indexOf(this);
        while(abs(this.x - node.x) <= threshold) {
            if(d(this, node) <= threshold) {
                this.neighbors.push(node);
                node.neighbors.push(this);
                stroke(0);
                line(this.x, this.y, node.x, node.y);
            }
            node = graph.nodes[i - 1];
        }
    }
    climb(arr = []){
        if(this.parent !== null){
            arr = this.parent.climb(arr);
        }
        arr.push(this);
        return arr;
    }

    get path(){
        let arr = [];
        let node = this;
        while(node !== null){
            arr = [node, ...arr];
            node = node.parent;
        }
        return arr;
    }
}
Node.width = 10;
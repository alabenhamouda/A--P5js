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

    connectToNeighbors(){
        const threshold = 170;
        let idx = graph.nodes.indexOf(this);
        let i = idx - 1;
        let node = graph.nodes[i];
        while(node !== undefined && abs(this.x - node.x) <= threshold) {
            if(d(this, node) <= threshold && !this.neighbors.includes(node)) {
                this.neighbors.push(node);
                node.neighbors.push(this);
                stroke(0);
                line(this.x, this.y, node.x, node.y);
            }
            i = i-1;
            node = graph.nodes[i];
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
        // let arr = [];
        // let node = this;
        // while(node !== null){
        //     arr = [node, ...arr];
        //     node = node.parent;
        // }
        return this.climb();
    }
}
Node.width = 10;
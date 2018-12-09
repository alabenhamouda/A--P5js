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
        const deltax = Node.width + Node.margin;
        for(let i = this.x - 5*deltax; i <= this.x + 5*deltax; i += deltax){
            // console.log(i, graph.get(i));
            if (!graph.has(i)) continue;
            for (let node of graph.get(i)){
                let coordinates = [this.x, this.y, node.x, node.y];
                if(dist(...coordinates) <= 185 && node !== this){
                    this.neighbors.push(node);
                    stroke(0);
                    line(...coordinates);
                }
            }
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
Node.margin = 20;
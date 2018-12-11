var graph = new Map();
var openSet = [];
var working = true;
function setup(){
    createCanvas(800, 800);
    background(220);
    const {margin, width: nodeWidth} = Node;
    for(let x = Node.width; x <= width - Node.width; x += nodeWidth + margin){
        const occurences = Math.floor(Math.random() * 5 + 1);
        for(let i = 0; i < occurences; i++){
            let y = Math.floor(Math.random() * (height - Node.width) + Node.width);
            let node = new Node(x, y);
            if(graph.has(x)){
                graph.get(x).push(node);
            } else {
                graph.set(x, [node]);
            }
            node.render();
        }
    }
    for(let val of graph.values()){
        for(let node of val){
            node.connectToNeighbors(graph);
        }
    }
    graph.start = getNode(graph.get(Node.width), (acc, current) => current.y < acc.y);
    graph.end = getNode(graph.get(width - Node.width), (acc, current) => current.y > acc.y);
    openSet.push(graph.start);
}

function draw(){
    background(220);
    renderNodes();
    if(openSet.length > 0){
        let current = getNode(openSet, (acc, curr) => curr.cost < acc.cost);
        openSet = rmFromArr(openSet, current);
        current.searched = true;
        if (current === graph.end){
            console.log('FOUND', current);
            renderPath(current.path, [0, 0, 255], 5);
            working = false;
            noLoop();
            return;
        }
        let neighbors = current.neighbors.filter(node => !node.searched);
        for(let neighbor of neighbors){
            let tempG = current.g + d(current, neighbor);
            if(!openSet.includes(neighbor)){
                neighbor.g = tempG;
                neighbor.parent = current;
                openSet.push(neighbor);
            } else if (tempG < neighbor.g) {
                neighbor.g = tempG;
                neighbor.parent = current;
            }
        }
        renderPath(current.path, [255, 0, 0], 2);
    } else {
        console.log("THERE IS NO WAY!!!!");
        working = false;
        noLoop();
    }
}

function mousePressed(){
    var node = selectNode(mouseX, mouseY);
    if(!working && node != undefined){
        if(graph.end !== null){
            reset();
            graph.start = node;
            openSet.push(node);
        } else {
            graph.end = node;
            working = true;
            loop();
        }
    }
}

function getNode(arr, cb){
    return arr.reduce((acc, current) => cb(acc, current) ? current : acc);
}

function d(node1, node2){
    return dist(node1.x, node1.y, node2.x, node2.y);
}

function rmFromArr(arr, item){
    return arr.filter(el => el !== item);
}

function renderPath(path, c, w){
    stroke(...c);
    strokeWeight(w);
    path.reduce((acc, curr) => {
        line(acc.x, acc.y, curr.x, curr.y);
        return curr;
    })
}
function renderNodes(){
    for(let nodes of graph.values()){
        for(let node of nodes){
            node.render();
        }
    }
}
function selectNode(x, y){
    for(let i = x - Node.width; i <= x + Node.width; i++){
        if(graph.has(i)){
            for(node of graph.get(i)){
                if(abs(node.y - y) <= Node.width) return node;
            }
        }
    }
}
function reset(){
    for(let nodes of graph.values()){
        for(let node of nodes){
            node.g = 0;
            node.searched = false;
            node.parent = null;
        }
    }
    openSet = [];
    graph.start = null;
    graph.end = null;
}
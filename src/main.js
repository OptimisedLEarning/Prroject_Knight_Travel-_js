import KnightGraph from "./knight_bfs.js";



function displayPath(start, end) {
    const knight = new KnightGraph();
    const path = knight.knightMoves(start, end);
    
    if (!path) {
        console.log("=> No path found!");
        return;
    }
    
    const moves = path.length - 1;
    console.log(`=> You made it in ${moves} moves!  Here's your path:`);
    
    for (let coordinate of path) {
        console.log(`  [${coordinate[0]},${coordinate[1]}]`);
    }
}


// Test the examples you wanted
displayPath([3,3], [1,3]);
displayPath([0,0], [7,7]);
displayPath([4,4], [1,7]);





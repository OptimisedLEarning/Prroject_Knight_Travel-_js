class KnightTravels {
    constructor(boardSize = 8) {
        this.boardSize = boardSize;
        // Fixed: Removed extra brackets around [-2,-1]
        this.moves = [[2,1], [2,-1], [-2,-1], [-2,1], [1,2], [-1,2], [1,-2], [-1,-2]];
    }

    isValidPosition(position) {
        const [x, y] = position;
        return x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize;
    }

    getAdjacentEdges(currentPosition) {
        let adjacentMoves = [];
        const [x, y] = currentPosition; // Fixed: Properly destructure position
        
        // Fixed: Use 'of' instead of 'in' to iterate over move arrays
        for (let move of this.moves) {
            // Fixed: Use x, y from destructuring above
            let newX = x + move[0];
            let newY = y + move[1];
            let newPosition = [newX, newY];
            
            if (this.isValidPosition(newPosition)) {
                adjacentMoves.push(newPosition);
            }
        }
        return adjacentMoves;
    }

    // BFS for shortest path 
    bfs(start, end) {
        // Queue stores [position, path] pairs
        let queue = [[start, [start]]];
        let visited = new Set(); // Fixed: Added 'let' declaration
        visited.add(start.toString()); // Convert position to string for Set comparison
        
        while (queue.length > 0) { // Fixed: Check queue.length > 0
            // Fixed: Use shift() for FIFO queue behavior (BFS requirement)
            const [currentPos, path] = queue.shift();
            
            // Check if we reached the destination
            if (currentPos[0] === end[0] && currentPos[1] === end[1]) {
                return path;
            }
            
            // Fixed: Use 'of' to iterate over adjacent positions
            for (let nextPos of this.getAdjacentEdges(currentPos)) {
                const posKey = nextPos.toString();
                
                // Fixed: Use visited.has() for Set
                if (!visited.has(posKey)) {
                    visited.add(posKey);
                    // Fixed: Use push() and create new path array
                    queue.push([nextPos, [...path, nextPos]]);
                }
            }
        }
        return null; // No path found
    }

    knightMoves(start, end) {
        return this.bfs(start, end); // Fixed: Use 'this.'
    }
}

// Fixed: Create instance and call instance methods
const knight = new KnightTravels();
const result1 = knight.knightMoves([0,0], [7,7]);
const result2 = knight.knightMoves([4,4], [1,7]);

console.log("Path from [0,0] to [7,7]:", result1);
console.log("Path from [4,4] to [1,7]:", result2);

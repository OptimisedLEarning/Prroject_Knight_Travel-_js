export default class KnightGraph {
    constructor(boardSize = 8) {
        this.boardSize = boardSize;
        this.moves = [[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[-1,-2],[1,-2],[2,-1]];
    }

    isValidPosition(position) {
        const [x, y] = position;
        return x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize;
    }

    getNeighbours(position) {
        const neighbors = [];
        for (const move of this.moves) {
            const [x, y] = position;
            const newX = x + move[0];
            const newY = y + move[1];
            const newPosition = [newX, newY];
            if (this.isValidPosition(newPosition)) {
                neighbors.push(newPosition);
            }
        }
        return neighbors;
    }

    getKey(position) {
        return `${position[0]},${position[1]}`;
    }

    bfs(start, end) {
        const queue = [[start, [start]]];
        const visited = new Set();
        visited.add(this.getKey(start));

        while (queue.length > 0) {
            const [current, path] = queue.shift();
            if (this.getKey(current) === this.getKey(end)) {
                return path;
            }
            for (const neighbour of this.getNeighbours(current)) {
                const neighbourKey = this.getKey(neighbour);
                if (!visited.has(neighbourKey)) {
                    visited.add(neighbourKey);
                    queue.push([neighbour, [...path, neighbour]]);
                }
            }
        }
        return null;
    }

    knightMoves(start, end) {
        return this.bfs(start, end);
    }
}

// Example usage and testing
const knight = new KnightGraph();
const result = knight.knightMoves([0,0], [7,7]);
console.log('Shortest path from [0,0] to [7,7]:', result);
console.log('Number of moves:', result ? result.length - 1 : 'No path found');

// package for npm 
const readline = require('readline');

// Define the chessboard size
const BOARD_SIZE = 8;

// Define the relative positions of the Knight's moves
const moves = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
];

// Create a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function containsAnyLetters(str) {
    return /[A-H]/i.test(str);
}
function containsAnyNumber(str) {
    return /[1-8]/i.test(str);
}
// Ask the user for the Knight's position
rl.question('Enter the position of the Knight (e.g. A1): ', (position) => {
    // Parse the input to get the row and column
    position = position.toUpperCase();
    if (containsAnyLetters(position.charAt(0)) !== true || containsAnyNumber(position.charAt(1)) !== true || position.charAt(1) > 8 || Boolean(position.charAt(2)) === true || position.length >2 || position.length <2 ) {
        console.log('Invalid position');
        rl.close();
        return
    };
    
    const row = BOARD_SIZE - parseInt(position[1]);
    const col = position.charCodeAt(0) - 'A'.charCodeAt(0);

    // Print the initial position of the Knight
    console.log(`Knight's initial position: ${position}`);

    // Print the possible moves the Knight can make
    console.log('Possible moves:');
    for (const move of moves) {
        const newRow = row + move[0];
        const newCol = col + move[1];
        if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
            const newPosition = String.fromCharCode('A'.charCodeAt(0) + newCol) + (BOARD_SIZE - newRow);
            console.log(newPosition);
        }
    }

    // Close the readline interface
    rl.close()
})

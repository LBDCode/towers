
const Gameboard = function(disks = 5, pegs = 3) {
    this.disks = disks;
    this.pegs = pegs;
    this.board = [];
    this.win = false;
    this.moves = 0;

    this.createBoard = function(d = this.disks, p = this.pegs) {
        for (let i= 0; i < p; i++) {
            this.board.push([]);
        };
        for(let j = d; j > 0; j--) {
            this.board[0].push(j);
        }
    };

    this.printBoardArray = function() {
        console.log(this.board);
    };

    this.printBoard = function() {
        this.board.map(item => console.log(`--- ${item.join(' ')}`));
    };
    
    this.checkMove = function(oldPegIndex, newPegIndex) {
        // change this to a filter function per md instructions
        let movedDiskValue = this.board[oldPegIndex][this.board[oldPegIndex].length - 1];
        let currentTopDiskValue = this.board[newPegIndex][this.board[newPegIndex].length - 1];
        return (currentTopDiskValue === undefined || currentTopDiskValue - movedDiskValue >= 0) ? true : false;
    };


    this.moveDisk = function(oldPeg, newPeg) {
        // add check for type of old/new peg (must be int), and that the both fall between 1 and # of pegs
        const oldIndex = oldPeg - 1;
        const newIndex = newPeg - 1;
        if(this.checkMove(oldIndex, newIndex)) {
            console.log('valid move');
            this.board[newIndex].push(this.board[oldIndex][this.board[oldIndex].length - 1]);
            this.board[oldIndex].pop();
            this.moves++;
            this.printBoardArray();
            this.printBoard();
        } else {
            console.log('invalid');
        }
    }; 
    this.possibleMoves = function(peg) {
        // There should be a function that given a certain peg, determines which 
        // other pegs the top disc from that peg can be moved to. In order to complete this 
        // function, you MUST use a `filter` function at least once (HINT: If the user says 
        // they want to move a certain disc to another peg, wouldn't it be nice if you had 
        // a function that could take that disc size and look at all the pegs on the board and 
        // only return the ones that the disc you want to move would fit on?)
        const topDisk = this.board[peg - 1][this.board[peg - 1].length - 1];
        console.log(`top disk for peg ${peg}: ${topDisk}`);
        let moves = this.board.filter(function(p, index) {
            if (p.length === 0 || p[p.length - 1] > topDisk) {
                console.log(`Possible move: disk ${topDisk} from peg ${peg} to peg ${index + 1}`);
            } 
        });
    };

    this.checkWinner = function() {
        //
        //There should be a function `checkWinner` that checks to see if the player has won 
        // the game. You win the game by putting all the discs back in the original order but 
        // on a new peg. As a part of this function, you MUST use the `reduce` function at least 
        // once. As a helpful hint, we suggest that you test this function with only 3 pegs and 3 
        // discs on the board as it will take significantly less moves to "win".

    };


}


// function startGame() {
//     const game = new Gameboard();

//     game.createBoard();
//     game.printBoardArray();
//     game.printBoard();
    
//     while (game.win === false) {

//     }
    
// }
const game = new Gameboard();

game.createBoard();
game.printBoardArray();
game.printBoard();
game.moveDisk(1, 2);
game.possibleMoves(1);
game.moveDisk(1, 3);
game.possibleMoves(3);
game.moveDisk(2, 3);
game.possibleMoves(3);
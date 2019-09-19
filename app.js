$(document).ready(function() {

    $('#gameButtons').hide();
    $('#hintArea').hide();
    $('#gameArea').hide();
    
    var game;

    const Gameboard = function(disks, pegs) {
        this.disks = disks;
        this.pegs = pegs;
        this.board = [];
        this.win = false;
        this.moves = 0;
        this.winningSum = 0;

        this.createBoard = function(d = this.disks, p = this.pegs) {
            for (let i= 0; i < p; i++) {
                this.board.push([]);
            };
            for(let j = d; j > 0; j--) {
                this.board[0].push(j);
            }
            
            this.winningSum = this.board[0].reduce((sum, pegAmount) => sum + pegAmount);
        };

        this.printBoard = function() {
            let curBoard = this.board.map(item => (`--- ${item.join(' ')}`));
            let boardHTML = curBoard.map(item => `<p>${item}</p>`);
            
            return boardHTML;
        };
        
        this.checkMove = function(oldPegIndex, newPegIndex) {
            let movedDiskValue = this.board[oldPegIndex][this.board[oldPegIndex].length - 1];
            let currentTopDiskValue = this.board[newPegIndex][this.board[newPegIndex].length - 1];
            
            return (currentTopDiskValue === undefined || currentTopDiskValue - movedDiskValue >= 0) ? true : false;
        };

        this.moveDisk = function(oldPeg, newPeg) {
            const oldIndex = oldPeg - 1;
            const newIndex = newPeg - 1;

            if(this.checkMove(oldIndex, newIndex)) {
                this.board[newIndex].push(this.board[oldIndex][this.board[oldIndex].length - 1]);
                this.board[oldIndex].pop();
                this.moves++;
                $('#board').html(this.printBoard());
                $('#gameMessage').text('Make a move!');
            } else {
                $('#gameMessage').text(`You cannot move a disk from peg ${oldPeg} to peg ${newPeg}. 
                  Try a different move, or ask for a hint!`);
            }
        }; 

        this.possibleMoves = function(peg) {
            // refactor filter method
            const topDisk = this.board[peg - 1][this.board[peg - 1].length - 1];
            let movesMessage = '';
            
            let moves = this.board.filter(function(p, index) { 
                // if (topDisk === undefined) {
                //     movesMessage = `There are no disks on peg ${peg}.  No moves possible.`;
                // } else if (p.length === 0 || p[p.length - 1] > topDisk) {
                //     movesMessage += `Possible move: disk ${topDisk} from peg ${peg} to peg ${index + 1} <br>`;
                // } 
            });
            console.log(moves);
            
            $('#gameMessage').html(movesMessage);
        };

        this.checkWinner = function() {
            // refactored reduce method
            let check = this.board.map(peg => {
                // if (peg.length === this.disks) {
                    console.log(peg);
                    // peg.reduce((sum, pegAmount) => sum + pegAmount);
                // }
            });
            console.log(`check ${check}`);
        };

        this.gameInit = function() {
            this.board = [];
            this.win = false;
            this.moves = 0;
            this.winningSum = 0;
            this.createBoard();
            
            $('#board').html(this.printBoard());    
            $('#gameMessage').text('Make a move!');
        };
    };

    $('#startGame').on('click', function(event) {
        const pegs = $('#pegs').val();
        const disks = $('#disks').val();
        
        if (pegs.length < 1 || disks.length < 1 ) {
            $('#welcomeMessage').text('Please enter the number of pegs and disks you want to use')
        } else if(parseInt(pegs) > 0 && parseInt(disks) > 0) {
            game = new Gameboard(parseInt(disks), parseInt(pegs));
            game.gameInit();
            $('#welcomeArea').hide();
            $('#gameButtons').show();
            $('#hintArea').show();
            $('#gameArea').show();    
        } else {
            $('#welcomeMessage').text('Pegs and Disks values must be integers greater than 0.');
        }
    });

    $('#moveDisk').on('click', function(event) {
        
        try {
            let oldPeg = $('#oldPeg').val();
            let newPeg = $('#newPeg').val();

            if (oldPeg.length < 1 || newPeg.length < 1) throw `
                Please enter an original peg and new peg location.`;
            if (!(parseInt(oldPeg) >= 1 && parseInt(oldPeg) <= game.pegs)) throw `
                Please enter an original peg number between 1 and ${game.pegs}`;
            if (!(parseInt(newPeg) >= 1 && parseInt(newPeg) <= game.pegs)) throw `
                Please enter an original peg number between 1 and ${game.pegs}`;   

            oldPeg = parseInt(oldPeg);
            newPeg = parseInt(newPeg);
        
            game.moveDisk(oldPeg, newPeg);
            game.checkWinner();

            if (game.win === true) {
                $('#gameMessage').text(`Congratulations - you won in ${game.moves} moves.`);
            }

            $('#playerMoves').text(`Game moves: ${game.moves}`);                     
        } catch(err) {
            $('#gameMessage').text(err);
        }
    });

    $('#getHint').on('click', function(event) {
        try {
            let hintPeg = $('#hintPeg').val();

            if (hintPeg.length < 1) throw `
                Please enter a hint peg.`;
            if (!(parseInt(hintPeg) >= 1 && parseInt(hintPeg) <= game.pegs)) throw `
                Please enter an hint peg number between 1 and ${game.pegs}.`;

            hintPeg = parseInt(hintPeg);
            game.possibleMoves(hintPeg);
        } catch(err) {
            $('#gameMessage').text(err);
        }
    });
    
});


// game play:
// start game, draw initial board
// player submits a move, check for move validity
// if valid execute move, print board, and check for win.  If win, display win message and reset (init) game.
// if invalid,display invalid move message
// at any point player can request possible moves for a peg (execute possibleMoves)


// const game = new Gameboard(3, 3);

// game.createBoard();
// game.printBoard();
// game.moveDisk(1, 2);
// game.possibleMoves(1);
// game.moveDisk(1, 3);
// game.possibleMoves(3);
// game.moveDisk(2, 3);
// game.possibleMoves(3);
// game.moveDisk(1, 2);
// game.possibleMoves(3);
// game.moveDisk(3, 1);
// game.possibleMoves(3);
// game.checkWinner();
// game.moveDisk(3, 2);
// game.checkWinner();
// game.possibleMoves(3);
// game.moveDisk(1, 2);
// game.checkWinner();
// game.possibleMoves(3);



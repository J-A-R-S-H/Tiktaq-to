function GameBoard() {
  const rowsAndCols = 3;
  const board = [];

  for (let i = 0; i < rowsAndCols; i++) {
    board[i] = [];
    for (let j = 0; j < rowsAndCols; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const dropToken = (row, column, player) => {
    if (board[row][column].getValue() === 0) {
      board[row][column].setValue(player);
      console.log(`Token '${player}' dropped at (${row}, ${column}).`);
    } else {
      console.log(`Cell (${row}, ${column}) is already occupied.`);
    }
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };
  return { printBoard, getBoard, dropToken };
}

function Cell() {
  let value = 0;

  const getValue = () => value;

  const setValue = (newValue) => {
    value = newValue;
  };

  return {
    getValue,
    setValue,
  };
}

function GameController(playerOneName = "P1", playerTwoName = "P2") {
  const gameBoard = GameBoard();

  const players = [
    { name: playerOneName, token: "X" },
    { name: playerTwoName, token: "O" },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    gameBoard.printBoard();
    gameBoard.dropToken(0, 1, players[0].token); // Test dropping a token in column 0 for player 'X'
    gameBoard.printBoard();
    gameBoard.dropToken(0, 2, "O"); // Test dropping a token in column 0 for player 'X'
    gameBoard.printBoard();

    gameBoard.dropToken(1, 2, "O");
    gameBoard.dropToken(1, 1, "O");
    gameBoard.dropToken(1, 0, "O");
    gameBoard.dropToken(2, 2, "O");

    gameBoard.printBoard();

    console.log(`${getActivePlayer().name}'s turn.`);

    console.log("Checking for winner...");
    const winner = checkWinner(gameBoard.getBoard());
    console.log("Winner:", winner);
  };

  const playRound = (row, column) => {
    console.log(`Dropping ${getActivePlayer().name}'s token...`);
    board.dropToken(row, column, getActivePlayer().token);

    switchPlayerTurn();
    printNewRound();
  };

  const checkWinner = (board) => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0].getValue() !== 0 &&
        board[i][0].getValue() === board[i][1].getValue() &&
        board[i][0].getValue() === board[i][2].getValue()
      ) {
        console.log("We got a winner!");
        // return "true";
        // remove this for now so it doesent terminate the for loop early
      }
    }

    for (let i = 0; i < 3; i++) {
      console.log(board[i][0].getValue(), "bad romance");

      if (
        board[i][0].getValue() !== 0 ||
        board[i][1].getValue() !== 0 ||
        board[i][2].getValue() !== 0
      ) {
        console.log("We got a winner Vertically!");
        // return "true";
        // remove this for now so it doesent terminate the for loop early
      }
    }

    console.log(board, "the biggest boawgghhh");
    if (
      (board[0][0].getValue() != 0 &&
        board[1][1].getValue() != 0 &&
        board[2][2].getValue() != 0) ||
      (board[2][0].getValue() != 0 &&
        board[1][1].getValue() != 0 &&
        board[0][2].getValue() != 0)
    ) {
      console.log("We got a winner Diagnolly!");
    }
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();

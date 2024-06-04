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

const gameBoard = GameBoard();
gameBoard.printBoard();
gameBoard.dropToken(0, 1, "X"); // Test dropping a token in column 0 for player 'X'
gameBoard.printBoard();
gameBoard.dropToken(0, 2, "O"); // Test dropping a token in column 0 for player 'X'
gameBoard.printBoard();

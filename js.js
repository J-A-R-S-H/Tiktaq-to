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

  const printNewRound = (winner) => {
    gameBoard.printBoard();


    console.log(`${getActivePlayer().name}'s turn.`);

    console.log("Checking for winner...");
    console.log("Winner:", winner);

  };

  const playRound = (row, column) => {
    console.log(`Dropping ${getActivePlayer().name}'s token...`);

    gameBoard.dropToken(row, column, getActivePlayer().token);

    const winner = checkWinner(gameBoard.getBoard(), getActivePlayer().token);



    console.log("something winner", winner)
    if (winner === true) {
      printNewRound(winner);
    } else {
      switchPlayerTurn();
    }
  };

  const checkWinner = (board, activePlayer) => {

    console.log("activeplayer", activePlayer)
    for (let i = 0; i < 3; i++) {


      if (
        board[i][0].getValue() !== 0 &&
        board[i][0].getValue() === board[i][1].getValue() &&
        board[i][0].getValue() === board[i][2].getValue() ||
        board[0][i].getValue() !== 0 &&
        board[1][i].getValue() &&
        board[2][i].getValue()
      ) {
        return true
      }
    }

    if (
      (board[0][0].getValue() != 0 &&
        board[1][1].getValue() != 0 &&
        board[2][2].getValue() != 0) ||
      (board[2][0].getValue() != 0 &&
        board[1][1].getValue() != 0 &&
        board[0][2].getValue() != 0)
    ) {
      return true
      //diagonal check
    }

    let tieValue = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {

        console.log(tieValue, "Tie value")
        if (board[i][j].getValue() != 0) {
          tieValue++
          if (tieValue == 9) {
            return true
          }

        }
      }
    }

    return false


  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: gameBoard.getBoard
  };
}



function ScreenController() {
  const game = GameController();
  const playerDiv = document.querySelector(".turn")
  const boardDiv = document.querySelector(".board")

  const updateScreen = () => {
    boardDiv.textContent = ""


    const board = game.getBoard()
    const activePlayer = game.getActivePlayer()


    playerDiv.textContent = `${activePlayer.name} Turn`
    board.forEach((row, rowIndex) => {
      row.forEach((cell, index) => {
        const ticButton = document.createElement("button"); //created this button to be appended
        ticButton.classList.add("cell") //adds a class
        ticButton.textContent = cell.getValue(); //gets whatever the current Value is for that button
        ticButton.dataset.row = rowIndex;
        ticButton.dataset.col = index;
        boardDiv.appendChild(ticButton);
        console.log("index", index)
      })
    })
  }


  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.col;
    const selectedRow = e.target.dataset.row
    console.log(selectedColumn, selectedRow)

    if (!selectedColumn || !selectedRow) {
      console.log("no")
      return
    }



    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard)

  updateScreen()
}

ScreenController();
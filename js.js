function GameBoard() {
  const rowsAndCols = 3;
  const board = [];

  const initialize = () => {
    for (let i = 0; i < rowsAndCols; i++) {
      board[i] = [];
      for (let j = 0; j < rowsAndCols; j++) {
        board[i].push(Cell());
      }
    }
  }

  initialize()

  const getBoard = () => board;

  const dropToken = (row, column, player) => {
    board[row][column].setValue(player);

  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };
  return { printBoard, getBoard, dropToken, initialize };
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


    if (winner === true) {
      alert(`${getActivePlayer().name} won`);
      gameBoard.initialize()
    } else if (winner === "Draw") {
      alert("Draw")
      gameBoard.initialize()
    }

  };

  const playRound = (row, column) => {

    const cellValue = gameBoard.getBoard()[row][column].getValue();

    if (cellValue === 0) {
      gameBoard.dropToken(row, column, getActivePlayer().token);

      const winner = checkWinner(gameBoard.getBoard(), getActivePlayer().token);

      console.log("something winner", winner)


      if (winner === true || winner === "Draw") {
        printNewRound(winner);
      } else if (winner === false) {
        switchPlayerTurn();
      }

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
        board[1][i].getValue() === board[0][i].getValue() &&
        board[2][i].getValue() === board[1][i].getValue()
      ) {
        return true
      }
    }

    if (
      (board[0][0].getValue() != 0 &&
        board[1][1].getValue() === board[0][0].getValue() &&
        board[2][2].getValue() === board[1][1].getValue()) ||
      (board[2][0].getValue() != 0 &&
        board[1][1].getValue() === board[2][0].getValue() &&
        board[0][2].getValue() === board[1][1].getValue())
    ) {
      return true
    }

    let tieValue = 0;
    for (let i = 0; i < 3; i++) {

      for (let j = 0; j < 3; j++) {
        if (board[i][j].getValue() !== 0) {
          tieValue++;
          console.log(tieValue, "Tie value")

        }
      }
    }
    if (tieValue === 9) {
      return "Draw";
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
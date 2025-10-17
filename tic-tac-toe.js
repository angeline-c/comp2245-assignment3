document.addEventListener('DOMContentLoaded', () => {
  // Exercise 1: Setup the board
  const board = document.getElementById('board')
  const squares = board.querySelectorAll('div')

  squares.forEach(square => {
    square.classList.add('square')
  })

  // Exercise 2: Alternate X and O on click 
  let currentPlayer = 'X'
  let gameActive = true

  // Exercise 3: Hover effect 
  squares.forEach(square => {
    square.addEventListener('mouseover', () => {
      if (square.textContent === '' && gameActive) {
        square.classList.add('hover')
      }
    })

    square.addEventListener('mouseout', () => {
      square.classList.remove('hover')
    })

    // Exercise 2 (continued): handle click 
    square.addEventListener('click', () => {
      if (square.textContent === '' && gameActive) {
        square.textContent = currentPlayer
        square.classList.add(currentPlayer)
        if (!checkWinner()) {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        }
      }
    })
  })

  // Exercise 4: Check for winner 
  const status = document.getElementById('status')

  function checkWinner() {
    const squaresArr = Array.from(squares).map(sq => sq.textContent)
    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ]

    for (const combo of winningCombos) {
      const [a,b,c] = combo
      if (squaresArr[a] && squaresArr[a] === squaresArr[b] && squaresArr[a] === squaresArr[c]) {
        status.textContent = `Congratulations! ${squaresArr[a]} is the Winner!`
        status.classList.add('you-won')
        gameActive = false
        return true
      }
    }
    return false
  }

  // Exercise 5: New Game button 
  const newGameButton = document.querySelector('.btn')

  newGameButton.addEventListener('click', () => {
    squares.forEach(square => {
      square.textContent = ''
      square.classList.remove('X', 'O', 'hover')
    })
    status.textContent = 'Move your mouse over a square and click to play an X or an O.'
    status.classList.remove('you-won')
    currentPlayer = 'X'
    gameActive = true
  })

  // Exercise 6: Prevent cheating 
  // (Already handled — clicking filled squares or after a win does nothing)
})

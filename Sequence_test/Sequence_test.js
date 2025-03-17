// Game configuration
const gameConfig = {
    gridSelector: '.grid',
    buttonSelector: '.button',
    scoreSelector: '#score',
    gameOverScreenSelector: '#game-over-screen',
    finalScoreSelector: '#final-score',
    highScoreSelector: '#high-score',
    playAgainSelector: '#play-again',
    playAgainButtonSelector: '#play-again-button',
    sequenceLength: 1,
    score: 0,
    highScore: 0,
    playerTurn: false,
  };
  
  // Game state
  const gameState = {
    sequence: [],
    playerProgress: [],
    score: gameConfig.score,
    highScore: gameConfig.highScore,
    playerTurn: gameConfig.playerTurn,
  };
  
  // DOM elements
  const domElements = {
    grid: document.querySelector(gameConfig.gridSelector),
    buttons: document.querySelectorAll(gameConfig.buttonSelector),
    scoreElement: document.querySelector(gameConfig.scoreSelector),
    gameOverScreen: document.querySelector(gameConfig.gameOverScreenSelector),
    finalScoreElement: document.querySelector(gameConfig.finalScoreSelector),
    highScoreElement: document.querySelector(gameConfig.highScoreSelector),
    playAgainButton: document.querySelector(gameConfig.playAgainSelector),
    playAgainButtonOnGameOverScreen: document.querySelector(gameConfig.playAgainButtonSelector),
  };
  
  // Functions
  const gameFunctions = {
    generateSequence: function() {
      // If this is the first round, generate a new sequence
      if (gameState.sequence.length === 0) {
        const randomButton = domElements.buttons[Math.floor(Math.random() * domElements.buttons.length)];
        gameState.sequence.push(randomButton);
      } else {
        // Otherwise, add a new button to the end of the previous sequence
        const newButton = domElements.buttons[Math.floor(Math.random() * domElements.buttons.length)];
        while (gameState.sequence.includes(newButton)) {
          newButton = domElements.buttons[Math.floor(Math.random() * domElements.buttons.length)];
        }
        gameState.sequence.push(newButton);
      }
  
      // Show the sequence to the player
      gameFunctions.showSequence();
    },
  
    showSequence: function() {
      let delay = 0;
      gameState.sequence.forEach(button => {
        setTimeout(() => {
          button.style.backgroundColor = 'blue';
          setTimeout(() => {
            button.style.backgroundColor = '';
          }, 500);
        }, delay);
        delay += 1000;
      });
  
      // Allow the player to start clicking after the sequence has been shown
      setTimeout(() => {
        gameState.playerTurn = true;
      }, delay + 50);
    },
  
    handleButtonClick: function(event) {
      // Get the clicked button
      const clickedButton = event.target;
  
      // Check if it's the player's turn
      if (gameState.playerTurn) {
        // Check if the clicked button is the next button in the sequence
        if (gameState.sequence[gameState.playerProgress.length] === clickedButton) {
          // If it is, add the clicked button to the player's progress
          gameState.playerProgress.push(clickedButton);
          clickedButton.style.backgroundColor = 'green';
          setTimeout(() => {
            clickedButton.style.backgroundColor = '';
          }, 300);
  
          // If the player has completed the sequence, add 1 more button to the sequence
          if (gameState.playerProgress.length === gameState.sequence.length) {
            gameState.playerTurn = false;
            gameConfig.sequenceLength++;
            gameState.playerProgress = [];
            gameState.score++;
            domElements.scoreElement.textContent = gameState.score;
            setTimeout(gameFunctions.generateSequence, 200);
          }
        } else {
          // If it's not, turn the button red and end the game
          clickedButton.style.backgroundColor = 'red';
          setTimeout(() => {
            clickedButton.style.backgroundColor = '';
          }, 300);
  
          // Show the game over screen
          domElements.gameOverScreen.style.display = 'flex';
          domElements.finalScoreElement.textContent = gameState.score;
          domElements.highScoreElement.textContent = gameState.highScore;
  
          // Update the high score if necessary
          if (gameState.score > gameState.highScore) {
            gameState.highScore = gameState.score;
            localStorage.setItem('highScore', gameState.highScore);
          }
        }
      }
    },
  };
  
  // Event listeners
  domElements.buttons.forEach(button => {
    button.addEventListener('click', gameFunctions.handleButtonClick);
  });
  
  domElements.playAgainButton.addEventListener('click', () => {
    gameState.score = 0;
    domElements.scoreElement.textContent = gameState.score;
    gameState.sequence = [];
    gameState.playerProgress = [];
    gameState.playerTurn = false;
    gameConfig.sequenceLength = 1;
    gameFunctions.generateSequence();
  });
  
  domElements.playAgainButtonOnGameOverScreen.addEventListener('click', () => {
    domElements.gameOverScreen.style.display = 'none';
    gameState.score = 0;
    domElements.scoreElement.textContent = gameState.score;
    gameState.sequence = [];
    gameState.playerProgress = [];
    gameState.playerTurn = false;
    gameConfig.sequenceLength = 1;
    gameFunctions.generateSequence();
    gameState.highScore = localStorage.getItem('highScore');
    if (gameState.highScore) {
      gameState.highScore = parseInt(gameState.highScore);
      domElements.highScoreElement.textContent = gameState.highScore;
    }
  });
  
  // Get the high score from local storage
  gameState.highScore = localStorage.getItem('highScore');
  if (gameState.highScore) {
    gameState.highScore = parseInt(gameState.highScore);
    domElements.highScoreElement.textContent = gameState.highScore;
  }
  
  // Start the game by generating a new sequence
  gameFunctions.generateSequence();
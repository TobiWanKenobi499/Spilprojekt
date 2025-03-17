document.addEventListener("DOMContentLoaded", function() {
    const sequenceMemoryGameBtn = document.getElementById("sequence-memory-game-btn");
  
    sequenceMemoryGameBtn.addEventListener("click", function() {
      const gameContainer = document.getElementById("game-container");
      gameContainer.src = "Sequence_test.html";
    });
  });
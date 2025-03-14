class Button {
    constructor(grid, buttonSize, index) {
        this.grid = grid;
        this.buttonSize = buttonSize;
        this.index = index;
        this.element = document.createElement('div');
        this.element.className = 'button';
        this.element.style.width = `${buttonSize}px`;
        this.element.style.height = `${buttonSize}px`;
        this.grid.appendChild(this.element);
    }

    addEventListener(eventName, callback) {
        this.element.addEventListener(eventName, callback);
    }
}

class Game {
    constructor(gridSize, buttonSize) {
        this.gridSize = gridSize;
        this.buttonSize = buttonSize;
        this.grid = document.getElementById('grid');
        this.buttons = [];
        this.sequence = [];
        this.recallSequence = [];
        this.level = 1;

        this.createButtons();
        this.generateSequence();
        this.displaySequence();
        this.addEventListeners();
    }

    createButtons() {
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const button = new Button(this.grid, this.buttonSize, i);
            this.buttons.push(button);
        }
    }

    generateSequence() {
        this.sequence = [];
        for (let i = 0; i < this.level; i++) {
            this.sequence.push(i + 1);
        }
        this.randomizeSequence();
    }

    randomizeSequence() {
        const shuffledButtons = this.buttons.slice();
        for (let i = shuffledButtons.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledButtons[i], shuffledButtons[j]] = [shuffledButtons[j], shuffledButtons[i]];
        }
        this.sequenceButtons = shuffledButtons.slice(0, this.sequence.length);
    }

    displaySequence() {
        for (let i = 0; i < this.sequence.length; i++) {
          this.sequenceButtons[i].element.textContent = this.sequence[i];
          if (i === 0) {
            this.sequenceButtons[i].addEventListener('click', () => {
              for (let j = 0; j < this.sequence.length; j++) {
                this.sequenceButtons[j].element.textContent = '';
              }
            });
          }
        }
      }

    addEventListeners() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].addEventListener('click', () => {
                if (this.recallSequence.length < this.sequence.length) {
                    const clickedButtonIndex = this.sequenceButtons.indexOf(this.buttons[i]);
                    if (clickedButtonIndex === this.recallSequence.length) {
                        this.recallSequence.push(clickedButtonIndex + 1);
                        if (this.recallSequence.length === this.sequence.length) {
                            this.level++;
                            this.generateSequence();
                            this.displaySequence();
                            this.recallSequence = [];
                        }
                    } else {
                        alert('Incorrect sequence!');
                        this.recallSequence = [];
                    }
                }
            });
        }
    }
}

const game = new Game(5, 100);
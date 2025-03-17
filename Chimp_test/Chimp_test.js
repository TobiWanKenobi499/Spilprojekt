/**
 * Represents a Button in the grid.
 */
class Button {
    /**
     * Constructs a new Button instance.
     * The grid to which the button will be appended.
     * The size of the button.
     * The index of the button in the grid.
     */
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

    /**
     * Adds an event listener to the button element.
     * The event type to listen for.
     * The function to execute when the event occurs.
     */
    addEventListener(eventName, callback) {
        this.element.addEventListener(eventName, callback);
    }
}

class Game {
    /**
     * Constructs a new Game instance.
     * The size of the grid (number of rows/columns).
     * The size of each button in the grid.
     */
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

    /**
     * Creates buttons and appends them to the grid.
     * The number of buttons created is equal to the square of the grid size.
     */
    createButtons() {
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const button = new Button(this.grid, this.buttonSize, i);
            this.buttons.push(button);
        }
    }

    /**
     * Generates a new sequence of numbers based on the current game level.
     * This sequence is then randomized for gameplay.
     */
    generateSequence() {
        this.sequence = [];
        for (let i = 0; i < this.level; i++) {
            this.sequence.push(i + 1);
        }
        this.randomizeSequence();
    }

    /**
     * Randomizes the order of buttons and selects a subset based on the game's sequence length.
     */
    randomizeSequence() {
        const shuffledButtons = this.buttons.slice();
        for (let i = shuffledButtons.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledButtons[i], shuffledButtons[j]] = [shuffledButtons[j], shuffledButtons[i]];
        }
        this.sequenceButtons = shuffledButtons.slice(0, this.sequence.length);
    }

    /**
     * Displays the sequence of numbers on the buttons.
     * This is done by setting the text content of each button in the sequence
     * to the corresponding number in the sequence.
     */
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

    /**
     * Adds event listeners to each button in the game.
     * When a button is clicked, the function checks if the sequence has been
     * fully recalled. If so, the level is incremented and a new sequence is
     * generated and displayed. If the sequence has not been fully recalled,
     * the user is alerted to enter the correct sequence.
     */
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
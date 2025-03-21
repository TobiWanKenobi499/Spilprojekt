//Represents a Button in the grid.
class Button {
     // Constructor - Constructs a new Button instance.
     // grid - The grid to which the button will be appended.
     // buttonSize - The size of the button.
     // index - The index of the button in the grid.
    constructor(grid, buttonSize) {
        //The grid to which the button will be appended.
        this.grid = grid;

        //The size of the button.
        this.buttonSize = buttonSize;

        //The element of the button.
        this.element = document.createElement('div');
        this.element.className = 'button';

        //The width of the button element.
        this.element.style.width = `${buttonSize}px`;

        //The height of the button element.
        this.element.style.height = `${buttonSize}px`;

        //Appends the button element to the grid.
        this.grid.appendChild(this.element);
    }

    
     // Adds an event listener to the button element.
     // The event type to listen for.
     // The function to execute when the event occurs.

    addEventListener(eventName, callback) {
        this.element.addEventListener(eventName, callback);
    }
}

class Game {
    //Constructs a new Game instance.
    constructor(gridSize, buttonSize) {
        //The size of the grid (number of rows/columns).
        this.gridSize = gridSize;

        //The size of each button in the grid.
        this.buttonSize = buttonSize;

        //The grid DOM element that holds the buttons.
        this.grid = document.getElementById('grid');

        //An array that holds all button instances in the game.
        this.buttons = [];

        //The sequence of numbers to be recalled by the player.
        this.sequence = [];

        //The player's recalled sequence of numbers.
        this.recallSequence = [];

        //The current level of the game.
        this.level = 4;

        // Create buttons and append them to the grid
        this.createButtons();
        
        // Generate the initial sequence for the game
        this.generateSequence();
        
        // Display the sequence to the player
        this.displaySequence();
        
        // Add event listeners to the buttons
        this.addEventListeners();
    }

    
     // Creates buttons and appends them to the grid.
     // The number of buttons created is equal to the square of the grid size.
     // The buttons are stored in an array and are accessible via the `buttons` property.
    
    createButtons() {
        // Create the buttons and store them in an array
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const button = new Button(this.grid, this.buttonSize);
            this.buttons.push(button);
        }
    }

    
     // Generates a new sequence of numbers based on the current game level.
     // The sequence starts from 1 to the current level value.
     // After generating the sequence, it is randomized for gameplay.
    
    generateSequence() {
        // Initialize the sequence array
        this.sequence = [];

        // Populate the sequence array with numbers from 1 to the current level
        for (let i = 0; i < this.level; i++) {
            this.sequence.push(i + 1);
        }

        // Randomize the generated sequence
        this.randomizeSequence();
    }

     // Randomizes the order of buttons and selects a subset based on the game's sequence length.
     // This is done using the Fisher-Yates (aka Knuth) Shuffle algorithm.
     // The shuffled subset is stored in this.sequenceButtons.
    randomizeSequence() {
        // Create a copy of the buttons array to shuffle
        const shuffledButtons = this.buttons.slice();

        // Perform the Fisher-Yates shuffle
        for (let i = shuffledButtons.length - 1; i > 0; i--) {
            // Pick a random index from 0 to i
            const j = Math.floor(Math.random() * (i + 1));

            // Swap elements at indices i and j
            [shuffledButtons[i], shuffledButtons[j]] = [shuffledButtons[j], shuffledButtons[i]];
        }

        // Select the first 'sequence.length' buttons from the shuffled array
        this.sequenceButtons = shuffledButtons.slice(0, this.level);
    }

    
     // Displays the sequence of numbers on the buttons.
     // This is done by setting the text content of each button in the sequence
     // to the corresponding number in the sequence.
     // The first button in the sequence also has an event listener that clears
     // the text content of all the buttons in the sequence when it is clicked.
     
    displaySequence() {
        for (let i = 0; i < this.sequence.length; i++) {
            // Set the text content of each button in the sequence
            this.sequenceButtons[i].element.textContent = this.sequence[i];
            if (i === 0) {
                // Add an event listener to the first button in the sequence
                // that clears the text content of all the buttons in the sequence
                this.sequenceButtons[i].addEventListener('click', () => {
                    // Clear the text content of all the buttons in the sequence
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
                // Add an event listener to each button
            this.buttons[i].addEventListener('click', (event) => {
                // Get the index of the button that was clicked
                const clickedButtonIndex = this.sequenceButtons.indexOf(this.buttons[i]);

                    // If the sequence has not been fully recalled, check if the clicked button is the next one in the sequence
                    if (clickedButtonIndex === this.recallSequence.length) {
                        // If it is, add the clicked button to the recalled sequence
                        this.recallSequence.push(clickedButtonIndex + 1);

                        // Check if the sequence has been fully recalled
                        if (this.recallSequence.length === this.sequence.length) {
                            // If it has, increment the level and generate a new sequence and display it
                            this.level++;
                            this.generateSequence();
                            this.displaySequence();
                            this.recallSequence = [];
                        }
                    } else {
                        // If the sequence has not been fully recalled and the clicked button is not the next one in the sequence,
                        // alert the user to enter the correct sequence
                        alert('Incorrect sequence!');
                        this.recallSequence = [];
                    }
                }
            );
        }
    }
}

const game = new Game(5, 100);
class Tile {
    tileSize; // Size of each tile in pixels
    tiles; // 2D array holding the individual tile objects
    width; // Number of tiles horizontally in the grid
    height; // Number of tiles vertically in the grid
    selectedTile; // Currently selected tile by the player
    isDragging = false; // Flag indicating if a tile is currently being dragged
    continuousElimination; // Counter for continuous tile eliminations (combos)

    // Constructor to initialize the Tile grid
    constructor(width, height, tileSize) {
        this.tileSize = tileSize; // Set the size of the tiles
        this.width = width; // Set the width (in tiles) of the grid
        this.height = height; // Set the height (in tiles) of the grid
        this.generateTileGrid(); // Generate the initial tile grid
    }

    // Method to generate the initial tile grid
    generateTileGrid() {
        this.tiles = []; // Initialize the tiles array

        const gemColors = ['redGem', 'yellowGem', 'blueGem', 'greenGem']; // Available gem colors

        // Populate the grid with tiles
        for (let x = 0; x < this.width; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < this.height; y++) {
                let selectedColor;
                let tries = 0;
                do {
                    selectedColor = gemColors[Math.floor(Math.random() * gemColors.length)]; // Randomly select a gem color
                    // Check for immediate matches to the left and above, and avoid them
                    const leftMatch = x >= 2 && this.tiles[x-1][y].color === selectedColor && this.tiles[x-2][y].color === selectedColor;
                    const upMatch = y >= 2 && this.tiles[x][y-1].color === selectedColor && this.tiles[x][y-2].color === selectedColor;
                    if (leftMatch || upMatch) {
                        selectedColor = null; // Reset color to avoid immediate match
                    }
                    tries++;
                    if (tries > 100) {
                        throw new Error('Unable to find a suitable gem color'); // Throw an error if a suitable color can't be found
                    }
                } while (!selectedColor);

                // Assign tile properties
                this.tiles[x][y] = {
                    image: gameManager.getImage(selectedColor), // Get the image for the gem
                    color: selectedColor, // Store the color of the gem
                    x: x * this.tileSize, // Calculate the x-coordinate of the tile
                    y: canvasHeight - (this.tileSize * this.height) + (y * this.tileSize), // Calculate the y-coordinate of the tile
                    visible: true, // Tiles are initially visible
                    match: false // Flag to indicate if the tile is part of a match
                };
            }
        }
    }

    // Method to get the tile at a specific position on the screen
    getTileAtPosition(position) {
        // Convert the position to grid coordinates
        const gridXPosition = Math.floor(position.x / this.tileSize);
        const gridYPosition = Math.floor((position.y - (canvasHeight - (this.tileSize * this.height) ) )/ this.tileSize);

        // Return the tile at the calculated grid coordinates
        return this.getTileAtGridIndex(gridXPosition, gridYPosition);
    }

    // Method to get the tile at a specific index in the grid
    getTileAtGridIndex(x, y) {
        // Check if the index is out of bounds
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return null;
        }

        // Return the tile at the given index
        return this.tiles[x][y];
    }

    // Method called when a touch or click starts
    touchStarted(position) {
        // Get the tile at the touch position
        this.selectedTile = this.getTileAtPosition(position);
        if (!this.selectedTile) return;
        // Save the original position of the selected tile
        this.selectedTileOriginalPosition = { x: this.selectedTile.x, y: this.selectedTile.y };
        if (this.selectedTile) {
            this.isDragging = true; // Set the dragging flag
            // Move the tile to the touch position with an offset
            this.selectedTile.x = position.x - this.tileSize / 2;
            this.selectedTile.y = position.y - this.tileSize / 2;
        }
    }

    // Method called when a touch or click moves
    touchMoved(position) {
        if (this.selectedTile) {
            // Move the selected tile along with the touch
            this.selectedTile.x = position.x - this.tileSize / 2;
            this.selectedTile.y = position.y - this.tileSize / 2;
            // Reset visibility of all tiles
            this.resetVisibility();
            // Identify the currently hovered tile and set it as invisible
            const hoveredTile = this.getTileAtPosition(position);
            if (hoveredTile && hoveredTile !== this.selectedTile) {
                hoveredTile.visible = false;
            }
        }
    }

    // Method called when a touch or click ends
    touchEnded(position) {
        this.continuousElimination = 0; // Reset continuous elimination counter
        if (this.selectedTile) {
            this.isDragging = false; // Clear the dragging flag
            // Get the target tile at the end position
            const targetTile = this.getTileAtPosition(position);
            if (!targetTile || targetTile === this.selectedTile) {
                this.resetPosition(); this.resetVisibility(); this.selectedTile = null;
                return;
            }
            if (targetTile !== this.selectedTile) {
                // Find coordinates of the selected and target tiles
                const selectedTileCoords = this.findTileCoords(this.selectedTile);
                const targetTileCoords = this.findTileCoords(targetTile);

                if (selectedTileCoords && targetTileCoords) {
                    // Swap the selected and target tiles
                    this.swapTiles(selectedTileCoords.x, selectedTileCoords.y, targetTileCoords.x, targetTileCoords.y);
                }
            }
            // Reset positions and visibility of all tiles, then process matches
            this.resetPosition();
            this.resetVisibility();
            this.processMatches();
            // Clear the selected tile
            this.selectedTile = null;
        }
    }

    // Method to find the grid coordinates of a given tile
    findTileCoords(tile) {
        // Iterate through the grid to find the tile
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.tiles[x][y] === tile) {
                    return { x, y };
                }
            }
        }
        return null; // Return null if the tile is not found
    }

    // Method to swap two tiles in the grid
    swapTiles(x1, y1, x2, y2) {
        let temp = this.tiles[x1][y1];
        this.tiles[x1][y1] = this.tiles[x2][y2];
        this.tiles[x2][y2] = temp;
    }

    // Method to reset the position of all tiles to their grid positions
    resetPosition() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.tiles[x][y].x = x * this.tileSize;
                this.tiles[x][y].y = canvasHeight - (this.tileSize * this.height) + (y * this.tileSize);
            }
        }
    }

    // Method to reset the visibility of all tiles to true
    resetVisibility() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.tiles[x][y].visible = true;
            }
        }
    }

    // Method to check for matches of tiles in the grid
    checkMatch() {
        // Check for matches in each row
        for (let y = 0; y < this.height; y++) {
            let matchLength = 1; // Length of the current match
            let color = this.tiles[0][y].color; // Current color being matched
            // Iterate over the row
            for (let x = 1; x < this.width; x++) {
                if (this.tiles[x][y].color === color) {
                    matchLength++;
                } else {
                    color = this.tiles[x][y].color;
                    matchLength = 1;
                }

                // If a match of 3 or more is found, mark the tiles as matched
                if (matchLength >= 3) {
                    for (let i = 0; i < matchLength; i++) {
                        this.tiles[x - i][y].match = true;
                    }
                }
            }
        }

        // Check for matches in each column
        for (let x = 0; x < this.width; x++) {
            let matchLength = 1; // Length of the current match
            let color = this.tiles[x][0].color; // Current color being matched
            // Iterate over the column
            for (let y = 1; y < this.height; y++) {
                if (this.tiles[x][y].color === color) {
                    matchLength++;
                } else {
                    color = this.tiles[x][y].color;
                    matchLength = 1;
                }

                // If a match of 3 or more is found, mark the tiles as matched
                if (matchLength >= 3) {
                    for (let i = 0; i < matchLength; i++) {
                        this.tiles[x][y - i].match = true;
                    }
                }
            }
        }
    }

    // Method to eliminate matched tiles and generate new ones
    eliminateMatchedTiles() {
        let eliminatedGems = {}; // Object to track the count of eliminated gems by color
        let tilesEliminated = false; // Flag to indicate if any tiles were eliminated

        // Iterate over the grid
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.tiles[x][y].match) {
                    let color = this.tiles[x][y].color;

                    // Increment the count for the eliminated gem's color
                    if (eliminatedGems[color]) {
                        eliminatedGems[color]++;
                    } else {
                        eliminatedGems[color] = 1;
                    }

                    // Make the tile invisible and reset its match status
                    this.tiles[x][y].visible = false;
                    this.tiles[x][y].match = false;
                    tilesEliminated = true; // Set flag to true as tiles are being eliminated
                }
            }
        }

        // Log information about eliminated gems
        for (let color in eliminatedGems) {
            console.log(`Eliminated ${eliminatedGems[color]} ${color} gems`);
            player.attack(eliminatedGems[color],color);// Player attack
        }

        return tilesEliminated; // Return whether any tiles were eliminated
    }


    // Method to generate a new tile at a given grid position
    generateNewTile(x, y) {
        const gemColors = ['redGem', 'yellowGem', 'blueGem', 'greenGem']; // List of gem colors
        let selectedColor = gemColors[Math.floor(Math.random() * gemColors.length)]; // Randomly select a gem color

        // Set the initial y-coordinate to a negative value, proportional to its row number
        // For example, a tile at y=0 starts from -tileSize, y=1 starts from -2*tileSize, and so on
        let initialY = -this.tileSize * (this.height - y);

        // Return a new tile object with the selected color and initial position
        return {
            image: gameManager.getImage(selectedColor), // Get the image for the selected color
            color: selectedColor, // Color of the tile
            x: x * this.tileSize, // x-coordinate of the tile
            y: initialY, // y-coordinate of the tile, initially off the canvas
            visible: true, // Tiles are visible by default
            match: false // Tiles are not matched by default
        };
    }

    // Method to drop tiles into empty spaces and generate new tiles
    dropTiles() {
        for (let x = 0; x < this.width; x++) {
            let emptySpaces = 0; // Counter for empty spaces in each column

            // Iterate over each column from bottom to top
            for (let y = this.height - 1; y >= 0; y--) {
                if (!this.tiles[x][y].visible) {
                    emptySpaces++; // Increment empty space counter if a tile is not visible
                } else if (emptySpaces > 0) {
                    // Move tiles down into empty spaces
                    this.tiles[x][y + emptySpaces] = this.tiles[x][y];
                    // Generate new tiles to fill the space at the original position
                    this.tiles[x][y] = this.generateNewTile(x, y);
                }
            }

            // Generate new tiles for each empty space at the top of the column
            for (let i = 0; i < emptySpaces; i++) {
                this.tiles[x][i] = this.generateNewTile(x, i);
            }
        }
    }

    // Method to process matches in the tile grid
    processMatches() {
        this.checkMatch(); // Check for matches in the grid

        // Eliminate matched tiles and check if any matches were found
        let matchesFound = this.eliminateMatchedTiles();

        // If matches were found, handle the elimination and generate new tiles
        if (matchesFound) {
            this.continuousElimination++; // Increment continuous elimination counter
            // Play a sound based on the number of continuous eliminations
            switch (this.continuousElimination) {
                case 1:
                    gameManager.playSound("match1");
                    break;
                case 2:
                    gameManager.playSound("match2");
                    break;
                case 3:
                    gameManager.playSound("match3");
                    break;
                case 4:
                    gameManager.playSound("match4");
                    break;
                case 5:
                    gameManager.playSound("match5");
                    break;
                default:
                    gameManager.playSound("match5");
                    break;
            }
            this.dropTiles(); // Drop tiles to fill empty spaces and generate new tiles
        }else{
            if(enemy.hp > 0){
                enemy.attack(); // Enemy attack
            }else{
                enemy.nextLevel(); // Enemy next level
            }
        }
    }

}

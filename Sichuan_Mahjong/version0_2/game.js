// game.js

// Create a basic deck of Mahjong tiles (simplified for demo purposes)
let tiles = [
  '1万', '2万', '3万', '4万', '5万', '6万', '7万', '8万', '9万',
  '1筒', '2筒', '3筒', '4筒', '5筒', '6筒', '7筒', '8筒', '9筒',
  '1条', '2条', '3条', '4条', '5条', '6条', '7条', '8条', '9条',
  '1万', '2万', '3万', '4万', '5万', '6万', '7万', '8万', '9万',
  '1筒', '2筒', '3筒', '4筒', '5筒', '6筒', '7筒', '8筒', '9筒',
  '1条', '2条', '3条', '4条', '5条', '6条', '7条', '8条', '9条',
  '1万', '2万', '3万', '4万', '5万', '6万', '7万', '8万', '9万',
  '1筒', '2筒', '3筒', '4筒', '5筒', '6筒', '7筒', '8筒', '9筒',
  '1条', '2条', '3条', '4条', '5条', '6条', '7条', '8条', '9条',
  '1万', '2万', '3万', '4万', '5万', '6万', '7万', '8万', '9万',
  '1筒', '2筒', '3筒', '4筒', '5筒', '6筒', '7筒', '8筒', '9筒',
  '1条', '2条', '3条', '4条', '5条', '6条', '7条', '8条', '9条'
];

// Shuffle the tiles
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Player's hand and AI players' hands
let playerHand = [];
let opponent1Hand = [];
let opponent2Hand = [];
let opponent3Hand = [];
let playerHasDrawn = false; // Track if player has drawn a tile
let opponentsVisible = false; // Track if opponents' hands are visible

// Draw a tile from the deck
function drawTile() {
  return tiles.pop();
}

// Initialize the game by giving each player 13 tiles
function initializeGame() {
  shuffle(tiles);
  for (let i = 0; i < 13; i++) {
    playerHand.push(drawTile());
    opponent1Hand.push(drawTile());
    opponent2Hand.push(drawTile());
    opponent3Hand.push(drawTile());
  }
  renderPlayerHand();
  playerHasDrawn = false; // Reset the state
  renderOpponentsHands(); // Render opponents' hands
}

// Render the player's hand on the screen
function renderPlayerHand() {
  const playerHandDiv = document.getElementById('player-hand');
  playerHandDiv.innerHTML = ''; // Clear previous hand
  playerHand.forEach((tile, index) => {
    const tileDiv = document.createElement('div');
    tileDiv.classList.add('tile');
    tileDiv.textContent = tile;
    tileDiv.addEventListener('click', () => discardTile(index));
    playerHandDiv.appendChild(tileDiv);
  });
}

// Render the opponents' hands on the screen
function renderOpponentsHands() {
  const opponent1HandDiv = document.getElementById('opponent1-hand');
  const opponent2HandDiv = document.getElementById('opponent2-hand');
  const opponent3HandDiv = document.getElementById('opponent3-hand');

  if (opponentsVisible) {
    opponent1HandDiv.textContent = `Opponent 1: ${opponent1Hand.join(', ')}`;
    opponent2HandDiv.textContent = `Opponent 2: ${opponent2Hand.join(', ')}`;
    opponent3HandDiv.textContent = `Opponent 3: ${opponent3Hand.join(', ')}`;
  } else {
    opponent1HandDiv.textContent = 'Opponent 1: Hidden';
    opponent2HandDiv.textContent = 'Opponent 2: Hidden';
    opponent3HandDiv.textContent = 'Opponent 3: Hidden';
  }
}

// Discard a tile from the player's hand
function discardTile(tileIndex) {
  if (!playerHasDrawn) {
    alert("You must draw a tile before discarding!");
    return;
  }
  playerHand.splice(tileIndex, 1); // Remove the tile
  renderPlayerHand(); // Re-render the player's hand
  playerHasDrawn = false; // Reset so player must draw again
}

// Player draws a new tile and must discard afterward
function drawTileForPlayer() {
  if (playerHasDrawn) {
    alert("You must discard a tile before drawing a new one!");
    return;
  }
  const newTile = drawTile();
  playerHand.push(newTile);
  console.log(`Player drew: ${newTile}`);
  renderPlayerHand();
  playerHasDrawn = true; // Set the state to true so the player can discard
}

// Toggle opponents' hands visibility
function toggleOpponentsHands() {
  opponentsVisible = !opponentsVisible; // Toggle the visibility state
  renderOpponentsHands(); // Update the display
}

// Initialize the game when the page loads
window.onload = () => {
  initializeGame();

  // Draw tile button
  document.getElementById('draw-tile').addEventListener('click', () => {
    drawTileForPlayer();
  });

  // Toggle opponents' hands button
  document.getElementById('toggle-opponents').addEventListener('click', () => {
    toggleOpponentsHands();
  });
};

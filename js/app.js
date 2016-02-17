
var Board = function (x,y) {
    this.x = x;
    this.y = y;  
};

Board.prototype.render = function () {
    ctx.font = "48px heveltica";
    ctx.fillText(this.getText(), this.x, this.y);
};

var ScoreBoard = function (x, y) {
    Board.call(this, x, y);
    this.points = 0;
};

ScoreBoard.prototype = Object.create(Board.prototype);
ScoreBoard.prototype.getText = function () {
    return "Score: " + this.points;
};

var LifeBoard = function (x, y) {
    Board.call(this, x, y);
    this.lifes = 3;
};

LifeBoard.prototype = Object.create(Board.prototype);
LifeBoard.prototype.getText = function () {
    return "Lifes: " + this.lifes;  
};

var GameObject = function (sprite, x, y) {
    this.sprite = sprite;
    this.setXTile(x);
    this.setYTile(y);
};

GameObject.prototype.setYTile = function (tile) {
    this.y = tile*75;
};

GameObject.prototype.setXTile = function (tile) {
    this.x = tile*101;
};

GameObject.prototype.render = function () {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function() {
    var y = randomInt(1,3);
    this.v = random (1, 4);
    GameObject.call(this, 'images/enemy-bug.png', -2, y);   
};

Enemy.prototype = Object.create(GameObject.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt) {
    this.x += 101*dt*this.v;
    // if the bug get out of the board, reset position and velocity
    if (this.x >= 550) {
        this.v = random(1,4);
        this.setXTile(-1);
        this.setYTile(randomInt(1,3));
    }
};

var Player = function () {
    this.tileX = randomInt(0,5);
    this.tileY = 5;
    GameObject.call(this, 'images/char-boy.png', this.tileX, this.tileY);
};

Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;

Player.prototype.moveLeft = function () {
    if (this.tileX > 0) {
        this.tileX--;
        this.setXTile(this.tileX);
    }
};

Player.prototype.moveRight = function () {
    if (this.tileX < 4) {
        this.tileX++;
        this.setXTile(this.tileX);
    }
};

Player.prototype.moveUp = function () {
    if (this.tileY > 0) {
        this.tileY--;
        this.setYTile(this.tileY);
    }
}

Player.prototype.moveDown = function () {
    if (this.tileY < 5) {
        this.tileY++;
        this.setYTile(this.tileY);
    }
}

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left': 
            this.moveLeft();
            break;
        case 'right':
            this.moveRight();
            break;
        case 'up':
            this.moveUp();
            break;
        case 'down':
            this.moveDown();
            break;
    }
};

Player.prototype.update = function () {
    
};

var Gem = function () {
    var x = randomInt(0, 5);
    var y = randomInt(1, 3);
    
    var gemValues = [5, 10, 20]
    var gemSprites = ['images/Gem-Blue-small.png', 
                      'images/Gem-Green-small.png', 
                      'images/Gem-Orange-small.png'];
    
    var gemType = randomInt(0,3);
    
    this.value = gemValues[gemType];
    GameObject.call(this, gemSprites[gemType], x, y);
}

Gem.prototype = Object.create(GameObject.prototype);
Gem.prototype.constructor = Gem;

var random = function (min, max) {
     return Math.random() * max + min;
};

var randomInt = function (min, max) {
    return Math.floor(random(min, max));
};

var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();
var scoreBoard = new ScoreBoard(0, 40);
var lifeBoard = new LifeBoard(300, 40)
var gems = [new Gem(), new Gem(), new Gem()];

var gameOver = new Board(74, 40);
gameOver.getText = function () {
    return "Game Over";  
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

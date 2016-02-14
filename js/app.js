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

Player.prototype.update = function () {  
};

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

var random = function (min, max) {
     return Math.random() * max + min;
};

var randomInt = function (min, max) {
    return Math.floor(random(min, max));
};

var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

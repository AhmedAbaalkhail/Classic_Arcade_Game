// Enemies the player must avoid
let Enemy = function (x, y, movespeed) {

    this.x = x;
    this.y = y;
    this.speed = movespeed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    // Multiplies the speed by the dt to make shore the game run in same speed for all coputers
    this.x += this.speed * dt;

    // Reappear enemies randomly when go off the canvas
    if (this.x > 500) {
        this.x = -100;
        this.speed = Math.floor(Math.random() * 150 + 100);
    };

    // This if condition will run when there is any collision between the player and the enemies
    if (player.x < this.x + 80 && player.x + 80 > this.x &&player.y < this.y + 60 && 60 + player.y > this.y) {
        //Reappear the player to it's start point
        player.x = 200;
        player.y = 470;
        //Decrease lives by one when player hit an enemy
        lives.innerHTML = Number(lives.innerHTML) - 1;
        
        //This if condition will run when number of lives = 0 to show a sweet alert message depending on the score
        if (lives.innerHTML === "0"){
            
            //If score less than or equal to 50 this condition will run
            if(score.innerHTML <= 50){
                swal("You can do better!" , "Game Over Your score is: " + score.innerHTML);
                
            //If score greater than 50 and less than or equal to 100 this condition will run
            } else if(score.innerHTML > 50 && score.innerHTML <= 100){
                swal("Good job!" , "Game Over Your score is: " + score.innerHTML);
                
            //If score greater than 100 this condition will run
            } else if(score.innerHTML > 100){
                swal("EXCELLENT!" , "Game Over Your score is: " + score.innerHTML);
            }
            
            //Reset the score and lives
            lives.innerHTML = "3";
            score.innerHTML = "0";
        }
    };
};

// Draw the enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//============================================================================================

// This is the player class
let Player = function (x, y) {

    this.x = x;
    this.y = y;
    this.player = 'images/char-princess-girl.png';
};

Player.prototype.update = function (dt) {
    
};

// Make the character move dependin on the key the user clicked
Player.prototype.handleInput = function (keyDirection) {
    
    //
    if (keyDirection == "left" && this.x >= 1) {
        this.x -= 100;
    }
    if (keyDirection == "up" && this.y > 1) {
        this.y -= 83;
    }
    if (keyDirection == "right" && this.x < 400) {
        this.x += 100;
    }
    if (keyDirection == "down" && this.y < 400) {
        this.y += 83;
    }

    // Reappear the character to it's start point when the character touched the water
    if (this.y < 0) {
        setTimeout(() => {
            //The defult start point
            this.x = 200;
            this.y = 470;
            //Increase the score by 10
            score.innerHTML = Number(score.innerHTML) + 10;
        }, 100);
    };
};

// Draw the player on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// All enemies in array
const allEnemies = [];
//Position of each enemy
const enemyLocation = [63, 147, 300, 380];

// When the game run enemies will move at a fixed speed until they go off the canvas then they will randomly reappear at different speeds
enemyLocation.forEach(function (Y_axis) {
    enemy = new Enemy(0, Y_axis, 50000);
    allEnemies.push(enemy);
});

const player = new Player(200, 470);

// This listens for key presses
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

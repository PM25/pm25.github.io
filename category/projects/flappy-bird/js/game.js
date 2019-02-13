var images = {};

// Main 
window.onload = function()
{
    // Resource
    var imgUrl = {
        background: "img/background.png",
        bird: "img/bird.png",
        pipeHead: "img/pipe-head.png",
        pipeBody: "img/pipe-body.png",
        revPipeHead: "img/rev-pipe-head.png"
    }
 
    var loadImg = function(callback) {
        var loaded = 0;
        var total = Object.keys(imgUrl).length;
        for(var key in imgUrl){
            images[key] = new Image();
            images[key].src = imgUrl[key];
            images[key].onload = function(){
                // All images loaded and start main function.
                if(++loaded == total){
                    callback();
                }
            }
        }
    }

    // Start from here !
    loadImg(function start() {
        game = new Game();
        game.start(); // Initialize 

        game.mainloop();
    });
}


function setupCanvas(canvas) 
{
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext("2d");
    // ctx.scale(dpr, dpr);

    return ctx;
}


// Game object
var Game = function()
{
    this.canvas = document.querySelector("#game-canvas");
    this.ctx = setupCanvas(this.canvas);

    this.now;
    this.past = Date.now();
    this.timeInterval;
    
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.fontSize = 36;
    this.fps = 0;
    this.score = 0;
    this.isPause = false;
    this.isLose = false;
    this.isShowInfo = true;
    this.unit = this.height / 15;
    this.gravity = this.height * 2;

    this.birds = [];
    this.pipes = [];
    this.pipesPerCol = []; // Store one of the pipe in every col
    this.pipeWidth = this.unit * 2;
    this.pipeHeight = this.unit * 2;
    this.pipSpeed = this.pipeWidth * 5;
    this.interval = 0;
    this.spawnInterval = this.pipeWidth * 6;

    // Events
    addEventListener('keyup', function(e){
        var keycode = (e.keyCode || e.which);
        switch (keycode){
            case 82: game.restart(); break;
            case 80: game.pause(); break;
            case 73: game.showInfo(); break;
        }
    }, false);

    addEventListener('keydown', function (e) {
        var keycode = (e.keyCode || e.which);
        switch (keycode){
            case 32: game.birds[0].jump(); break;
        }
    }, false);
}

Game.prototype.mainloop = function()
{
    this.now = Date.now();
    this.timeInterval = this.now - this.past;
    this.past = this.now;

    if(!this.isPause) this.update(this.timeInterval / 1000);
    this.render();

    var self = this;
    requestAnimationFrame(function(){
        self.mainloop();
    });
}

// Update objects
Game.prototype.update = function(modifier)
{
    // Birds
    for(var idx in this.birds){
        this.birds[idx].update(modifier);
    }

    // Pipes
    var rmCount = 0;
    for(var idx in this.pipes){
        this.pipes[idx].update(modifier);
        if(this.pipes[idx].x < -this.pipes[idx].width) ++rmCount;
    } this.pipes.splice(0, rmCount);

    this.interval += (this.pipSpeed * modifier);
    if(this.interval > this.spawnInterval){
        this.interval = 0;

        var hole = Math.floor(Math.random() * (this.height / this.pipeHeight));
        for(var y = 0; y < this.height / this.pipeHeight; ++y) {
            if(y != hole && y != hole-1) {
                this.pipes.push(new Pipe(game, this.width, y * this.pipeHeight));
            }
        } this.pipesPerCol.push(this.pipes[this.pipes.length-1]);
    }

    // Check if any collision happened
    if(this.checkCollision()) this.lose();

    // Update score
    this.updateScore();

    // Update FPS
    this.fps = Math.ceil(1000 / this.timeInterval);
}

// Draw game
Game.prototype.render = function()
{
    this.ctx.clearRect(0, 0, this.width, this.height);
    // Background
    this.ctx.drawImage(images.background, 0, 0, this.width, this.height);

    // Bird
    for(var idx in this.birds){
        this.ctx.drawImage(images.bird, this.birds[idx].x, this.birds[idx].y, this.birds[idx].width, this.birds[idx].height);
    }

    // Pipe
    for(var idx in this.pipes){
        this.ctx.drawImage(images.pipeBody, this.pipes[idx].x, this.pipes[idx].y, this.pipes[idx].width, this.pipes[idx].height);
    }

    this.ctx.fillStyle = "#000";
    this.ctx.font = this.fontSize + "px Helvetica";
    this.ctx.textBaseline = "top";
    this.ctx.textAlign = "left";
    // Show score
    this.ctx.fillText("Score: " + this.score, 5, this.fontSize);
    // Show FPS
    if(this.isShowInfo) {
        this.ctx.fillText("FPS: " + this.fps, 5, this.fontSize * 2);
    }
    // Lose message
    if(this.isLose) {
        this.ctx.fillStyle = "#aa1155";
        this.ctx.font = this.fontSize*5 + "px Helvetica";
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Press R to restart!", this.width / 2, this.height / 2);
    }
}

// Start game
Game.prototype.start = function()
{
    // Init bird
    this.birds.push(new Bird(this));
}

// Pause or Unpause game
Game.prototype.pause = function()
{
    if(this.isPause) this.isPause = false;
    else this.isPause = true;
}

// Restart game
Game.prototype.restart = function()
{
    // Reset bird status
    this.birds.splice(0, this.birds.length);
    this.birds.push(new Bird(this));

    // Reset pipe status
    this.pipes.splice(0, this.pipes.length);
    this.pipesPerCol.splice(0, this.pipesPerCol.length);

    // Reset game status
    this.score = 0;
    this.isLose = false;
    this.isPause = false;
}

// Game lose
Game.prototype.lose = function()
{
    if(!this.isPause) this.pause();
    this.isLose = true;
}

// Show information
Game.prototype.showInfo = function()
{
    if(this.isShowInfo) this.isShowInfo = false;
    else this.isShowInfo = true;
}

// Check if bird hit any pipe
Game.prototype.checkCollision = function()
{
    for(var idx in this.pipes) {
        // Check if collision happened.
        if (this.birds[0].x < this.pipes[idx].x + this.pipes[idx].width &&
            this.birds[0].x + this.birds[0].width > this.pipes[idx].x &&
            this.birds[0].y < this.pipes[idx].y + this.pipes[idx].height &&
            this.birds[0].height + this.birds[0].y > this.pipes[idx].y) {
                return true;
        }
    } return false;
}

// Update game score
Game.prototype.updateScore = function()
{
    if(this.pipesPerCol.length > 0 && 
        this.pipesPerCol[0].x + this.pipesPerCol[0].width <  this.birds[0].x) {
            ++this.score;
            this.pipesPerCol.shift();
    }
}


// Bird object
var Bird = function(game)
{
    this.x = game.unit;
    this.y = game.height / 2;
    this.width = game.unit;
    this.height = game.unit;
    this.speed = -(game.gravity * 0.3);

    addEventListener("click", this.jump.bind(this), false);
}

Bird.prototype.update = function(modifier)
{
    this.speed += game.gravity * modifier;
    this.y += this.speed * modifier;
}

Bird.prototype.jump = function()
{
    this.speed = -(game.gravity * 0.5);
}


// Pipe object
var Pipe = function(game, x, y)
{
    this.x = x;
    this.y = y;
    this.width = game.pipeWidth;
    this.height = game.pipeHeight;
    this.speed = game.pipSpeed;
}

Pipe.prototype.update = function(modifier)
{
    this.x -= this.speed * modifier;
}
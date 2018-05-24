var canvas = document.getElementById("game_canvas");
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

//Include background image 
var bgReady = 0;
var bgImg = new Image();
bgImg.onload = function(e) {
    bgReady = 1;
    //Set canvas's width and height
    canvas.width = bgImg.width * scaling_ratio(bgImg.width, bgImg.height, window.innerWidth, window.innerHeight) * 0.95;
    canvas.height = bgImg.height * scaling_ratio(bgImg.width, bgImg.height, window.innerWidth, window.innerHeight) * 0.95;
    //Init the object value which relate to canvas.width & canvas.height
    init_bird();
    init_pipe();
    //Making pipes
    make_pipe();
    //Show the game
    show_the_game(1);
}
bgImg.src = "images/background.jpg";

//Include object image
var birdReady = 0;
var birdImg = new Image();
var bird_width, bird_height;
birdImg.onload = function(e){
    birdReady = 1;
    bird_width = birdImg.width * scaling_ratio(birdImg.width, birdImg.height, game.unit, game.unit);
    bird_height = birdImg.height * scaling_ratio(birdImg.width, birdImg.height, game.unit, game.unit);
}
birdImg.src="images/flappybird-1.png";

var pipebodyReady = 0;
var pipebodyImg = new Image();
var pipebody_width, pipebody_height;
pipebodyImg.onload = function(e){
    pipebodyReady = 1;
    pipebody_width = pipebodyImg.width * scaling_ratio(pipebodyImg.width, pipebodyImg.height, game.unit*2, game.unit*2);
    pipebody_height = pipebodyImg.height * scaling_ratio(pipebodyImg.width, pipebodyImg.height, game.unit*2, game.unit*2);
}
pipebodyImg.src = "images/pipebody.png"

var pipeheadReady = 0;
var pipeheadImg = new Image();
var pipehead_width, pipehead_height;
pipeheadImg.onload = function(e){
    pipeheadReady = 1;
    pipehead_width = pipeheadImg.width * scaling_ratio(pipeheadImg.width, pipeheadImg.height, game.unit*2, game.unit*2);
    pipehead_height = pipeheadImg.height * scaling_ratio(pipeheadImg.width, pipeheadImg.height, game.unit*2, game.unit*2);
}
pipeheadImg.src = "images/pipehead.png"

var pipeheadRevReady = 0;
var pipeheadRevImg = new Image();
pipeheadRevImg.onload = function (e) {
    pipeheadReady = 1;
}
pipeheadRevImg.src = "images/pipehead_reverse.png"


//Game Objects
var game = {
    id: 0,
    score: 0,
    fps: 0,
    unit: 50,
    freeze: false,
    show_info: false,
    lose: false
};

var bg = {
    id: 1,
    pos_x: 0,
    pos_y: 0,
    scroll_speed: 100,
    freeze: false
};

var bird = {
    id: 2,
    grav_Accel: 941,
    grav_speed: 0,
    pos_x: game.unit * 2,
    pos_y: 0,
    rotation: 0,
    rotate_speed: 3,
    rotation_limit: 0.7,
    rotate_accel: 2,
    rotate_up: false,
    freeze: false
};

var pipes = {
    id:3,
    speed: 550,
    pos_x: [],
    pos_y: [],
    amount: 0, //Include hole amount
    hole_pos: [],
    rows_amount: -1, //Pipe index for newest created
    front_distance: 0,
    period: 1.1,
    max_pipes: 100,
    score: [],
    last_index: 0,
    freeze: false
};

var init_bird = function(){
    bird.pos_y = canvas.height / 2;
}

var init_pipe = function(){
    pipes.amount = Math.floor((canvas.height - 4 * pipehead_height) / pipebody_height) + 4;
}

//Game functions
var reset = function(){
    //Reset pies status
    for (var i = 0; i <= pipes.max_pipes; ++i) {
        pipes.pos_x[i] = [];
        pipes.pos_y[i] = [];
    }
    pipes.last_index = 0;
    pipes.rows_amount = -1;
    pipes.max_pipes = 100; //Max number of pipe index (total pipe - 1)
    pipes.front_distance = 0;
    first = true;
    //Reset bird status
    bird.speed = 0;
    bird.pos_x = game.unit * 2;
    bird.pos_y = canvas.height/2;
    bird.rotation = 0;
    bird.grav_speed = 0;
    bird.rotate_speed = 3;
    bird.rotate_up = false;
    //Reset game score
    game.score = 0;
    game.lose = false;
    //Unfreeze everything
    freeze_game(-1);
};

var freeze_game = function(id){
    switch(id){
        case game.id: game.freeze = ~game.freeze; break;
        case bg.id: bg.freeze = true; break;
        case bird.id: bird.freeze = true; break;
        case pipes.id: pipes.freeze = true; break;
        default: game.freeze = false;
                 bg.freeze = false;
                 bird.freeze = false;
                 pipes.freeze = false;
    }
}

var show_info = function(){
    game.show_info = ~game.show_info;
}

var make_pipe = function () {
    ++pipes.rows_amount;
    if (pipes.rows_amount > pipes.max_pipes) pipes.rows_amount = 0;
    pipes.pos_x[pipes.rows_amount] = [];
    pipes.pos_y[pipes.rows_amount] = [];
    pipes.score[pipes.rows_amount] = false;
    pipes.hole_pos[pipes.rows_amount] = Math.floor(Math.random() * (pipes.amount-2)) + 1;

    for (var i = 0; i <= pipes.amount; ++i) {
        pipes.pos_x[pipes.rows_amount][i] = canvas.width - 1;
        if (i == (pipes.hole_pos[pipes.rows_amount] - 1) || i == (pipes.hole_pos[pipes.rows_amount] + 2)) {
            pipes.pos_y[pipes.rows_amount][i] = i * pipehead_height;
        }
        else if (i != pipes.hole_pos[pipes.rows_amount] || i != pipes.hole_pos[pipes.rows_amount] + 1) {
            pipes.pos_y[pipes.rows_amount][i] = i * pipebody_height;
        }
    }
}

var show_the_game = function(check) {
    if(check) canvas.style.opacity = 1;
    else canvas.style.opacity = 0;
}

var bird_Jump = function () {
    bird.grav_speed = -500;

    bird.rotate_up = true;
    bird.rotate_speed = 3;
    bird.rotate_accel = 2;
};

var game_lose = function(){
    freeze_game(1);
    freeze_game(3);
    game.lose = true;
}

//updating game status
var first = true; //Checking wheather it's first pipe or not.

var update = function(modifier)
{
    //Background scrolling
    if(!bg.freeze){
        if (bg.pos_x < -canvas.width) bg.pos_x = 0;
        else bg.pos_x -= bg.scroll_speed * modifier;
    }
    //Bird status
    if(!bird.freeze){
        if(bird.rotate_up){
            if (bird.rotation > -bird.rotation_limit) bird.rotation -= bird.rotate_speed * modifier;
            else bird.rotate_up = false;
        }
        else if(bird.rotation < bird.rotation_limit){
            bird.rotation += bird.rotate_speed * modifier * 0.8;
        } 
        bird.rotate_speed -= bird.rotate_accel * modifier; 
        bird.grav_speed += bird.grav_Accel * modifier;
    
        bird.pos_y += bird.grav_speed * modifier;
    }
    //Pipes status
    if(!pipes.freeze){
        if (pipes.pos_x[pipes.rows_amount]) {
            for (var j = 0; pipes.pos_x[j]; ++j) {
                for (var i = 0; i <= pipes.amount; ++i) {
                    pipes.pos_x[j][i] -= pipes.speed * modifier;
                    if(pipes.pos_x[j][0]+pipehead_width<game.unit*2 && pipes.score[j]==false){
                        ++game.score;
                        pipes.score[j] = true;
                        if (++pipes.last_index > pipes.max_pipes) pipes.last_index = 0;
                        //Find the max needed of pipes
                        if (pipes.pos_x[j][i] < 0 && first) {
                            pipes.max_pipes = pipes.rows_amount;
                            first = false;
                        }
                    }           
                }
            }
        }
        //Making row of pipe
        pipes.front_distance += modifier;
        if (pipes.front_distance > pipes.period) {
            make_pipe();
            pipes.front_distance = 0;
            game.fps = (1000 / delta);
            game.fps = game.fps.toFixed(1);
        }
    }
    //Collision detect
    var pIndex = pipes.last_index;
    if (pipes.pos_x[pIndex][0] < bird.pos_x + bird_width &&
        bird.pos_x < pipes.pos_x[pIndex][pipes.hole_pos[pIndex]-1] + pipehead_width &&
        (bird.pos_y < pipes.pos_y[pIndex][pipes.hole_pos[pIndex]-1] + pipehead_height ||
         bird.pos_y + bird_height > pipes.pos_y[pIndex][pipes.hole_pos[pIndex]+2])
        ){
            game_lose();
        }
}

//Useful functions
var scaling_ratio = function(x1, y1, x2, y2){
    var mag_x = x2 / x1; 
    var mag_y = y2 / y1;
    var mag = mag_x>mag_y? mag_y: mag_x;

    return mag;
}

//Drawing
var render = function() {
    //Draw background
    if (bgReady){
        ctx.drawImage(bgImg, bg.pos_x, bg.pos_y, canvas.width, canvas.height);
        ctx.drawImage(bgImg, bg.pos_x + canvas.width, bg.pos_y, canvas.width, canvas.height);
    }
    //Draw bird
    ctx.save();
    ctx.translate(bird.pos_x, bird.pos_y);
    ctx.rotate(bird.rotation);
    ctx.translate(-bird.pos_x, -bird.pos_y);
    if (birdReady) ctx.drawImage(birdImg, bird.pos_x, bird.pos_y, bird_width, bird_height);
    ctx.restore();
    //Draw pipe
    if(pipebodyReady && pipeheadReady){
        for (var j = 0; pipes.pos_x[j]; ++j) {
            for (var i = 0; i < pipes.hole_pos[j] - 1; ++i) {
                ctx.drawImage(pipebodyImg, pipes.pos_x[j][i],
                    pipes.pos_y[j][i], pipebody_width, pipebody_height);
            }
            for (var i = pipes.hole_pos[j] + 3; i <= pipes.amount; ++i) {
                ctx.drawImage(pipebodyImg, pipes.pos_x[j][i],
                    pipes.pos_y[j][i], pipebody_width, pipebody_height);
            }
            ctx.drawImage(pipeheadRevImg, pipes.pos_x[j][pipes.hole_pos[j] - 1],
                pipes.pos_y[j][pipes.hole_pos[j] - 1], pipehead_width, pipehead_height);
            ctx.drawImage(pipeheadImg, pipes.pos_x[j][pipes.hole_pos[j] + 2],
                pipes.pos_y[j][pipes.hole_pos[j] + 2], pipehead_width, pipehead_height);
        }
    }

    //Show game score
    ctx.fillStyle = "#FFFFFF";
    ctx.font = game.unit + "px Helvetica";
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(game.score, canvas.width / 2, game.unit);
    //Show fps
    if(game.show_info){
        ctx.textBaseline = "top";
        ctx.textAlign = "right";
        ctx.font = game.unit * 0.3 + "px Helvetica";
        ctx.fillText("FPS: " + game.fps, canvas.width - 10, 10);
    }
    //Message when lose
    if(game.lose){
        ctx.fillStyle = "#aa1155";
        ctx.font = game.unit*2 + "px Helvetica";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("Press R to restart!", canvas.width / 2, canvas.height / 2);
    }
}

//Game loop
var main = function() {
    now = Date.now();
    delta = now - then;
    if(!game.freeze){      
        update(delta/1000);
        render();
    }
    then = now;
    requestAnimationFrame(main);
}

//Input listening
canvas.addEventListener('click', bird_Jump, false);
canvas.addEventListener('keyup', function(e){
    var keycode = (e.keyCode || e.which);
    switch (keycode){
        case 82: reset(); break;
        case 80: freeze_game(0); break;
        case 192: show_info(); break;
        //default: alert(keycode); break;
    }
}, false);
canvas.addEventListener('keydown', function (e) {
    var keycode = (e.keyCode || e.which);
    switch (keycode){
        case 32: bird_Jump(); break;
    }
}, false);

//Start game!
reset();
var now, delta;
var then = Date.now();
main();
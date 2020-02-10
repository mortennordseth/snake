let LEFT = "LEFT";
let RIGHT = "RIGHT";
let UP = "UP";
let DOWN = "DOWN";

let snakePos = [
    {x: 70, y: 250},
    {x: 60, y: 250},
    {x: 50, y: 250},
    {x: 40, y: 250},
    {x: 30, y: 250},
    {x: 20, y: 250},
];
let width, height, foodPos, pause, direction, appendSnake, isGameOver, score;

function setup() {
    width = windowWidth/2;
    height = windowHeight/2;
    foodPos = {x: width/2, y: height/2};
    pause, isGameOver, appendSnake = false;
    direction = RIGHT;
    score = 0;
    createCanvas(width, height-1);
    frameRate(25);
}

function draw() {
    background(51);
    noStroke();

    //Snake
    fill('#247d3c'); //Green
    for(let i = 0; i < snakePos.length; i++){
        square(snakePos[i].x, snakePos[i].y, 10);
    }
    
    //Food
    fill('#c70c0c'); //Red
    square(foodPos.x, foodPos.y, 10);

    //Borders
    strokeWeight(5);
    stroke('#c70c0c'); //Red
    line(0, 0, width, 0);
    line(width, 0, width, height);
    line(width, height, 0, height);
    line(0, height, 0, 0);
    strokeWeight(1);

    if(!pause && !isGameOver) {
        moveSnake();
        eat();
        checkCollision();
    }
}

function checkCollision() {
    //With wall
    if(snakePos[0].x <= 0 || snakePos[0].x >= width || snakePos[0].y <= 0 || snakePos[0].y >= height){
        gameOver();
    }

    //With self
    for(let i = 1; i < snakePos.length; i++){
        if(snakePos[0].x == snakePos[i].x && snakePos[0].y == snakePos[i].y){
            gameOver();
        }
    }
}

function eat(){
    if(foodPos.x > snakePos[0].x-10 && foodPos.x < snakePos[0].x+10 && foodPos.y > snakePos[0].y-10 && foodPos.y < snakePos[0].y+10){
        foodPos.x = Math.floor(Math.random() * width - 20);
        foodPos.y = Math.floor(Math.random() * height - 20);
        score++;
        document.getElementById("highScore").innerHTML = "Score: " + score;
        appendSnake = true;
    }
}


function moveSnake(){
    if(appendSnake) {
        snakePos.push({x: snakePos[snakePos.length-1].x, y: snakePos[snakePos.length-1].y});
        appendSnake = false;
    }

    for(let i = snakePos.length-1; i > 0; i--){
        snakePos[i].x = snakePos[i-1].x;
        snakePos[i].y = snakePos[i-1].y;
    }

    switch(direction){
        case RIGHT:
            snakePos[0].x += 10;
            break;
        case DOWN:
            snakePos[0].y += 10;
            break;
        case LEFT:
            snakePos[0].x -= 10;
            break;
        case UP:
            snakePos[0].y -= 10;
            break;
    }
}

function keyPressed() {
    if(keyCode === RIGHT_ARROW && direction !== LEFT) {
        direction = RIGHT;
    }else if(keyCode === DOWN_ARROW && direction !== UP){
        direction = DOWN;
    }else if(keyCode === LEFT_ARROW && direction !== RIGHT){
        direction = LEFT;
    }else if(keyCode === UP_ARROW && direction !== DOWN){
        direction = UP;
    }else if(keyCode === 32 || keyCode === 80 || keyCode === 27){ //Space / P / ESC
        pause = !pause;
    }
}

function gameOver(){
    isGameOver = true;
    document.getElementById("gameOver").style.display = 'block';
}

function restartGame() {
    snakePos = [
        {x: 70, y: 250},
        {x: 60, y: 250},
        {x: 50, y: 250},
        {x: 40, y: 250},
        {x: 30, y: 250},
        {x: 20, y: 250},
    ];
    setup();
    document.getElementById("gameOver").style.display = 'none';
}

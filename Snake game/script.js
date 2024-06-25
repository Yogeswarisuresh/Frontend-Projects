const gameboard = document.getElementById('gameboard')
// getting context for the canva
const context = gameboard.getContext('2d');
const scoretxt  = document.getElementById('scoreVal')
const HEIGHT = gameboard.height;
const WIDTH = gameboard.width;
//food height
const UNIT = 25;
// coordinates of food in gameboard
let foodx;
let foody;
let score = 0;
//Speed of snake
let xVel = UNIT;
let yVel = 0;
let active  = true;
let starter = false;
// initially defining the snake body with 4 coordinates
let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];
// to find the keys pressed by the user
window.addEventListener('keydown',keyPress)
startGame();
function startGame(){
    context.fillStyle = 'black';
    //fillRect(xstart,ystart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT)
    createFood();
    displayFood();
    drawSnake();
}
function createFood(){
    foodx = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foody = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}

function displayFood(){
    context.fillStyle = 'red'
    context.fillRect(foodx,foody,UNIT,UNIT)
}

function drawSnake(){
    context.fillStyle = 'blue';
    context.strokeStyle = 'black';
    snake.forEach(element => {
        context.fillRect(element.x,element.y,UNIT,UNIT)
        context.strokeRect(element.x,element.y,UNIT,UNIT)
    });
}

function moveSnake(){
    const head = {x:snake[0].x+xVel,
        y:snake[0].y+yVel}
    snake.unshift(head)
    if(snake[0].x == foodx && snake[0].y == foody){
        score +=1;
        scoretxt.innerText = score;
        createFood();
    }
    else{
        snake.pop();
    }
}

function clearBoard(){
    context.fillStyle = 'black';
    //fillRect(xstart,ystart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT)
}

// nextTick method to call the function repeatedly
function nextTick(){
    if(active){
        setTimeout( () =>{
            clearBoard();
            displayFood();
            drawSnake();
            moveSnake();
            checkGameover();
            nextTick();
        },300)
    }
    else{
        clearBoard();
        context.font = "bold 50px serif";
        context.fillStyle = 'White';
        context.textAlign = "center";
        context.fillText("Game Over!!",WIDTH/2,HEIGHT/2)
    }

}

function keyPress(event){
    if(!starter){
        starter = true;
        nextTick();
    }
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40
    switch(true){
        case(event.keyCode == LEFT && xVel!=UNIT):
            xVel = -UNIT;
            yVel = 0;
            break;
        case(event.keyCode == RIGHT && xVel!=-UNIT):
            xVel = UNIT;
            yVel = 0;
            break;
        case(event.keyCode == UP && yVel!=UNIT):
            xVel = 0;
            yVel = -UNIT;
            break;
        case(event.keyCode == DOWN && yVel!=-UNIT):
            xVel = 0;
            yVel = UNIT;
            break;
    }
}
function checkGameover(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
        case(snake[0] == snake[snake.length-1]):
            active = false ;
            break;
    }
}
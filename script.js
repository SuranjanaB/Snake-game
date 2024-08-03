let foodX=13, foodY=10;
let snakeX=5, snakeY=10;
let veloX=0,veloY=0;
let snakeBody=[];
let gameOver=false;
let setIntervalId;
let score=0;




const playArea=document.querySelector(".play-area");
const scoreEle=document.querySelector(".score");
const highScoreEle=document.querySelector(".high-score");
const controls=document.querySelectorAll(".controls i");

let highScore=localStorage.getItem("high-score") || 0;
highScoreEle.innerHTML=`High Score: ${highScore}`;

const changeFoodPos=()=>{
    foodX=Math.floor(Math.random()*30)+1;
    foodY=Math.floor(Math.random()*30)+1;
}
const handleGameOver=()=>{
    clearInterval(setIntervalId);
    alert("Game over!!! Press Ok to replay!");
    location.reload();
}

const changeDirection=(e)=>{
    if(e.key=="ArrowUp" && veloY != 1 ){
        veloX=0;
        veloY=-1;
    }else if(e.key=="ArrowDown" && veloY != -1){
        veloX=0;
        veloY=1;
    }else if(e.key=="ArrowLeft" && veloX != 1){
        veloX=-1;
        veloY=0;
    }else if(e.key=="ArrowRight" && veloX != -1){
        veloX=1;
        veloY=0;
    }
    iniyGame();
}

controls.forEach(key=>{
    key.addEventListener("click",()=>changeDirection({key : key.dataset.key}));
});

const iniyGame=()=>{
    if(gameOver) return handleGameOver();
    let htmlMark=`<div class="food" style="grid-area:${foodY}/${foodX}"></div>`
    
    if(snakeX===foodX && snakeY===foodY){
        changeFoodPos();
        snakeBody.push([foodX,foodY]);
        console.log(snakeBody);
        score++;

        highScore=score>=highScore?score:highScore;
        localStorage.setItem("high-score",highScore);
        scoreEle.innerHTML=`Score: ${score}`;
        highScoreEle.innerHTML=`High Score: ${highScore}`;
    }

    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    
    snakeBody[0]=[snakeX,snakeY];

    snakeX+=veloX;
    snakeY+=veloY;

    if(snakeX<=0 || snakeX>30 || snakeY<=0 || snakeY>30){
        gameOver=true;
    } 

    for(let i=0;i<snakeBody.length;i++){
        htmlMark+=`<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`
        if(i!=0 && snakeBody[0][1]===snakeBody[i][1] && snakeBody[0][0]===snakeBody[i][0]){
            gameOver=true;
        }
    
    }
    
    playArea.innerHTML=htmlMark;
}

changeFoodPos();
setIntervalId=setInterval(iniyGame,170);

document.addEventListener("keydown",changeDirection);
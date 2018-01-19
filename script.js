var canvas = document.getElementById('brickbreaker');
var ctx = canvas.getContext('2d');

function game(){
    this.ballRadius = 10;
    this.x = canvas.width/2;
    this.y = canvas.height-20;
    this.dx = 4;
    this.dy = 4;
    this.levelOBJ;
    this.paddleHeight = 10;
    this.paddleWidth = 120;
    this.paddleX = (canvas.width- this.paddleWidth)/2;
    this.rightPressed = false;
    this.leftPressed = false;
    this.score = 0;
    this.lives = 3;
    this.sum = 0; 
    this.levelarray = 1
switch (this.levelarray) {
        case 1:
            this.levelOBJ = level1;
            break;
        case 2:
            this.levelOBJ = level2;
            break;
        case 3:
            this.levelOBJ = level3;
            break;
        case 4:
            this.levelOBJ = level4;
            break;
        case 5 : alert("Congartilations you finished the game! click here to restart!");
            window.location.reload();
            break;
}
}
game.prototype.drawPaddle = function () {
    ctx.beginPath();
    ctx.rect(this.paddleX, canvas.height-this.paddleHeight, this.paddleWidth, this.paddleHeight);
    ctx.fillStyle = "purple";
    ctx.fill();
    // ctx.clip();
    ctx.closePath();
};
game.prototype.drawBall = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
};
game.prototype.drawScore= function(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Score: "+this.score, 8, 20);
};

game.prototype.drawLives = function (){
    ctx.font = "16px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Lives: "+this.lives, canvas.width-85, 20);

};
game.prototype.drawLevelNum = function (){
    ctx.font = "16px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Level: "+this.levelarray, canvas.width/2, 20);

};
game.prototype.scoresum = function(){
     var levelsarray = this.levelOBJ;
     var sum = 0
        for(key in levelsarray){
            sum += levelsarray[key].score;
        }
        this.sum = sum;
    console.log("sum is: "+this.sum);
}
game.prototype.iswinner = function(){
    var levelsarray = this.levelOBJ;
    for(key in levelsarray) {
        for(key2 in levelsarray) {
            if(this.x > levelsarray[key2].x && this.x < levelsarray[key2].x+levelsarray[key2].width && this.y > levelsarray[key2].y && this.y < levelsarray[key2].y+levelsarray[key2].height) {
                var audio = new Audio('brick.mp3');
                audio.play();
                if(levelsarray[key2].image == 1){
                    this.dy = -this.dy;
                    this.score+= levelsarray[key2].score;
                    ctx.fillStyle = 'red';
                     levelsarray[key2].image = 0;
                }
                
                else if(levelsarray[key2].image == 0){
                    this.dy = -this.dy;
                    this.score+= levelsarray[key2].score;
                    delete levelsarray[key2];
                    }else{
                    this.dy = -this.dy;
                    this.score+= levelsarray[key2].score;
                    delete levelsarray[key2];
                }
                   
                if(this.score == this.sum) {
                    this.levelarray++
                    this.score = 0;
                    this.lives = 3;
                    this.winner();  
                    c.colorFunc();
                    testbricks.levelup();
                    if(this.levelarray >= 0 )
                    {
                    this.GameOver();
                    setTimeout(function() {
                        window.location.reload();
                    }, 3000); 
                        
                    }
    
                }
            }
        }
    }
    
}
game.prototype.winner = function(e){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.font = "64px Arial";
    ctx.fillStyle = "darkblue";
    ctx.fillText("Congrats!!, click to Level up.",canvas.width/ 2, canvas.height/2);
    if(e){
        this.letsPlay();
    }
}
game.prototype.GameOver = function(e){
    var audio = new Audio('gameover.mp3');
    audio.play();
 ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.font = "64px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("GameOver!!, click here to restart.",canvas.width/ 6, canvas.height/2);
    if(e){
        this.letsPlay();
    }
}
game.prototype.letsPlay = function(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    this.drawBall();
    this.drawPaddle();
    this.drawScore();
    this.drawLives();
    this.drawLevelNum();

    // c.colorFunc();
    this.iswinner();
    if(this.x + this.dx > canvas.width-this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
             var audio = new Audio('brick.mp3');
            audio.play();

    }
    if(this.y + this.dy < this.ballRadius) {
        this.dy = -this.dy;
         var audio = new Audio('brick.mp3');
            audio.play();

    }
    else if(this.y + this.dy > canvas.height-this.ballRadius) {
        if(this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
            this.dy = -this.dy;
            var audio = new Audio('paddle.mp3');
            audio.play();
    }
        else {
            var audio = new Audio('loselife.mp3');
             audio.play();
            this.lives--;
            if(!this.lives) {
                ctx.clearRect(0,0,canvas.width, canvas.height);
                this.levelarray = 0;
                  this.GameOver();
              setTimeout(function() {
                 window.location.reload();
              }, 2000); 
            }
                else {
                var audio = new Audio('brick.mp3');
                audio.play();

                    this.x = canvas.width/2;
                    this.y = canvas.height-30;
                    this.dx = 3;
                    this.dy = -3;
                    this.paddleX = (canvas.width-this.paddleWidth)/2;
                }
            }
        }
        if(this.rightPressed && this.paddleX < canvas.width-this.paddleWidth) {
            this.paddleX += 7;
        }
        else if(this.leftPressed && this.paddleX > 0) {
            this.paddleX -= 7;
        }
        this.x += this.dx;
        this.y += this.dy;
};
game.prototype.keyDownHandler= function (e) {
    if(e.keyCode == 39) {
        this.rightPressed = true;
    }
    else if(e.keyCode == 37) {
        this.leftPressed = true;
    }
   
};
game.prototype.keyUpHandler = function(e) {
    if(e.keyCode == 39) {
        this.rightPressed = false;
    }
    else if(e.keyCode == 37) {
        this.leftPressed = false;
    }
};
game.prototype.mouseMoveHandler = function(e) {
    var moveMent = e.clientX - canvas.offsetLeft;
    if(moveMent > 0 && moveMent < canvas.width) {
        this.paddleX = moveMent - this.paddleWidth/2;

    }
        
};
function goFullScreen(){
    var canvas = document.getElementById('brickbreaker');
        if(canvas.requestFullScreen)
        canvas.requestFullScreen();
    else if(canvas.webkitRequestFullScreen)
        canvas.webkitRequestFullScreen();
    else if(canvas.mozRequestFullScreen)
        canvas.mozRequestFullScreen();
}
function startMusic(){
        audio = new Audio("music.mp3");
        audio.play()
        audio.autoplay = true;
        audio.addEventListener('ended',function(){
        audio.src = "bg2.mp3";
        audio.pause();
        audio.load();
        audio.play();
    });
  }
function stopMusic(){
    audio.pause();
}
window.onload = function() {   
    var etc = new game();
    etc.scoresum();
    document.addEventListener("keydown", etc.keyDownHandler.bind(etc), false);
    document.addEventListener("keyup", etc.keyUpHandler.bind(etc), false);
    document.addEventListener("mousemove", etc.mouseMoveHandler.bind(etc), false);
  var t =   setInterval(etc.letsPlay.bind(etc), 10);
 

};
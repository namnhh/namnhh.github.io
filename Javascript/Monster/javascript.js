// JavaScript Document
const FPS = 60;
const TICKS = 1000/FPS;
//Define  myGameArea Canvas
myGameArea = document.getElementById("myGameArea");
ctxGA = myGameArea.getContext("2d");
//Define myGameTitle Canvas
myGameTitle = document.getElementById("myGameTitle");
ctxGT = myGameTitle.getContext("2d");
//
var speedArr = [0,2,2,2,2];
var appleArr = [0,1,2,3,4];
var score = 0;
var highscore = 0;
if(sessionStorage.getItem("highscore") == null) {
	sessionStorage.setItem("highscore",0);
} else {
	highscore = sessionStorage.getItem("highscore");
}
var level = 1;
var heartNum = 5;
var boomNum = 3;
var speed = 1;
var running = true;
var dead = false;
//Define apple
var appleH = 40;
var appleW = 40;
var iconApple = new Image();
iconApple.onLoad = function() {}
iconApple.src = "images/apple.png";
//define background
var imgBG = new Image();
imgBG.onLoad = function() {}
imgBG.src = "images/background.png";
//define heart
var heart = new Image();
heart.onLoad = function() {}
heart.src = "images/heart.png";
//define boom
var boom = new Image();
boom.onLoad = function() {}
boom.src = "images/boom.png";
//define pause
var pause = new Image();
pause.onLoad = function() {}
pause.src = "images/pause.png";
//define restart
var restart = new Image();
restart.onLoad = function() {}
restart.src = "images/restart.png";
//Define apple 1. Corner left top. Move from (0,0) to (150,150)
var apple1 = { initX:0, initY:0, x:0, y:0, toX:150, toY:150, initToX:150, initToY:150, die:false, visible:true };
//Define apple 2. Middle top. Move from (250,0) to (250,150)
var apple2 = { initX:250, initY:0, x:250, y:0, toX:250, toY:150, initToX:250, initToY:150, die:false, visible:false };
//Define apple 3. Corner right top. Move from (500,0) to (350,150)
var apple3 = { initX:500, initY:0, x:500, y:0, toX:350, toY:150, initToX:350, initToY:150, die:false, visible:false };
//Define apple 4. Left between. Move from (0,250) to (150,250)
var apple4 = { initX:0, initY:250, x:0, y:250, toX:150, toY:250, initToX:150, initToY:250, die:false, visible:false };
//Define apple 5. Right between. Move from (500,250) to (350,250) 
var apple5 = { initX:500, initY:250, x:500, y:250, toX:350, toY:250, initToX:350, initToY:250, die:false, visible:false };
//Define apple 6. Corner left bottom. Move from (0,500) to (150,350)
var apple6 = { initX:0, initY:500, x:0, y:500, toX:150, toY:350, initToX:150, initToY:350, die:false, visible:false };
//Define apple 7. Middle bottom. Move from (250,500) to (250,350)
var apple7 = { initX:250, initY:500, x:250, y:500, toX:250, toY:350, initToX:250, initToY:350, die:false, visible:false };
//Define apple 8. Corner right bottom. Move from (500,500) to (350,350)
var apple8 = { initX:500, initY:500, x:500, y:500, toX:350, toY:350, initToX:350, initToY:350, die:false, visible:false };
//Define apple 9,10. Middle between
var a = generateRandom(200, 250);
var b = generateRandom(250, 300);
var apple9 = { initX:a, initY:a, x:a, y:a, toX:a+200, toY:a+200, initToX:a+200, initToY:a+200, die:false, visible:false };
var apple10 = { initX:b, initY:b, x:b, y:b, toX:b-200, toY:b+200, initToX:b-200, initToY:b+200, die:false, visible:false };
//random expect value 270.
function generateRandom(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === 270) ? generateRandom(min, max) : num;
}
// random to choose type of apple to display 
function randomApple() {
	var r = generateRandom(1, 10);
	//var r = 10;
	if (r == 1){
		if(!apple1.visible) {
			apple1.visible = true;
			apple1.die = false;			
		}
	}
	if (r == 2){
		if(!apple2.visible) {
			apple2.visible = true;
			apple2.die = false;			
		}
	}
	if (r == 3){
		if(!apple3.visible) {
			apple3.visible = true;
			apple3.die = false;			
		}
	}
	if (r == 4){
		if(!apple4.visible) {
			apple4.visible = true;
			apple4.die = false;			
		}
	}
	if (r == 5){
		if(!apple5.visible) {
			apple5.visible = true;
			apple5.die = false;			
		}
	}
	if (r == 6){
		if(!apple6.visible) {
			apple6.visible = true;
			apple6.die = false;			
		}
	}
	if (r == 7){
		if(!apple7.visible) {
			apple7.visible = true;
			apple7.die = false;			
		}
	}
	if (r == 8){
		if(!apple8.visible) {
			apple8.visible = true;
			apple8.die = false;			
		}
	}
	if (r == 9){
		if(!apple9.visible) {
			apple9.visible = true;
			apple9.die = false;			
		}
	}
	if (r == 10){
		if(!apple10.visible) {
			apple10.visible = true;
			apple10.die = false;			
		}
	}
}
//functuon when click to the apple
function chooseApple (nowX,nowY,apple) {
	if (nowX >= apple.x && nowX <= apple.x+appleW && nowY >=apple.y && nowY <=apple.y+appleH) {
		score += 20;
		heartNum++;
	
		apple.visible = false;
		apple.die = true;
		apple.x = apple.initX;
		apple.y = apple.initY;
		apple.toX = apple.initToX;
		apple.toY = apple.initToY;
		
		var levelPrevious = level;
		level = Math.ceil(score/100);
		if(level < levelPrevious) {
			level = levelPrevious;
		}

		if(level > 4) {
			level = 4;
		}
		for(var i = 1; i <= appleArr[level]; i++) {
			randomApple();
		}
		speed = speedArr[level];
	}
}
//function add event listenr to myGameArea
myGameArea.addEventListener("click", function(e) {
	// e.pageX is value of loation x of mouse; offsetLeft is distance form boder-right to apple
	var xMouse = e.pageX - this.offsetLeft;
	//e.pageY is value of location y of mouse; offsetTop is distance from boder-top to apple
	var yMouse = e.pageY - this.offsetTop;
	score -=10;
	heartNum--;
	if (apple1.visible == true) {
		chooseApple(xMouse,yMouse,apple1);
	}
	if (apple2.visible == true) {
		chooseApple(xMouse,yMouse,apple2);
	}
	if (apple3.visible == true) {
		chooseApple(xMouse,yMouse,apple3);
	}
	if (apple4.visible == true) {
		chooseApple(xMouse,yMouse,apple4);
	}
	if (apple5.visible == true) {
		chooseApple(xMouse,yMouse,apple5);
	}
	if (apple6.visible == true) {
		chooseApple(xMouse,yMouse,apple6);
	}
	if (apple7.visible == true) {
		chooseApple(xMouse,yMouse,apple7);
	}
	if (apple8.visible == true) {
		chooseApple(xMouse,yMouse,apple8);
	}
	if (apple9.visible == true) {
		chooseApple(xMouse,yMouse,apple9);
	}
	if (apple10.visible == true) {
		chooseApple(xMouse,yMouse,apple10);
	}
	
});
//set screen
function screen() {
	ctxGT.fillStyle = "#091124";
	ctxGT.fillRect(0,0,540,120);
	ctxGT.fillStyle = "#3F3";
	ctxGT.font = "25px Arial";
	ctxGT.fillText("Heart: ",10,30);
	ctxGT.fillText("Level: "+level,250,30);
	var xHeart = 80;
	if (heartNum == 0) ctxGT.fillText("0",80,30);
	else
	 for (var i = 1; i <= heartNum; i++) {
		ctxGT.drawImage(heart,xHeart,10);
		xHeart += 30;
	 }
	ctxGT.fillText("Score: "+score,10,70);
	ctxGT.fillText("HighScore: "+highscore,10,110);
	ctxGT.drawImage(boom,250,60,60,60);//(250,60)
	ctxGT.drawImage(pause,340,60,60,60);//(340,60)
	ctxGT.drawImage(restart,430,60,60,60);//(430,60)
	ctxGT.fillStyle = "#F00";
	ctxGT.fillText(boomNum,270,60);	
	ctxGA.drawImage(imgBG,0,0,540,540);	
	if(apple1.visible)
		ctxGA.drawImage(iconApple, apple1.x, apple1.y, appleW, appleH);
	if(apple2.visible)
		ctxGA.drawImage(iconApple, apple2.x, apple2.y, appleW, appleH);
	if(apple3.visible)
		ctxGA.drawImage(iconApple, apple3.x, apple3.y, appleW, appleH);
	if(apple4.visible)
		ctxGA.drawImage(iconApple, apple4.x, apple4.y, appleW, appleH);
	if(apple5.visible)
		ctxGA.drawImage(iconApple, apple5.x, apple5.y, appleW, appleH);
	if(apple6.visible)
		ctxGA.drawImage(iconApple, apple6.x, apple6.y, appleW, appleH);
	if(apple7.visible)
		ctxGA.drawImage(iconApple, apple7.x, apple7.y, appleW, appleH);
	if(apple8.visible)
		ctxGA.drawImage(iconApple, apple8.x, apple8.y, appleW, appleH);
	if(apple9.visible)
	    ctxGA.drawImage(iconApple, apple9.x, apple9.y, appleW, appleH);
	if(apple10.visible)
	    ctxGA.drawImage(iconApple, apple10.x, apple10.y, appleW, appleH);	
	
}
//Update location apple
function update() {
	if(apple1.visible)
		updateApple(apple1);
	if(apple2.visible)
		updateApple(apple2);
	if(apple3.visible)
		updateApple(apple3);
	if(apple4.visible)
		updateApple(apple4);
	if(apple5.visible)
		updateApple(apple5);
	if(apple6.visible)
		updateApple(apple6);
	if(apple7.visible)
		updateApple(apple7);
	if(apple8.visible)
		updateApple(apple8);
	if(apple9.visible)
		updateApple(apple9);
	if(apple10.visible)
		updateApple(apple10);
}

//This function controll apple'smove in mainCanvas.
function updateApple(apple) {
	if(apple.x > apple.toX) {
		apple.x -= speed ;
	} else if(apple.x < apple.toX) {
		apple.x += speed;
	}

	if(apple.y > apple.toY) {
		apple.y -= speed;
	} else if(apple.y < apple.toY) {
		apple.y += speed;
	}
	if(apple.x == apple.toX && apple.y == apple.toY) {
		apple.x = apple.toX;
		apple.y = apple.toY;
		apple.toX = apple.initX;
		apple.toY = apple.initY;
	}
	 
	 
	if(apple.x == apple.initX && apple.y == apple.initY) {
       
		apple.visible = false;
		apple.x = apple.initX;
		apple.y = apple.initY;
		apple.toX = apple.initToX;
		apple.toY = apple.initToY;
		score -= 10;
		heartNum--;
		randomApple();
	}	
}
//reset Apple
function resetApple(apple) {
	apple.x = apple.initX;
	apple.y = apple.initY;
	apple.toX = apple.initToX;
	apple.toY = apple.initToY;
	apple.die = false;
	apple.visible = false;
}
//restart game
function restartGame() {
	resetApple(apple1);
	resetApple(apple2);
	resetApple(apple3);
	resetApple(apple4);
	resetApple(apple5);
	resetApple(apple6);
	resetApple(apple7);
	resetApple(apple8);
	resetApple(apple9);
	resetApple(apple10);
    speed = 1;
	level = 1;
	running = true;
	score = 0;
	heartNum = 5;
	highScore = sessionStorage.getItem("highscore");
	boomNum = 3;
	apple1.visible = true;
	main();
}
//boom apple
function boomApple() {
	if(boomNum > 0) {
		boomNum--;
		if(apple1.visible == true) {
			apple1.visible = false;
			score += 10;
		}
		if(apple2.visible == true) {
			apple2.visible = false;
			score += 10;
		}
		if(apple3.visible == true) {
			apple3.visible = false;
			score += 10;
		}
		if(apple4.visible == true) {
			apple4.visible = false;
			score += 10;
		}
		if(apple5.visible == true) {
			apple5.visible = false;
			score += 10;
		}
		if(apple6.visible == true) {
			apple6.visible = false;
			score += 10;
		}
		if(apple7.visible == true) {
			apple7.visible = false;
			score += 10;
		}
		if(apple8.visible == true) {
			apple8.visible = false;
			score += 10;
		}
		if(apple9.visible == true) {
			apple9.visible = false;
			score += 10;
		}
		if(apple10.visible == true) {
			apple10.visible = false;
			score += 10;
		}			
    }
	resetApple(apple1);
	resetApple(apple2);
	resetApple(apple3);
	resetApple(apple4);
	resetApple(apple5);
	resetApple(apple6);
	resetApple(apple7);
	resetApple(apple8);
    resetApple(apple9);
	resetApple(apple10);
	randomApple();
}
// function add event listener to myGameTitle 
myGameTitle.addEventListener("click",function(e) {
	var xClick = e.pageX - this.offsetLeft;
	var yClick = e.pageY - this.offsetTop;
	//click to boom
	if(xClick >= 250 && xClick <= 310 && yClick >=60 && yClick <=120) {
		boomApple();
	}
    //click to pause
	if(xClick >= 340 && xClick <= 400 && yClick >=60 && yClick <=120) {
		if(running == true) {
			running = false;
		}
		else if(running == false) {
			running = true;
			main();
		}
	}
	//click to restart
	if(xClick >= 430 && xClick <= 490 && yClick >=60 && yClick <=120) {
		restartGame();
	}
});
function main() {
	var now = Date.now();
	var differentTime = now - lastUpdateTime;
	if(differentTime >= TICKS) {
		update();
		screen();
		lastUpdateTime = now;
	}
	var sleepTime = TICKS - differentTime;
	if(sleepTime < 0) {
		sleepTime = 0;
	} 
	if (running == true) {
		requestAnimationFrame(main);
	} else if (running == false && dead == false) {
		ctxGA.fillStyle = "#F1F1F1";
		ctxGA.font = "30px Arial"
		ctxGA.fillText("PAUSE", 250, 250);
	} else if (running == false && dead == true) {
		if(score > highscore) {
			highscore = score;
			sessionStorage.setItem("highscore",score);
			ctxGA.fillStyle = "#F1F1F1";
			ctxGA.font = "20px Arial"
			ctxGA.fillText("NEW HIGHSCORE: " + highscore, 180, 280);
		}
        else {
		    ctxGA.fillStyle = "#F1F1F1";
		    ctxGA.font = "30px Arial"
		    ctxGA.fillText("SCORE: " + score, 200, 250);
		}
	}
	
	if(heartNum <= 0) {
		running = false;
		dead = true;
	}

}
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var lastUpdateTime = Date.now();
main();
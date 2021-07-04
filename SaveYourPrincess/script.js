let canvas=document.createElement('canvas')
ctx=canvas.getContext('2d')
canvas.height=800
canvas.width=800;
document.getElementById('canvas').appendChild(canvas)



// Drawing function

document.getElementById('canvas').appendChild(canvas)

const grassWidth = 100;
const grassHeight = 100;
const grassOffsetTop = 20;
const grassOffsetLeft = 20;
const grassColumn = 7;
const grassRow = 7;
const grassPadding = 10;
let grassdx=[];
let grassdy=[];

function drawGrass() {
let grass ={};
for (let c=0; c < grassColumn; c++){
    grass[c]=[];
    for (let r = 0; r < grassRow; r++){
        let grassX = (c*(grassWidth+grassPadding)) + grassOffsetLeft;
        let grassY = (r*(grassHeight+grassPadding)) + grassOffsetTop;
        grass[c][r]={x: grassX, y: grassY}
        grassdx.push(grassX);
        grassdy.push(grassY);
       
        ctx.beginPath();
        ctx.rect(grassX, grassY, grassWidth, grassHeight);
        ctx.fillStyle="#289672";
        ctx.fill();
        ctx.closePath();
    }
}
}
drawGrass();

function randomX(){
let X = grassdx[Math.floor(Math.random()*grassdx.length)];
return X
}

function randomY(){
let Y = grassdy[Math.floor(Math.random()*grassdy.length)];
return Y
}

let hero = {
    x: randomX() +5,
    y: randomY() +5,
};

let monster = {
    x: randomX() +5,
    y: randomY() + 5,
};

let trap = {
    x: randomX() +5,
    y: randomY()+5,
}

let FakePrincess = {
    x: hero.x+(grassWidth+grassPadding)*2,
    y: randomY()+5,
}

let Princess ={
    x:grassOffsetLeft+(grassWidth+grassPadding)*6+5,
    y: grassOffsetTop+5,
}
// Draw characters


function draw () {

    hero.image = new Image();
	hero.image.onload = function () {
		// show the hero image
		hero.ready = true;
	};
	hero.image.src = 'Images/Hero.png';

    monster.image = new Image();
	monster.image.onload = function () {
		// show the monster image
		monster.ready = true;
	};
	monster.image.src = 'Images/monster.png';

    FakePrincess.image = new Image();
	FakePrincess.image.onload = function () {
		// show the monster image
		FakePrincess.ready = true;
	};
	FakePrincess.image.src = 'Images/fake-princess.png';

    trap.image = new Image();
	trap.image.onload = function () {
		// show the monster image
		trap.ready = true;
	};
	trap.image.src = 'Images/trap.png';

    Princess.image = new Image();
	Princess.image.onload = function () {
		// show the monster image
		Princess.ready = true;
	};
	Princess.image.src = 'Images/Princess.png';

}


let moveRemaining = Math.floor((Princess.x-hero.x)/(grassWidth))+2;
function render() {
    
    if (hero.ready) {   
        ctx.drawImage(hero.image, hero.x, hero.y,90,90);
    }   
    if (monster.ready){
        ctx.drawImage(monster.image, monster.x, monster.y,90,90);
    }
    if (FakePrincess.ready){
        ctx.drawImage(FakePrincess.image, FakePrincess.x, FakePrincess.y,90,90);
    }
    if (Princess.ready){
        ctx.drawImage(Princess.image, Princess.x, Princess.y, 70, 90)
    };
    ctx.fillStyle="white";
    ctx.fillText(`Move(s) Remaining: ${moveRemaining}`, 20, 13);
}


function renderTrap (){
    for (i=1; i<=2;i++){
       if (trap.ready) {
        trap.x=randomX()+5;
        trap.y=randomY()+5;
        ctx.drawImage(trap.image, trap.x, trap.y, 90, 90);
    }
}
}


let rightPressed = false;
leftPressed = false;
upPressed = false;
downPressed = false;

function keyboardListener(){
document.addEventListener('keydown', function (e){
    if (e.key=='Right' || e.key=="ArrowRight"){
        rightPressed=true
    }
    if (e.key=='Left' || e.key=="ArrowLeft"){
        leftPressed=true
    }
    if (e.key=="Up" || e.key =="ArrowUp"){
        upPressed=true
    }
    if (e.key == "Down" || e.key == "ArrowDown"){
        downPressed=true
    }
}, false)
}


function update() {
    //Moving characters
    if (rightPressed==true){
        hero.x += grassWidth+grassPadding;
        FakePrincess.x -= grassWidth+grassPadding;
        monster.x = randomX() + 5;
        monster.y = randomY()+5;
        moveRemaining-= 1;
        rightPressed=false;
    }
    if(leftPressed==true){
        hero.x -= grassWidth+grassPadding;
        FakePrincess.x += grassWidth+grassPadding;
        monster.x = randomX()+5;
        monster.y = randomY()+5;
        moveRemaining-=1;
        leftPressed=false;
    }

    if(upPressed==true){
        hero.y-= grassHeight+grassPadding;
        FakePrincess.y += grassHeight+grassPadding;
        monster.x = randomX()+5;
        monster.y = randomY()+5;
        moveRemaining-=1;
        upPressed=false;
    }

    if (downPressed==true){
        hero.y += grassHeight+grassPadding;
        FakePrincess.y -= grassHeight+grassPadding;
        monster.x = randomX()+5;
        monster.y = randomY()+5;
        moveRemaining-=1;
        downPressed=false;
    }
    
    //Hero & Fake princess can cross over the edges
    if (hero.x<grassOffsetLeft){
        hero.x= hero.x + (grassWidth + grassPadding)*7
    }
    
    if(FakePrincess.x<grassOffsetLeft){
        FakePrincess.x= FakePrincess.x + (grassWidth + grassPadding)*7
    }

    if (hero.x>grassOffsetLeft+(grassWidth+grassPadding)*7){
        hero.x= grassOffsetLeft+5
    }
    if (FakePrincess.x > grassOffsetLeft+(grassWidth+grassPadding)*7){
        FakePrincess.x = grassOffsetLeft+5
    }

    if (hero.y<grassOffsetTop){
        hero.y=hero.y + (grassHeight + grassPadding)*7
    }

    if (FakePrincess.y < grassOffsetTop){
        FakePrincess.y=FakePrincess.y + (grassHeight + grassPadding)*7
    }

    if (hero.y > grassOffsetTop + (grassHeight+grassPadding)*7){
        hero.y = grassOffsetTop+5;
    }

    if (FakePrincess.y > grassOffsetTop + (grassHeight+grassPadding)*7){
        FakePrincess.y = grassOffsetTop+5;
    }
    
    // Hero always appear at least 3 steps away from the Pincess
    if (Princess.x-hero.x<=(grassWidth+grassPadding)*3 || (hero.y-Princess.y>=(grassHeight+grassPadding)*4)){
        draw();
        render();
    }

    //Monster cant stand at the same place with fake princess and pricess
    if ((monster.x==FakePrincess.x && monster.y==FakePrincess.y) || (monster.x==Princess.x && monster.y==Princess.y)){
        monster.x=randomX()+5;
        monster.y=randomY()+5;
    }
    


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawGrass();
    // draw()

}

function main(){
    update();
    drawGrass();
    draw();
    render();

        //END GAME
    // LOSE: When hero meets one of the obticles or run out of move
    if ((hero.x==monster.x && hero.y==monster.y) || (hero.x==FakePrincess.x && hero.y==FakePrincess.y) || (hero.x==trap.x && hero.y==trap.y) || (moveRemaining==0 && (hero.x != Princess.x || hero.y != Princess.y))){
        alert('GAME OVER AHAHA');
        draw();
        renderTrap();
        return
    }
    
    //WIN: When hero meets the princess within the given moves without facing any obticle
    if ((hero.x==Princess.x && hero.y==Princess.y) && moveRemaining>=0){
        alert('CONGRATULATIONS! You have found your missing piece <3')
        draw();
        renderTrap();
        return
    }
    
    requestAnimationFrame(main);
    
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

draw();
keyboardListener();
main();












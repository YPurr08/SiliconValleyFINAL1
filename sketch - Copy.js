
var form;
var player, tools, obstacle, zone, enemyZone;
let currentLevel = 1;
var enemySpeedX, enemySpeedY;
var xspeedArray = [15, 15, 15];
var yspeedArray = [5, 5, 5];
var num = 10;
var sprite1, sprite2, sprite3, sprite4, sprite5, sprite6, sprite7, sprite8, sprite9, sprite10;
var toolArray = [sprite1, sprite2, sprite3, sprite4, sprite5, sprite6], sprite7, sprite8, sprite9, sprite10;
var score = 0;
const GAME_STATES = {
    GAME_OVER: 0,
    GAME_PLAY: 1,
    GAME_START_NOTE: 2,
    GAME_START_INPUT: 3,
    GAME_PAUSE: 4
};
var gameState = GAME_STATES.GAME_START_INPUT;
var database, playersNodeRef, playerName;
var NameArray, PlayerInfo;
var covid1Image, covid2Image, covid3Image, doctorImage;
var toolImageArray = [];
var maskTool1, gloveTool2, sanitizerTool3, ventilator_TOOL4, thermometer_TOOL5, faceshiled_TOOL6, goggles_TOOL7, vaccine_TOOL8, gown_TOOL9, waste_TOOL10;
var enemy1, enemy2, enemy3;
var enemyArray = [enemy1, enemy2, enemy3];
let TIME_FOR_PLAY = 60;
let timer = TIME_FOR_PLAY;
var covid2;
var scoreArray = [];
var left, right, up, down;
var direction = 0;

function preload(){
    covid1Image = loadImage("Covid1.png");
    covid2Image = loadImage("Covid2.png");
    covid3Image = loadImage("Covid3.png");
    doctorImage = loadImage("Option1.png");
    maskTool1 = loadImage("mask_TOOL1.png");
    gloveTool2 = loadImage("gloves_TOOL2.png");
    sanitizerTool3 = loadImage("sanitizer_TOOL3.png");
    ventilator_TOOL4 = loadImage("ventilator_TOOL4.png");
    thermometer_TOOL5 = loadImage("thermometer_TOOL5.png");
    faceshiled_TOOL6 = loadImage("faceshield_TOOL6.png");
    goggles_TOOL7 = loadImage("goggles_TOOL7.png");
    vaccine_TOOL8 = loadImage("vaccine_TOOL8.png");
    gown_TOOL9 = loadImage("gown_TOOL9.png");
    waste_TOOL10 = loadImage("waste_TOOL10.png");

}
  
function setup(){
    canvas = createCanvas(displayWidth - 20, displayHeight-20);

    player = createSprite(displayWidth/2, displayHeight/2, 50,50);
    player.shapeColor = 'blue'

    enemyArray[0] = createSprite(displayWidth/2 - 170, displayHeight/2 - 170, 50,50);
    enemyArray[0].shapeColor = 'aqua';
    enemyArray[0].visible = false;


    enemyArray[1] = createSprite(displayWidth/2 - 100, displayHeight/2 - 100, 50,50);
    enemyArray[1].shapeColor = 'aqua';
    enemyArray[1].visible = false;

    enemyArray[2] = createSprite(displayWidth/2 - 170, displayHeight/2 + 170, 50,50);
    enemyArray[2].shapeColor = 'aqua';
    enemyArray[2].visible = false;

    for(var i = 0; i < num; i++){
        toolArray[i] = createSprite(random(50, displayWidth - 50), random(50, displayHeight - 50), 30, 30);
        toolArray[i].visible = false;
    }
    database = firebase.database();
    form = new Form();
    form.start();

    playersNodeRef = database.ref('players');

    enemyArray[0].addImage(covid1Image);
    enemyArray[0].width = 30;
    enemyArray[0].height = 30;
    enemyArray[0].scale = 0.3;

    enemyArray[1].addImage(covid2Image);
    enemyArray[1].width = 30;
    enemyArray[1].height = 30;
    enemyArray[1].scale = 0.3;

    enemyArray[2].addImage(covid3Image);
    enemyArray[2].width = 30;
    enemyArray[2].height = 30;
    enemyArray[2].scale = 0.3;

    player.addImage(doctorImage);
    player.width = 50;
    player.height = 50;
    player.scale = 0.2;

    toolArray[0].addImage(maskTool1);
    toolArray[0].scale = 0.11;

    toolArray[1].addImage(gloveTool2);
    toolArray[1].scale = 0.09;

    toolArray[2].addImage(sanitizerTool3);
    toolArray[2].scale = 0.25;

    toolArray[3].addImage(ventilator_TOOL4);
    toolArray[3].scale = 0.19;

    toolArray[4].addImage(thermometer_TOOL5);
    toolArray[4].scale = 0.17;

    toolArray[5].addImage(faceshiled_TOOL6);
    toolArray[5].scale = 0.15;

    toolArray[6].addImage(goggles_TOOL7);
    toolArray[6].scale = 0.13;

    toolArray[7].addImage(vaccine_TOOL8);
    toolArray[7].scale = 0.13;

    toolArray[8].addImage(gown_TOOL9);
    toolArray[8].scale = 0.16;

    toolArray[9].addImage(waste_TOOL10);
    toolArray[9].scale = 0.16;

    buttonNextLevel = createButton("Next Level");
    buttonStopGame = createButton("End Game");
    buttonNextLevel.position(400, displayHeight/2 + 30);
    buttonStopGame.position(500, displayHeight/2 + 30);
    buttonNextLevel.hide();
    buttonStopGame.hide();
}
  
  
function draw(){
    background(150); 
    fill("white");

    GameStateDraw();


    drawSprites();
}

function GameStateDraw(){
    if(gameState === GAME_STATES.GAME_START_NOTE){
        enemyArray[0].visible = false;
        player.visible = false;
        textSize(10);
        fill("black");
        text("This is a tribute to all First Responders who are risking their lives in helping people in need.", displayWidth/2 - 200, displayHeight/2 - 50);
        text("From the bottom of my heart, Thank You.", displayWidth/2 - 70, displayHeight/2 - 20);

        if(frameCount % 180 === 0){
            gameState = 1;
        }
    }
    else if(gameState === GAME_STATES.GAME_PLAY){
        GameStatePlay();
      
    }
    else if(gameState === GAME_STATES.GAME_OVER){
        //playersNodeRef.child(playerName).set({'Username': playerName, 'Score': score, 'Level': 1, "TimeRemaining": timer})
        GameOver();
        for(var l = 0; l < num; l ++){
            toolArray[l].remove();
        }
    }
    else if (gameState == GAME_STATES.GAME_PAUSE){
        buttonNextLevel.show();
        buttonStopGame.show();
        fill("black");
        textSize(10);
        text("Congratulations on Completing Level " + currentLevel - 1 + "! Click 'Continue' to go to the next level! Click 'End' to stop playing.", 20, displayHeight/2 - 20);
        hideSprites();

        buttonNextLevel.mousePressed(()=>{
            gameState = GAME_STATES.GAME_PLAY;
        });

        buttonStopGame.mousePressed(()=>{
            gameState = GAME_STATES.GAME_OVER;
        });
        timer = TIME_FOR_PLAY;
    }
}

function GameStatePlay(){
    
    player.visible = true;
    buttonNextLevel.hide();
    buttonStopGame.hide();

    TouchMovement();

    switch (currentLevel)
    {
        case 1:
            enemyArray[0].visible = true;
            enemyArray[1].visible = false;
            enemyArray[2].visible = false;
            break;
        case 2:
            enemyArray[0].visible = true;
            enemyArray[1].visible = true;
            enemyArray[2].visible = false;
            break;
        case 3:
            enemyArray[0].visible = true;
            enemyArray[1].visible = true;
            enemyArray[2].visible = true;
            break;
    }

    fill("black");
    textSize(20);
    text("Time Left: " + timer, 50, 45);

    text("Level: " + currentLevel, 50, 80)
    text("Score: " + score, 50, 115)

    if(keyDown(38)){
        player.position.y = player.position.y - 5;
    }
    else if(keyDown(40)){
        player.position.y = player.position.y + 5;
    }
    else if(keyDown(37)){
        player.position.x = player.position.x - 5;
    }
    else if(keyDown(39)){
        player.position.x = player.position.x + 5;
    }
    
    r = random(1, displayWidth - 1);
    r2 = random(1, displayHeight + 1)

    if (frameCount % 60 === 0 && timer > 0) {
        timer --;
    }
    if (timer === 0) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        
        var playerNameRef = playersNodeRef.child(playerName);
        var newPostRef = playerNameRef.push();
        newPostRef.set({'Username': playerName, 'Score': score, 'Level': currentLevel, 'TimeRemaining': timer, "DateTime": dateTime})

        if(currentLevel < 3){
            scoreArray[currentLevel - 1] = score;
            score = 0;
            currentLevel ++;

            gameState = GAME_STATES.GAME_PAUSE
        } 
        else{
            gameState = GAME_STATES.GAME_OVER;
        }
    }

    for(var i = 0; i < 6; i ++){
        if(
            (IsTouching(enemyArray[0], player) && enemyArray[0].visible) || 
            (IsTouching(enemyArray[1], player) && enemyArray[1].visible)||
            (IsTouching(enemyArray[2], player) && enemyArray[2].visible)
            ){
            // (enemyArray[0].isTouching(player) && enemyArray[0].visible) || 
            // (enemyArray[1].isTouching(player) && enemyArray[1].visible)||
            // (enemyArray[2].isTouching(player) && enemyArray[2].visible)
            // ){
            yspeedArray[0] = 0;
            yspeedArray[1] = 0;
            yspeedArray[2] = 0;
            xspeedArray[0] = 0;
            xspeedArray[1] = 0;
            xspeedArray[2] = 0;
            
            gameState = GAME_STATES.GAME_OVER;
        }
    }

    MakeToolsVisible();

    for (var i = 0; i< enemyArray.length; i++)
    {
        if (enemyArray[i].visible)
        {
            enemyArray[i].position.x += xspeedArray[i];
            enemyArray[i].position.y += yspeedArray[i];
            if (enemyArray[i].position.x > displayWidth - enemyArray[i].height/2 || enemyArray[i].position.x < enemyArray[i].height/2) {
                xspeedArray[i] = -xspeedArray[i];
            }
            if (enemyArray[i].position.y > displayHeight - enemyArray[i].height/2 || enemyArray[i].position.y < enemyArray[i].height/2) {
                yspeedArray[i] = -yspeedArray[i];
            }
        }
    }

    


    for(var j = 0; j < num; j++){
        if(IsTouching(player, toolArray[j]) && toolArray[j].visible === true){
            //player.isTouching(toolArray[j]) && toolArray[j].visible === true){
            toolArray[j].position.x = random(50, displayWidth - 50);
            toolArray[j].position.y = random(50, displayHeight - 50);
            toolArray[j].visible = false;
            score = score + 1
        }
    }

}

function IsTouching(sprite1, sprite2)
{
    // ////console.log("sprite1.position.x:" + sprite1.position.x);
    // ////console.log("sprite1.position.y:" + sprite1.position.y);
    // ////console.log("sprite2.position.x:" + sprite2.position.x);
    // ////console.log("sprite2.position.y:" + sprite2.position.y);
    
    // ////console.log("sprite1.width:" + sprite1.width);
    // ////console.log("sprite1.height:" + sprite1.height);
    // ////console.log("sprite2.width:" + sprite2.width);
    // ////console.log("sprite2.height:" + sprite2.height);
    // ////console.log(sprite1);
    // ////console.log(sprite2);


    if (sprite1.position.x < sprite2.position.x + sprite2.width &&
        sprite1.position.x + sprite1.width > sprite2.position.x &&
        sprite1.position.y < sprite2.position.y + sprite2.height &&
        sprite1.position.y + sprite1.height > sprite2.position.y) {
            // //console.log("YES");
            return true;
         // collision detected!
     }
     else{
        // //console.log("FALSE");
        return false;
     }
    
}

function MakeToolsVisible()
{
 
    switch (timer){
        case 55:
            toolArray[0].visible = true;
            break;
        case 49:
            toolArray[1].visible = true;
            break;
        case 44:
            toolArray[2].visible = true;
            break;
        case 38:
            toolArray[3].visible = true;
            break;
        case 33:
            toolArray[4].visible = true;
            break;
        case 27:
            toolArray[5].visible = true;
            break;
        case 22:
            toolArray[6].visible = true;
            break;
        case 16:
            toolArray[7].visible = true;
            break;
        case 11:
            toolArray[8].visible = true;
            break;
        case 5:
            toolArray[9].visible = true;
            break;
    }
}

function GameOver(){
    buttonNextLevel.hide();
    buttonStopGame.hide();
    hideSprites();
    fill("black");
    textSize(50);
    text("GAME OVER", displayWidth/2 - 140, displayHeight/2 - 50);
    highestScore();
    left.visible = false;
    right.visible = false;
    up.visible = false;
    down.visible = false;
}


function highestScore(){
    // var ref = database.ref("players");
    
    // ref.orderByChild("Score").limitToLast(1).once("value", (data)=>{
    //     ////console.log(data.toJSON());
    //     data.forEach(function(snapshot){
    //       var newPost = snapshot.val();
    //       //console.log("Highest score is: " + newPost.Score);
          
    //     })
    //     })

    var ref2 = database.ref("players/" + playerName);
    
    ref2.orderByChild("Score").limitToLast(1).once("value", (data2)=>{
            ////console.log(data.toJSON());
            data2.forEach(function(snapshot2){
              var playerScore = snapshot2.val();
              //console.log("For " + playerName + " at level " + currentLevel + ", Highest score is: " + playerScore.Score);
              
            })
            })
}

function hideSprites(){
    player.visible = false;
    
    for(var i = 0; i < enemyArray.length; i++){
        enemyArray[i].visible = false;
    }

    for(var i = 0; i < toolArray.length; i++){
        toolArray[i].visible = false;
    }
}

function TouchMovement(){
    ////console.log(touches.length);
    left = createButton('L');
    left.position(displayWidth/2 - 600, displayHeight - 200);
    left.size (70, 70);

    up = createButton('U');
    up.position(displayWidth/2 - 500, displayHeight - 300);
    up.size (70, 70);

    down = createButton('D');
    down.position(displayWidth/2 - 500, displayHeight - 100);
    down.size (70, 70);

    right = createButton('R');
    right.position(displayWidth/2 - 400, displayHeight - 200);
    right.size (70, 70);
}

function touchStarted() {
    // console.log ("mouseX:" + mouseX)
    // console.log ("mouseY:" + mouseY)
    // console.log ("left.position.x:" + left.x)
    // console.log ("left.width/2:" + left.width/2)
    // console.log ("left.position.y:" + left.y)
    console.log ("left.height/2:" + left.height/2)
    //console.log(left);

    

    if (
        ((mouseX < left.x + left.width/2) && (mouseX > left.x - left.width/2)) &&
        ((mouseY < left.y + left.height/2) && (mouseY > left.y - left.height/2)))
    {
        // console.log ("Yes");
        touchLEFT();
    }

    // if (
    //     ((mouseX < up.x + up.width/2) && (mouseX > up.x - up.width/2)) &&
    //     ((mouseY < up.y + up.height/2) && (mouseY > up.y - up.height/2)))
    // {
    //     // console.log ("Yes");
    //     touchUP();
    // }

    // if (
    //     ((mouseX < down.x + down.width/2) && (mouseX > down.x - down.width/2)) &&
    //     ((mouseY < down.y + down.height/2) && (mouseY > down.y - down.height/2)))
    // {
    //     // console.log ("Yes");
    //     touchDOWN();
    // }

    // if (
    //     ((mouseX < right.x + right.width/2) && (mouseX > right.x - right.width/2)) &&
    //     ((mouseY < right.y + right.height/2) && (mouseY > right.y - right.height/2)))
    // {
    //     // console.log ("Yes");
    //     touchRIGHT();
    // }

    if (
        ((mouseX < left.x + left.width) && (mouseX > left.x)) &&
        ((mouseY < left.y + left.height) && (mouseY > left.y)))
    {
        // console.log ("Yes");
        touchLEFT();
    }

    if (
        ((mouseX < up.x + up.width) && (mouseX > up.x)) &&
        ((mouseY < up.y + up.height) && (mouseY > up.y)))
    {
        // console.log ("Yes");
        touchUP();
    }

    if (
        ((mouseX < down.x + down.width) && (mouseX > down.x )) &&
        ((mouseY < down.y + down.height) && (mouseY > down.y)))
    {
        // console.log ("Yes");
        touchDOWN();
    }

    if (
        ((mouseX < right.x + right.width) && (mouseX > right.x)) &&
        ((mouseY < right.y + right.height) && (mouseY > right.y)))
    {
        // console.log ("Yes");
        touchRIGHT();
    }

    // prevent default
    return false;
  }

function touchLEFT(){
    player.position.x = player.position.x - 50;
    //console.log("LEFT MOVEMENT");
}

function touchRIGHT(){
    player.position.x = player.position.x + 50;
    ////console.log("LEFT MOVEMENT");
}

function touchUP(){
    player.position.y = player.position.y - 50;
    ////console.log("UP MOVEMENT");
}

function touchDOWN(){
    player.position.y = player.position.y + 50;
    ////console.log("DOWN MOVEMENT");
}
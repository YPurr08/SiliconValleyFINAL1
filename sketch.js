var TEXT_TRIBUTE_LINE1 = "First responders are someone designated or trained to respond to an emergency.";
var TEXT_TRIBUTE_LINE2 = "During COVID, First Responders are risking their lives by helping people in need.";
var TEXT_TRIBUTE_LINE3 = "This is a tribute to all First Responders.";

var TEXT_ABOUT_GAME1 = "In this game, first responder is trying to collect tools while dodging the virus.";
var TEXT_ABOUT_GAME2 = "These tools are necessary to save lives during a pandemic.";

var CONGRATS_TEXT2 = "Click 'Continue' to go to the next level! Click 'End' to stop playing.";

var form;
var player, tools, obstacle, zone, enemyZone;
let currentLevel = 1;
var enemySpeedX, enemySpeedY;
var xspeedArray = [15, 15, 15];
var yspeedArray = [5, 5, 5];
var num = 60;
var sprite1, sprite2, sprite3, sprite4, sprite5, sprite6, sprite7, sprite8, sprite9, sprite10;
var toolArray = [sprite1, sprite2, sprite3, sprite4, sprite5, sprite6], sprite7, sprite8, sprite9, sprite10;
var score = 0;

// various stages of the game
const GAME_STATES = {
    GAME_OVER: 0,//used to show UI when game is over
    GAME_PLAY: 1,//used to show UI when game is being played
    GAME_START_NOTE: 2,//this is the screen that is displayed for few seconds with an update on game
    GAME_START_INPUT: 3, //first input screen
    GAME_PAUSE: 4 //game pause
};
// variable that holds the current state of the game
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
var highestScoreArray = [];

let left, right, up, down;
var direction = 0;
var textSizeCustom = 1.1 * window.innerWidth/57;
var buttonSizeWidth = 80;
var buttonSizeHeight = 50;
let ICON_SCALE_FACTOR = 0.2;
let ENEMY_SIZE_FACTOR = 0.02;
let ENEMY_SCALE_FACTOR = 0.3;
let SUBTRACT_CANVAS_SCALE_FACTOR = 0.96;
let POSITION_ENEMY_1 = 0.33;
let POSITION_ENEMY_2 = 0.25;
let POSITION_ENEMY_3 = 0.66;
let TOOL_INITIAL_POS_FACTOR = 0.05;

var explanationArray = [
    "Masks stop infection caught from breath; surgical mask covers mouth and nose area.",
    "Gloves stop catching infection from hand contact with an object that might contain virus.",
    "Hand Sanitizer kills germs and viruses (including Covid 19).",
    "Ventilator pumps oxygen into body if patient has trouble breathing.",
    "Thermometer measures body-temprature of a patient (a symptom of Covid-19 is fever).",
    "Face-shield protects a person's eyes or face from infection.",
    "Goggles stops infection from entering eyes.",
    "Vaccine - though a WIP - will help body understand and prepare for virus; body will create antibodies, etc.",
    "Medical Gown will stop infection from getting onto clothes.",
    "Waste bag disposes of any waste or objects that might be dangerous." 
];


function preload(){
    covid1Image = loadImage("Covid1.png");
    covid2Image = loadImage("Covid2.png");
    covid3Image = loadImage("Covid3.png");
    doctorImage = loadImage("Option1.png");
    maskTool1 = loadImage("./NewToolIcon/mask_TOOL1.png");
    gloveTool2 = loadImage("./NewToolIcon/gloves_TOOL2.png");
    sanitizerTool3 = loadImage("./NewToolIcon/sanitizer_TOOL3.png");
    ventilator_TOOL4 = loadImage("./NewToolIcon/ventilator_TOOL4.png");
    thermometer_TOOL5 = loadImage("./NewToolIcon/thermometer_TOOL5.png");
    faceshiled_TOOL6 = loadImage("./NewToolIcon/faceshield_TOOL6.png");
    goggles_TOOL7 = loadImage("./NewToolIcon/goggles_TOOL7.png");
    vaccine_TOOL8 = loadImage("./NewToolIcon/vaccine_TOOL8.png");
    gown_TOOL9 = loadImage("./NewToolIcon/gown_TOOL9.png");
    waste_TOOL10 = loadImage("./NewToolIcon/waste_TOOL10.png");

}
  
function setup(){
    canvas = createCanvas(window.innerWidth * SUBTRACT_CANVAS_SCALE_FACTOR, window.innerHeight * SUBTRACT_CANVAS_SCALE_FACTOR);

    player = createSprite(window.innerWidth/2, window.innerHeight/2, 50,50);
    player.shapeColor = 'blue'

    enemyArray[0] = createSprite(window.innerWidth * POSITION_ENEMY_1, window.innerHeight/2, 50,50);
    enemyArray[0].shapeColor = 'aqua';
    enemyArray[0].visible = false;


    enemyArray[1] = createSprite(window.innerWidth * POSITION_ENEMY_2, window.innerHeight/2, 50,50);
    enemyArray[1].shapeColor = 'aqua';
    enemyArray[1].visible = false;

    enemyArray[2] = createSprite(window.innerWidth * POSITION_ENEMY_3, window.innerHeight/2, 50,50);
    enemyArray[2].shapeColor = 'aqua';
    enemyArray[2].visible = false;

    for(var i = 0; i < num; i++){
        toolArray[i] = createSprite(random(window.innerWidth * 0.2, window.innerWidth * 0.8), random(0.2 * window.innerHeight, window.innerHeight* 0.8), 30, 30);
        toolArray[i].visible = false;
    }
    
    
    database = firebase.database();
    

    playersNodeRef = database.ref('players');

    enemyArray[0].addImage(covid1Image);
    enemyArray[0].width = window.innerWidth * ENEMY_SIZE_FACTOR;
    enemyArray[0].height = window.innerHeight * ENEMY_SIZE_FACTOR;
    enemyArray[0].scale = ENEMY_SCALE_FACTOR;

    enemyArray[1].addImage(covid2Image);
    enemyArray[1].width = window.innerWidth * ENEMY_SIZE_FACTOR;
    enemyArray[1].height = window.innerHeight * ENEMY_SIZE_FACTOR;
    enemyArray[1].scale = ENEMY_SCALE_FACTOR;

    enemyArray[2].addImage(covid3Image);
    enemyArray[2].width = window.innerWidth * ENEMY_SIZE_FACTOR;
    enemyArray[2].height = window.innerHeight * ENEMY_SIZE_FACTOR;
    enemyArray[2].scale = ENEMY_SCALE_FACTOR;


    player.addImage(doctorImage);
    player.width = 50;
    player.height = 50;
    player.scale = 0.2;

    toolArray[0].addImage(maskTool1);
    toolArray[0].scale = ICON_SCALE_FACTOR;
    
    toolArray[1].addImage(gloveTool2);
    toolArray[1].scale = ICON_SCALE_FACTOR;

    toolArray[2].addImage(sanitizerTool3);
    toolArray[2].scale = ICON_SCALE_FACTOR;

    toolArray[3].addImage(ventilator_TOOL4);
    toolArray[3].scale = ICON_SCALE_FACTOR;

    toolArray[4].addImage(thermometer_TOOL5);
    toolArray[4].scale = ICON_SCALE_FACTOR;

    toolArray[5].addImage(faceshiled_TOOL6);
    toolArray[5].scale = ICON_SCALE_FACTOR;

    toolArray[6].addImage(goggles_TOOL7);
    toolArray[6].scale = ICON_SCALE_FACTOR;

    toolArray[7].addImage(vaccine_TOOL8);
    toolArray[7].scale = ICON_SCALE_FACTOR;

    toolArray[8].addImage(gown_TOOL9);
    toolArray[8].scale = ICON_SCALE_FACTOR;

    toolArray[9].addImage(waste_TOOL10);
    toolArray[9].scale = ICON_SCALE_FACTOR;

    buttonNextLevel = createButton("Next Level");
    buttonNextLevel.size(buttonSizeWidth, buttonSizeHeight);
    
    buttonStopGame = createButton("End Game");
    buttonStopGame.size(buttonSizeWidth, buttonSizeHeight);

    buttonNextLevel.position(window.innerWidth/2 - buttonNextLevel.width/2, window.innerHeight/2 + 30);
    buttonStopGame.position(window.innerWidth/2 - buttonNextLevel.width/2 + window.innerWidth/10 , window.innerHeight/2 + 30);

    buttonNextLevel.hide();
    buttonStopGame.hide();

    CreateTouchButton();
    HideTouchButtons();

    form = new Form();

    form.start();
    //redraw();
    //input.setSelectionRange(0,3); // Highlights "Cup"

}
 
/*
Function Hides Left, Right, Up, Down Buttons
*/
function HideTouchButtons()
{
    left.hide();    
    right.hide();    
    up.hide();    
    down.hide();

}

/*
Function Shows Left, Right, Up, Down Buttons
*/

function ShowTouchButtons()
{
    left.show();    
    right.show();    
    up.show();    
    down.show();

}
  
function draw(){
    background(225);

    GameStateDraw();


    drawSprites();
}

/*
Function Displays Tribute Text
*/
function GameStateDraw(){
    if(gameState === GAME_STATES.GAME_START_NOTE){
        enemyArray[0].visible = false;
        player.visible = false;
        textSize(textSizeCustom);
        textAlign(CENTER, CENTER);
        fill("blue");
        text(TEXT_TRIBUTE_LINE1, window.innerWidth/2, window.innerHeight* .3);
        text(TEXT_TRIBUTE_LINE2, window.innerWidth/2, window.innerHeight * .4);
        text(TEXT_TRIBUTE_LINE3, window.innerWidth/2, window.innerHeight *.5);

        text(TEXT_ABOUT_GAME1, window.innerWidth/2, window.innerHeight * .7);
        text(TEXT_ABOUT_GAME2, window.innerWidth/2, window.innerHeight * .8);


        if(frameCount % 360 === 0){
            gameState = 1;
        }
    }
    else if(gameState === GAME_STATES.GAME_PLAY){
        GameStatePlay();
      
    }
    else if(gameState === GAME_STATES.GAME_OVER){
        GameOver();
        for(var l = 0; l < num; l ++){
            toolArray[l].remove();
        }
    }
    else if (gameState == GAME_STATES.GAME_PAUSE){
        buttonNextLevel.show();
        buttonStopGame.show();
        textAlign(CENTER, CENTER);
        fill("black");
        textSize(textSizeCustom);
        var CONGRATS_TEXT = concat("Congratulations on Completing Level ", currentLevel - 1, "!");
        text(CONGRATS_TEXT, window.innerWidth/2, window.innerHeight/3);
        text(CONGRATS_TEXT2, window.innerWidth/2, window.innerHeight/3 + window.innerHeight/20);
        hideSprites();

        buttonNextLevel.mousePressed(()=>{
            gameState = GAME_STATES.GAME_PLAY;
        });

        buttonStopGame.mousePressed(()=>{
            gameState = GAME_STATES.GAME_OVER;
        });
        timer = TIME_FOR_PLAY;
    }
    else if (gameState == GAME_STATES.GAME_START_INPUT){
        //console.log("i entered draw: Game state input");

        form.focus();

    }

}

/*
Function operates Main Game
*/
function GameStatePlay(){
    
    player.visible = true;
    buttonNextLevel.hide();
    buttonStopGame.hide();

    ShowTouchButtons();


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
            highestScoreArray [currentLevel - 1] = score;
            score = 0;
            currentLevel ++;

            gameState = GAME_STATES.GAME_PAUSE
        } 
        else if (currentLevel == 3)
        {
            scoreArray[currentLevel - 1] = score;
            highestScoreArray [currentLevel - 1] = score;
            gameState = GAME_STATES.GAME_OVER;
        }
        else
        {
            gameState = GAME_STATES.GAME_OVER;
            
        }
    }

    for(var i = 0; i < 6; i ++){
        if(
            (IsTouching(enemyArray[0], player, 1) && enemyArray[0].visible) || 
            (IsTouching(enemyArray[1], player, 1) && enemyArray[1].visible)||
            (IsTouching(enemyArray[2], player, 1) && enemyArray[2].visible)
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
            if (enemyArray[i].position.x > window.innerWidth * SUBTRACT_CANVAS_SCALE_FACTOR - enemyArray[i].width/2 || enemyArray[i].position.x < enemyArray[i].width/2) {
                xspeedArray[i] = -xspeedArray[i];
            }
            if (enemyArray[i].position.y > window.innerHeight * SUBTRACT_CANVAS_SCALE_FACTOR - enemyArray[i].height/2 || enemyArray[i].position.y < enemyArray[i].height/2) {
                yspeedArray[i] = -yspeedArray[i];
            }
        }
    }

    


    for(var j = 0; j < num; j++){
        if(IsTouching(player, toolArray[j], ICON_SCALE_FACTOR) && toolArray[j].visible === true){
            //player.isTouching(toolArray[j]) && toolArray[j].visible === true){
            toolArray[j].visible = false;
            // toolArray[j].position.x = random(TOOL_INITIAL_POS_FACTOR* window.innerWidth * SUBTRACT_CANVAS_SCALE_FACTOR, 
            //                                 window.innerWidth * SUBTRACT_CANVAS_SCALE_FACTOR - 50);
            // toolArray[j].position.y = random(TOOL_INITIAL_POS_FACTOR* window.innerWidth * SUBTRACT_CANVAS_SCALE_FACTOR, 
            //                             window.innerWidth * SUBTRACT_CANVAS_SCALE_FACTOR - 50);
            setTimeout(() => {
                score = score + 1;
            }, 100);
            
        }
    }

}


/*
Uses given sprite's position and dimensions to deduct whether they are touching 
*/
function IsTouching(sprite1, sprite2, scaleFactor)
{
    
    var sprite1ScaledWidth = sprite1.width*scaleFactor;
    var sprite2ScaledWidth = sprite2.width*scaleFactor;
    var sprite1ScaledHeight = sprite1.height*scaleFactor;
    var sprite2ScaledHeight = sprite1.height*scaleFactor;

    if (sprite1.position.x < sprite2.position.x + sprite2ScaledWidth &&
        sprite1.position.x + sprite1ScaledWidth > sprite2.position.x &&
        sprite1.position.y < sprite2.position.y + sprite2ScaledHeight &&
        sprite1.position.y + sprite2ScaledHeight > sprite2.position.y) {

    // if (sprite1.position.x < sprite2.position.x + sprite2.width &&
    //     sprite1.position.x + sprite1.width > sprite2.position.x &&
    //     sprite1.position.y < sprite2.position.y + sprite2.height &&
    //     sprite1.position.y + sprite1.height > sprite2.position.y) {
            // //console.log("YES");
            // console.log("sprite1.position.x:" + sprite1.position.x);
            // console.log("sprite1.position.y:" + sprite1.position.y);
            // console.log("sprite2.position.x:" + sprite2.position.x);
            // console.log("sprite2.position.y:" + sprite2.position.y);
            
            // console.log("sprite1.width:" + sprite1ScaledWidth);
            // console.log("sprite1.height:" + sprite1ScaledHeight);
            // console.log("sprite2.width:" + sprite2ScaledWidth);
            // console.log("sprite2.height:" + sprite2ScaledHeight);
            // console.log(sprite1);
            // console.log(sprite2);

            return true;
     }
     else{
        // //console.log("FALSE");
        return false;
     }
}

/*
Function at shows each tool and description of tool at correct time 
*/
function MakeToolsVisible()
{
    strokeWeight(2);
    fill('blue');
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

    if (timer <= 55 && timer > 49)
    {
        text(explanationArray[0], window.innerWidth/3, window.innerHeight/10);
    }
    else if (timer <= 49 && timer > 44)
    {
        text(explanationArray[1], window.innerWidth/3, window.innerHeight/10);
    }
    else if (timer <= 44 && timer > 38)
    {
        text(explanationArray[2], window.innerWidth/3, window.innerHeight/10);
    }
    else if (timer <= 38 && timer > 33)
    {
        text(explanationArray[3], window.innerWidth/3, window.innerHeight/10);
    }
    else if (timer <= 33 && timer > 27)
    {
        text(explanationArray[4], window.innerWidth/3, window.innerHeight/10);
    }
    else if (timer <= 27 && timer > 22)
    {
        text(explanationArray[5], window.innerWidth/3, window.innerHeight/10);
    }
    else if (timer <= 22 && timer > 16)
    {
        text(explanationArray[6], window.innerWidth/3, window.innerHeight/10);
    }
    else if (timer <= 16 && timer > 11)
    {
        text(explanationArray[7], window.innerWidth/3, window.innerHeight/10);
    }
    else if (timer <= 11 && timer > 5)
    {
        text(explanationArray[8], window.innerWidth/3, window.innerHeight/10);
    }
    else if (timer <= 5 && timer > 0)
    {
        text(explanationArray[9], window.innerWidth/3, window.innerHeight/10);
    }
}

/*
Function operates Game Over
*/
function GameOver(){
    buttonNextLevel.hide();
    buttonStopGame.hide();
    hideSprites();
    fill("black");
    textSize(50);
    text("GAME OVER", window.innerWidth/2*SUBTRACT_CANVAS_SCALE_FACTOR, window.innerHeight/4*SUBTRACT_CANVAS_SCALE_FACTOR);
    DisplayScore();
    HideTouchButtons();
}

/*
Function shows Personal and all-player leaderboard
*/
function DisplayScore(){
    // var ref = database.ref("players");
    
    // ref.orderByChild("Score").limitToLast(1).once("value", (data)=>{
    //     ////console.log(data.toJSON());
    //     data.forEach(function(snapshot){
    //       var newPost = snapshot.val();
    //       //console.log("Highest score is: " + newPost.Score);
          
    //     })
    //     })

   

    var ref2 = database.ref("players/" + playerName);
    
    ref2.orderByChild("Score").once("value", (data2)=>{
            console.log(data2.toJSON());
            data2.forEach(function(snapshot){
              var playerScore = snapshot.val();
            
              if (playerScore.Score > highestScoreArray[playerScore.Level - 1])
              {
                highestScoreArray[playerScore.Level - 1] = playerScore.Score; 
              }

              

            })
            })

        for (var i = 0; i < scoreArray.length; i++)
        {
            textSize(40);
            var scoreString = "For player '" + playerName + "', at level " + (i+1) + ", score is: " + scoreArray[i]; 
                    text(scoreString, 
                    window.innerWidth/3*SUBTRACT_CANVAS_SCALE_FACTOR, 
                    window.innerHeight/3*SUBTRACT_CANVAS_SCALE_FACTOR + 50*(i+1)
                    );

            console.log(scoreString);
            var scoreString = "For player '" + playerName + "', at level " + (i+1) + ", highest score is: " + highestScoreArray[i]; 
                    text(scoreString, 
                    window.innerWidth/3*SUBTRACT_CANVAS_SCALE_FACTOR, 
                    window.innerHeight/3*SUBTRACT_CANVAS_SCALE_FACTOR + 50*(i+4)
                    );
        }
}

/*
Function hides all sprites
*/
function hideSprites(){
    player.visible = false;
    
    for(var i = 0; i < enemyArray.length; i++){
        enemyArray[i].visible = false;
    }

    for(var i = 0; i < toolArray.length; i++){
        toolArray[i].visible = false;
    }
}



/*
Function creates touch-sprite
*/
function CreateTouchButton(){
    ////console.log(touches.length);
    left = createButton('L');
    left.position(window.innerWidth - window.innerWidth/6, window.innerHeight/2 + window.innerHeight/4);
    left.size (60, 60);

    up = createButton('U');
    up.position(window.innerWidth - window.innerWidth/7.5, window.innerHeight/2 + window.innerHeight/5);
    up.size (60, 60);

    down = createButton('D');
    down.position(window.innerWidth - window.innerWidth/7.5, window.innerHeight/2 + window.innerHeight/3.25);
    down.size (60, 60);

    right = createButton('R');
    right.position(window.innerWidth - window.innerWidth/10, window.innerHeight/2 + window.innerHeight/4);
    right.size (60, 60);
}

/*
Function deducts whether touch-sprite was pressed
*/
function touchStarted() {
    if (gameState == GAME_STATES.GAME_PLAY)
    {
        if (
            ((mouseX < left.x + left.width) && (mouseX > left.x)) &&
            ((mouseY < left.y + left.height) && (mouseY > left.y)))
        {
            console.log(gameState);
            touchLEFT();
        }

        if (
            ((mouseX < up.x + up.width) && (mouseX > up.x)) &&
            ((mouseY < up.y + up.height) && (mouseY > up.y)))
        {
            touchUP();
        }

        if (
            ((mouseX < down.x + down.width) && (mouseX > down.x )) &&
            ((mouseY < down.y + down.height) && (mouseY > down.y)))
        {
            touchDOWN();
        }

        if (
            ((mouseX < right.x + right.width) && (mouseX > right.x)) &&
            ((mouseY < right.y + right.height) && (mouseY > right.y)))
        {
            touchRIGHT();
        }
    }
    else if(gameState == GAME_STATES.GAME_START_INPUT)
    {
        if (
            ((mouseX < form.button.x + form.button.width) && (mouseX > form.button.x)) &&
            ((mouseY < form.button.y + form.button.height) && (mouseY > form.button.y)))
        {
            console.log(gameState);
            gameState = GAME_START_NOTE;
            form.input.hide();
            form.button.hide();
            playerName = form.input.value();        
        }

    }
    else if(gameState == GAME_STATES.GAME_PAUSE)
    {
        if (
            ((mouseX < buttonNextLevel.x + buttonNextLevel.width) && (mouseX > buttonNextLevel.x)) &&
            ((mouseY < buttonNextLevel.y + buttonNextLevel.height) && (mouseY > buttonNextLevel.y)))
        {
            gameState = GAME_STATES.GAME_PLAY;
        }

        if (
            ((mouseX < buttonStopGame.x + buttonStopGame.width) && (mouseX > buttonStopGame.x)) &&
            ((mouseY < buttonStopGame.y + buttonStopGame.height) && (mouseY > buttonStopGame.y)))
        {
            gameState = GAME_STATES.GAME_OVER;
        }
    }
    return false;
  }

/*
Function makes player move in respective direction if left button was pressed
*/
function touchLEFT(){
    player.position.x = player.position.x - 50;
    //console.log("LEFT MOVEMENT");
}


/*
Function makes player move in respective direction if right button was pressed
*/
function touchRIGHT(){
    player.position.x = player.position.x + 50;
    ////console.log("LEFT MOVEMENT");
}


/*
Function makes player move in respective direction if up button was pressed
*/
function touchUP(){
    player.position.y = player.position.y - 50;
    ////console.log("UP MOVEMENT");
}


/*
Function makes player move in respective direction if down button was pressed
*/
function touchDOWN(){
    player.position.y = player.position.y + 50;
    ////console.log("DOWN MOVEMENT");
}
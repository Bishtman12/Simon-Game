//taking random values to select the color for the next level
var Username = prompt("What is your Name?");
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamepattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// getting the Responses from User

$(document).keypress(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswers(userClickedPattern.length - 1);
});



//Functions listed here

function checkAnswers(currentLevel) {
    if (userClickedPattern[currentLevel] === gamepattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length == gamepattern.length) {
            setTimeout(function () { nextSequence(); }, 1000);
        }}

        else {
            console.log("wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(() => { $("body").removeClass("game-over"); }, 200);
            $("#level-title").html("Game Over, Press any Key to play Again <br><br>" +Username + "'s Score was : "+level);
            startOver();
        }
    }

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var rand = Math.random() * 4;
    var randomChosenColor = buttonColors[Math.floor(rand)];
    gamepattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChosenColor);
}

function startOver(){
    level = 0;
    gamepattern = [];
    started = false;

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}

function animatePress(currenColor) {
    $("#" + currenColor).fadeOut(100).fadeIn(100).fadeIn(100);
    $("#" + currenColor).addClass("pressed");
    setTimeout(() => { $("#" + currenColor).removeClass("pressed"); }, 100);
    //set timeout is a async method though it will run in the background the followin functions will be excuted 
    // even if it has not finished.(https://www.sitepoint.com/delay-sleep-pause-wait/#:~:text=The%20standard%20way%20of%20creating,()%20%3D%3E%20%7B%20console.)
}
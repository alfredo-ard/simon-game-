var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {
    level++;
    var num = Math.floor(Math.random() * 4);
    var randomNumber = num;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
        .fadeOut(200)
        .fadeIn(200);

    playSound(randomChosenColour);
}

function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function checkAnswer(currentLevel) {
    if (
        userClickedPattern[userClickedPattern.length - 1] ===
        gamePattern[userClickedPattern.length - 1]
    ) {
        console.log("true");
    } else {
        playSound("wrong");
        startOver();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over, Press A to Restart");
    }

    if (userClickedPattern.length == currentLevel) {
        setTimeout(function () {
            nextSequence();
            userClickedPattern = [];
            $("h1").html("Level " + level);
        }, 1000);
    }
}

$("body").on("keydown", function (evt) {
    if (level === 0 && evt.key === "a") {
        nextSequence();
        $("h1").html("Level " + level);
    }
});

$(".btn").on("click", function (evt) {
    var userChosenColour = evt.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(level);
});

let gameSeq = [];
let userSeq = [];

let buttons = ["yellow","red","green","purple"];

let level = 0;
let highScore = 0;
let started = false;

let h2 = document.querySelector("h2");
// document.addEventListener("keypress",function(){
//     if(started==false){
//         console.log("Game Started");
//         started = true;

//         levelUp();
//     }
//     else{
//         reset();
//     }    
// });


function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}


function levelUp(){
    level++;
    h2.innerText = `Level ${level}`;
    userSeq = [];
    let randIdx = Math.floor(Math.random()*3);
    let randColor = buttons[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);

    if(highScore<level){
        highScore = level;
        document.getElementById("score").innerText = highScore;
    }
}

// function highScore(){
//     if(highScore < level){
//         highScore = level;
//     }

// }

function checkAns(idx){
    // console.log("Current Level: ",level);
    
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}    
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = "Observe the blinking pattern and repeat from the starting level.\nPress any key to start the game.";
}

// Check if the device is a mobile device
function isMobileDevice() {
    return (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    );
  }
  
  // Start the game on click for mobile devices
  if (isMobileDevice()) {
    document.addEventListener("click", function () {
      if (started == false) {
        console.log("Game Started");
        started = true;
        levelUp();
      } else {
        reset();
      }
    });
  } else {
    // For non-mobile devices, use "keypress" event
    document.addEventListener("keypress", function () {
      if (started == false) {
        console.log("Game Started");
        started = true;
        levelUp();
      } else {
        reset();
      }
    });
  }

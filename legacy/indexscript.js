// ================= START GAME BUTTON =================

function startGame(){

alert("Game will start!");

// later you can redirect to game page
// window.location.href = "game.html";

}


// ================= LEVEL SELECT =================

function selectLevel(){

alert("Open level selection!");

// later connect with your existing level system

}



// ================= OPTIONAL PARTICLE SPARKLES =================

const sparkleCount = 30;

for(let i=0;i<sparkleCount;i++){

const star = document.createElement("div");

star.className = "sparkle";

star.style.left = Math.random()*100+"vw";
star.style.top = Math.random()*100+"vh";

document.body.appendChild(star);

}


// ================= KEYBOARD HAND INTERACTION =================

const keyboard  = document.querySelector(".keyboard-area");
const leftHand  = document.querySelector(".hand-left");
const rightHand = document.querySelector(".hand-right");

if (keyboard && leftHand && rightHand) {
  keyboard.addEventListener("mouseenter", () => {
    leftHand.style.transform  = "translateY(-16px)";
    rightHand.style.transform = "translateY(-16px)";
  });
  keyboard.addEventListener("mouseleave", () => {
    leftHand.style.transform  = "";
    rightHand.style.transform = "";
  });
}


// ================= MASCOT INTERACTION =================

const leftMascot  = document.getElementById("mascot-left");
const rightMascot = document.getElementById("mascot-right");

if (leftMascot && rightMascot) {

  // 🟡 WAVE ON LOAD
  window.addEventListener("load", () => {
    leftMascot.classList.add("wave");
    rightMascot.classList.add("wave");

    setTimeout(() => {
      leftMascot.classList.remove("wave");
      rightMascot.classList.remove("wave");
    }, 2000);
  });

  // 🟢 CLICK → BOUNCE
  [leftMascot, rightMascot].forEach(mascot => {
    mascot.addEventListener("click", () => {
      mascot.classList.add("bounce");

      setTimeout(() => {
        mascot.classList.remove("bounce");
      }, 400);
    });
  });


  // 🔵 HOVER ON START BUTTON → LOOK AT BUTTON
  const button = document.querySelector(".start-btn");

  if(button){
    button.addEventListener("mouseenter", () => {
      leftMascot.style.transform = "rotate(-2deg)";
      rightMascot.style.transform = "rotate(2deg)";
    });

    button.addEventListener("mouseleave", () => {
      leftMascot.style.transform = "";
      rightMascot.style.transform = "";
    });
  }


  // 🟣 IDLE PERSONALITY (SUBTLE RANDOM MOVEMENT)
  setInterval(() => {
    const random = Math.random();

    if(random < 0.5){
      leftMascot.style.transform = "rotate(-2deg)";
      rightMascot.style.transform = "rotate(2deg)";
    } else {
      leftMascot.style.transform = "";
      rightMascot.style.transform = "";
    }

  }, 4000);

}
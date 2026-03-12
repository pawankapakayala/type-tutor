const keySound = new Audio("../../assets/audio/keypress.mp3");
const errorSound = new Audio("../../assets/audio/wrong.mp3");
const applaudSound = new Audio("../../assets/audio/applaud.mp3");

document.addEventListener("DOMContentLoaded", function () {

  const keysToTypeElement = document.getElementById("keysToTypeSpan");
  const messageElement = document.getElementById("message");

  const blury = document.querySelector(".blur");
  const mascot = document.querySelector(".mascot");
  const congo = document.querySelector(".congo");
  const restart = document.querySelector(".restart");
  const next = document.querySelector(".next");

  const rnum = document.querySelector(".rh");
  const lnum = document.querySelector(".lh");

  const volButton = document.querySelector(".volbt");
  const volIcon = document.querySelector(".vol");

  const stages = [
    "ffff aaaa dddd ssss",
    "fdsa fdsa fdsa fdsa",
    "asdf asdf asdf asdf",
    "jjjj kkkk llll ;;;;",
    "jj kk ll ;;",
    "jkl; jkl; jkl; jkl; jkl;",
    ";lkj ;lkj ;lkj ;lkj ;lkj",
    "fad fads lad lads lass alas salad salads dad dads lad lads salads alas",
    "ad add ads adds as ask asks la lad lads lass da dad dada dada sa sad salad",
    "all fall falls alf alfa alfas fad fads salsa ska skald skalds flak flask flasks"
  ];

  let currentStage = 0;
  let userInput = "";
  let soundEnabled = false;

  let allTypingResults = JSON.parse(localStorage.getItem("allTypingResults")) || {};
  const currentLevel = "level1";

  if (!allTypingResults[currentLevel]) {
    allTypingResults[currentLevel] = [];
  }

  volButton.addEventListener("keydown", function (event) {
    if (event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
    }
  });

  function updateDisplay() {

    let displayText = "";
    const correctText = stages[currentStage];

    for (let i = 0; i < correctText.length; i++) {

      if (i < userInput.length) {

        if (userInput[i] === correctText[i]) {
          displayText += `<span style="color:green">${correctText[i]}</span>`;
        } 
        else {
          displayText += `<span style="color:red">${correctText[i]}</span>`;
        }

      } 
      else {
        displayText += `<span style="color:black">${correctText[i]}</span>`;
      }

    }

    keysToTypeElement.innerHTML = displayText;
    messageElement.textContent = `Stage ${currentStage + 1}: Type the letter.`;

    if (userInput.length < stages[currentStage].length) {
      updateHands(stages[currentStage][userInput.length]);
    } 
    else {
      lnum.src = "../../assets/images/r.png";
      rnum.src = "../../assets/images/r.png";
    }

  }

  function showCongrats() {

    blury.classList.remove("hidden");
    mascot.classList.remove("hidden");
    congo.classList.remove("hidden");
    restart.classList.remove("hidden");
    next.classList.remove("hidden");

    applaudSound.play();

  }

  function hideCongrats() {

    blury.classList.add("hidden");
    mascot.classList.add("hidden");
    congo.classList.add("hidden");
    restart.classList.add("hidden");
    next.classList.add("hidden");

  }

  function speak(text) {

    if (soundEnabled) {

      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        text === " " ? "space" : text
      );

      speechSynthesis.speak(utterance);

    }

  }

  function pressKey(char) {

    const key = document.querySelector(`[data-char*="${char.toUpperCase()}"]`);
    if (!key && char !== " ") return;

    key.setAttribute("data-pressed", "on");
    key.style.backgroundColor = "#00FF00";
    key.style.transform = "scale(1.1)";

    setTimeout(() => {

      key.removeAttribute("data-pressed");
      key.style.backgroundColor = "";
      key.style.transform = "scale(1)";

    }, 200);

  }

  function updateHands(key) {

    key = key.toUpperCase();

    lnum.src = "../../assets/images/r.png";
    rnum.src = "../../assets/images/r.png";

    if (["V","F","R","T","G","B"].includes(key)) {
      lnum.src = "../../assets/images/r2.png";
    }
    else if (["E","D","C"].includes(key)) {
      lnum.src = "../../assets/images/r3.png";
    }
    else if (["W","S","X"].includes(key)) {
      lnum.src = "../../assets/images/r4.png";
    }
    else if (["Q","A","Z"].includes(key)) {
      lnum.src = "../../assets/images/r5.png";
    }

    if (["N","H","Y","U","J","M"].includes(key)) {
      rnum.src = "../../assets/images/r2.png";
    }
    else if (["I","K","<",","].includes(key)) {
      rnum.src = "../../assets/images/r3.png";
    }
    else if (["O","L",">","."].includes(key)) {
      rnum.src = "../../assets/images/r4.png";
    }
    else if (["P",";","/","?"].includes(key)) {
      rnum.src = "../../assets/images/r5.png";
    }

    if (key === " ") {
      rnum.src = "../../assets/images/r1.png";
      lnum.src = "../../assets/images/r1.png";
    }

  }

  function saveResultsToFile() {

    localStorage.setItem("allTypingResults", JSON.stringify(allTypingResults));

    const data = {
      results: allTypingResults,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "all_typing_results.json";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);

  }

  document.addEventListener("keydown", function (event) {

    let typedChar = event.key;

    if (typedChar.length === 1 || typedChar === "Backspace" || typedChar === " ") {

      if (typedChar === "Backspace") {

        userInput = userInput.slice(0,-1);

        if (
          allTypingResults[currentLevel][currentStage] &&
          allTypingResults[currentLevel][currentStage].length > 0
        ) {
          allTypingResults[currentLevel][currentStage].pop();
        }

        updateDisplay();
        return;

      }

      if (userInput.length < stages[currentStage].length) {

        const expectedChar = stages[currentStage][userInput.length];
        const typedCharLower = typedChar.toLowerCase();
        const expectedCharLower = expectedChar.toLowerCase();

        if (!allTypingResults[currentLevel][currentStage]) {
          allTypingResults[currentLevel][currentStage] = [];
        }

        if (typedCharLower === expectedCharLower) {

          userInput += expectedChar;

          keySound.currentTime = 0;
          keySound.play();

          speak(expectedChar);
          pressKey(expectedChar);

          allTypingResults[currentLevel][currentStage].push([expectedChar,1]);

        }

        else {

          errorSound.currentTime = 0;
          errorSound.play();

          messageElement.textContent =
          `Wrong key. Expected "${expectedChar}", typed "${typedChar}".`;

          allTypingResults[currentLevel][currentStage].push([expectedChar,0,typedChar]);

          return;

        }

        updateDisplay();

        if (userInput === stages[currentStage]) {

          setTimeout(() => {

            currentStage++;

            if (currentStage < stages.length) {

              userInput = "";
              hideCongrats();
              updateDisplay();
              speak(stages[currentStage][0]);

            }

            else {

              messageElement.textContent =
              "Congratulations! You've completed all stages.";

              keysToTypeElement.innerHTML = "";
              showCongrats();

              localStorage.setItem(
                "allTypingResults",
                JSON.stringify(allTypingResults)
              );

            }

          },1000);

        }

      }

    }

  });

  window.toggleSound = function () {

    soundEnabled = !soundEnabled;

    const soundToggleElement = document.getElementById("soundToggle");

    soundToggleElement.textContent =
      `Sound: ${soundEnabled ? "On" : "Off"}`;

    volIcon.src = soundEnabled
      ? "../../assets/images/volume.png"
      : "../../assets/images/mute.png";

  };

  window.addEventListener("beforeunload", function () {

    localStorage.setItem(
      "allTypingResults",
      JSON.stringify(allTypingResults)
    );

  });

  next.addEventListener("click", function () {
    saveResultsToFile();
  });

  const keyboard = document.querySelector(".keyboard");

  function size() {

    const size = keyboard.parentNode.clientWidth / 90;
    keyboard.style.fontSize = size + "px";

  }

  window.addEventListener("resize", size);
  size();

  updateDisplay();
  hideCongrats();

});

function handleInput(char) {

  const event = new KeyboardEvent("keydown",{key:char});
  document.dispatchEvent(event);

}

document.querySelectorAll("[data-char]").forEach(key => {

  const char = key.getAttribute("data-char")[0];

  key.addEventListener("click", () => {
    handleInput(char);
  });

  key.addEventListener("touchstart", (e) => {

    e.preventDefault();
    handleInput(char);

  });

});
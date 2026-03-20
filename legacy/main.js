// ============================================================
//  main.js  —  Single shared engine for ALL levels (1–10)
//
//  Load order in each levelN.html:
//    1.  <script src="./new java/scriptN.js"></script>  ← stages[] + levelConfig{}
//    2.  <script src="./new java/main.js"></script>      ← this file
//
//  main.js fetches template.html, injects it into the page,
//  then runs the full typing engine.
//
//  levelConfig shape (defined in every scriptN.js):
//  {
//    currentLevel  : "level1",
//    nextPage      : "level2.html",
//    restartPage   : "level1.html",
//    caseSensitive : false,     // true from level6 onward
//    quoteSwap     : false,     // true ONLY for level9
//    hasTimer      : false,     // true ONLY for level10
//    hasNumberRow  : false,     // true for level8 + level9
//    colorNumbers  : false,     // true for level8 + level9
//    useLetterBoxes: false,     // true ONLY for level1
//  }
// ============================================================

// ── Virtual keyboard state ────────────────────────────────
// Declared outside DOMContentLoaded so handleVirtualKey()
// (called via onclick in template.html) can always reach them.
let virtualShift = false;
let virtualCaps  = false;

// ── Audio ─────────────────────────────────────────────────
const keySound     = new Audio("../assets/audio/keypress.mp3");
const errorSound   = new Audio("../assets/audio/wrong.mp3");
const applaudSound = new Audio("../assets/audio/applaud.mp3");

// ============================================================
//  STEP 1 — Fetch template.html and inject into page,
//           then boot the engine.
// ============================================================
fetch("../levels/template.html")
  .then(function (response) {
    if (!response.ok) throw new Error("template.html not found");
    return response.text();
  })
  .then(function (html) {
    // Parse the fetched HTML
    const parser = new DOMParser();
    const doc    = parser.parseFromString(html, "text/html");

    // Copy <link> (CSS) from template into this page's <head>
    // so the theme stylesheet loads correctly
    const templateLink = doc.querySelector('link#theme');
    if (templateLink) {
      const existing = document.getElementById("theme");
      if (existing) {
        existing.href = '..'+templateLink.href;
      } else {
        document.head.appendChild(document.importNode(templateLink, true));
      }
    }

    // Inject the full <body> content from template into this page
    document.body.innerHTML = doc.body.innerHTML;

    // Re-run inline scripts from template (theme switcher + key active)
    doc.body.querySelectorAll("script").forEach(function (oldScript) {
      const newScript = document.createElement("script");
      newScript.textContent = oldScript.textContent;
      document.body.appendChild(newScript);
    });

    // Template is now in the DOM — boot the engine
    bootEngine();
  })
  .catch(function (err) {
    // Fallback: show a clear error so developer knows what went wrong
    document.body.innerHTML =
      "<div style='font-family:sans-serif;padding:40px;color:red;'>" +
      "<h2>Could not load template.html</h2>" +
      "<p>Make sure you are running this with a local server (e.g. VS Code Live Server).</p>" +
      "<p>Error: " + err.message + "</p>" +
      "</div>";
  });

// ============================================================
//  STEP 2 — Engine boots after template is injected
// ============================================================
function bootEngine() {

  // ── Show number row if this level needs it ───────────────
  if (levelConfig.hasNumberRow) {
    const numRow = document.getElementById("number-row");
    if (numRow) numRow.style.display = "";
  }

  // ── Show timer if this level needs it ────────────────────
  if (levelConfig.hasTimer) {
    const timerEl = document.getElementById("timer");
    if (timerEl) timerEl.style.display = "";
  }

  // ── Resolve DOM elements ─────────────────────────────────
  const keysToTypeElement = document.getElementById("keysToTypeSpan");
  const messageElement    = document.getElementById("message");
  const blury             = document.querySelector(".blur");
  const mascot            = document.querySelector(".mascot");
  const congo             = document.querySelector(".congo");
  const restart           = document.querySelector(".restart");
  const next              = document.querySelector(".next");
  const lnum              = document.querySelector(".lh");
  const rnum              = document.querySelector(".rh");
  const volButton         = document.querySelector(".volbt");
  const timerElement      = document.getElementById("timer");
  const timerPausedOverlay = document.getElementById("timerPausedOverlay");

  // ── Set restart / next hrefs from levelConfig ────────────
  if (restart) restart.href = levelConfig.restartPage;
  if (next)    next.href    = levelConfig.nextPage;

  // ── Prevent spacebar from clicking volume button ─────────
  if (volButton) {
    volButton.addEventListener("keydown", function (event) {
      if (event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
      }
    });
  }

  // ── Runtime state ────────────────────────────────────────
  let currentStage  = 0;
  let userInput     = "";
  let soundEnabled  = false;
  let startTime     = null;
  let timerInterval = null;
  let pausedTime     = 0;
  let inactivityTimer   = null;
  let isPaused      = false;

  // ── Analytics ────────────────────────────────────────────
  let allTypingResults =
    JSON.parse(localStorage.getItem("allTypingResults")) || {};
  const currentLevel = levelConfig.currentLevel;
  if (!allTypingResults[currentLevel]) {
    allTypingResults[currentLevel] = [];
  }

  // ==========================================================
  //  TIMER  (level10 only)
  // ==========================================================
  function pauseTimer() {
  if (!isPaused && startTime && timerInterval) {
    isPaused = true;
    clearInterval(timerInterval);
    timerInterval = null;
    pausedTime += Math.floor((new Date() - startTime) / 1000);
    startTime = null;
    if (timerPausedOverlay) timerPausedOverlay.style.display="flex";
  }
}

function resumeTimer() {
  if (isPaused) {
    isPaused = false;
    startTime = new Date();
    timerInterval = setInterval(function () {
      const elapsed = pausedTime + Math.floor((new Date() - startTime) / 1000);
      const minutes = Math.floor(elapsed / 60).toString().padStart(2, "0");
      const seconds = (elapsed % 60).toString().padStart(2, "0");
      if (timerElement) timerElement.textContent = "Time: " + minutes + ":" + seconds;
    }, 1000);
    if (timerPausedOverlay) timerPausedOverlay.style.display="none";
  }
}


function startTimer() {
    if (!startTime && timerElement) {
      startTime = new Date();
      timerInterval = setInterval(function () {
        const elapsed = pausedTime + Math.floor((new Date() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, "0");
        const seconds = (elapsed % 60).toString().padStart(2, "0");
        timerElement.textContent = "Time: " + minutes + ":" + seconds;
      }, 1000);
    }
  }

  function stopTimer() {
    if (startTime && timerInterval) {
      clearInterval(timerInterval);
      const totalTime = pausedTime + Math.floor((new Date() - startTime) / 1000);
      const minutes   = Math.floor(totalTime / 60).toString().padStart(2, "0");
      const seconds   = (totalTime % 60).toString().padStart(2, "0");
      if (timerElement) {
        timerElement.textContent = "Time: " + minutes + ":" + seconds;
      }
      return totalTime;
    }
    return 0;
  }

  function calculateMetrics(totalTime) {
    if (totalTime === 0) return { wpm: 0, lps: 0, totalTime: 0 };
    let totalChars = 0;
    let totalWords = 0;
    stages.forEach(function (stage) {
      totalChars += stage.length;
      totalWords += stage.split(" ").length;
    });
    const wpm = Math.round(totalWords / (totalTime / 60)) || 0;
    const lps = Number((totalChars / totalTime).toFixed(2)) || 0;
    return { wpm: wpm, lps: lps, totalTime: totalTime };
  }

  // ==========================================================
  //  UPDATE DISPLAY
  // ==========================================================
  function updateDisplay() {
    const correctText = stages[currentStage];
    let displayText   = "";

    for (let i = 0; i < correctText.length; i++) {
      if (levelConfig.useLetterBoxes) {
        // level1 style — CSS letterBox classes
        let className = "letterBox";
        if (i < userInput.length) {
          className += userInput[i] === correctText[i] ? " correct" : " wrong";
        }
        const ch = correctText[i] === " " ? "&nbsp;" : correctText[i];
        displayText += "<span class=\"" + className + "\">" + ch + "</span>";
      } else {
        // level2-10 style — inline color spans
        if (i < userInput.length) {
          const color = userInput[i] === correctText[i] ? "green" : "red";
          displayText += "<span style='color: " + color + ";'>" + correctText[i] + "</span>";
        } else {
          displayText += "<span style='color: black;'>" + correctText[i] + "</span>";
        }
      }
    }

    keysToTypeElement.innerHTML = displayText;
    messageElement.textContent  = "Stage " + (currentStage + 1) + ": Type the sentence.";

    if (userInput.length < correctText.length) {
      updateHands(correctText[userInput.length]);
    } else {
      if (lnum) lnum.src = "../assets/images/letters/left_idle.webp";
      if (rnum) rnum.src = "../assets/images/letters/right_idle.webp";
    }
  }

  // ==========================================================
  //  CONGRATS OVERLAY
  // ==========================================================
  function showCongrats() {
    clearTimeout(inactivityTimer);
    inactivityTimer = null;
    if (levelConfig.hasTimer) {
      const totalTime = stopTimer();
      const metrics   = calculateMetrics(totalTime);
      const minutes   = Math.floor(totalTime / 60).toString().padStart(2, "0");
      const seconds   = (totalTime % 60).toString().padStart(2, "0");
      if (congo) {
        congo.innerHTML =
          "Congratulations!!\uD83E\uDD73<br>WPM: " + metrics.wpm +
          "<br>LPS: " + metrics.lps +
          "<br>Total Time: " + minutes + ":" + seconds;
      }
    }
    [blury, mascot, congo, restart, next].forEach(function (el) {
      if (el) el.classList.remove("hidden");
    });
    applaudSound.play();
  }

  function hideCongrats() {
    [blury, mascot, congo, restart, next].forEach(function (el) {
      if (el) el.classList.add("hidden");
    });
  }

  // ==========================================================
  //  SPEECH
  // ==========================================================
  function speak(text) {
    if (soundEnabled) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        text === " " ? "space" : text
      );
      speechSynthesis.speak(utterance);
    }
  }

  // ==========================================================
  //  PRESS KEY — green flash on keyboard
  // ==========================================================
  function pressKey(char) {
    const target =
      char === " "
        ? document.querySelector('[data-key="32"]')
        : document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
    if (!target) return;
    target.setAttribute("data-pressed", "on");
    target.style.backgroundColor = "#00FF00";
    target.style.transform        = "scale(1.1)";
    setTimeout(function () {
      target.removeAttribute("data-pressed");
      target.style.backgroundColor = "";
      target.style.transform        = "scale(1)";
    }, 200);
  }

  // ==========================================================
  //  UPDATE HANDS
  // ==========================================================
// ==========================================================
  //  UPDATE HANDS (With Specific Idle Images)
  // ==========================================================
function updateHands(key) {
  if (!lnum || !rnum) return;

  const leftShiftKey  = document.querySelector('[data-key="16"]');
  const rightShiftKey = document.querySelector('[data-key="16-R"]');

  // 1. Reset BOTH hands to their specific IDLE positions first
  lnum.src = "../assets/images/letters/left_idle.webp"; 
  rnum.src = "../assets/images/letters/right_idle.webp"; 
  
  if (leftShiftKey)  leftShiftKey.style.backgroundColor  = "";
  if (rightShiftKey) rightShiftKey.style.backgroundColor = "";

  const char = key.toLowerCase();

  // 2. Define Hand Finger Maps
  const leftHandKeys  = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b'];
  const rightHandKeys = ['y', 'u', 'i', 'o', 'p', 'h', 'j', 'k', 'l', 'n', 'm', ';', "'", ',', '.', '/'];

  // 3. Logic for Left Hand Keys
  if (leftHandKeys.includes(char)) {
    lnum.src = "../assets/images/letters/" + char + ".webp"; 
    // rnum stays idle because of step 1
  } 
  
  // 4. Logic for Right Hand Keys
  else if (rightHandKeys.includes(char)) {
    // Note: If your file is named 'semicolon.webp' instead of ';.webp', use this check:
    const fileName = (char === ';') ? ';' : char; 
    rnum.src = "../assets/images/letters/" + fileName + ".webp";
    // lnum stays idle because of step 1
  }

  // 5. Check for Spacebar
  else if (key === " ") {
    rnum.src = "../assets/images/letters/space.webp";
  }
}

  // ==========================================================
  //  SAVE RESULTS TO FILE
  // ==========================================================
  function saveResultsToFile() {
    localStorage.setItem("allTypingResults", JSON.stringify(allTypingResults));
    const data = {
      results  : allTypingResults,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a   = document.createElement("a");
    a.href     = url;
    a.download = "all_typing_results.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ==========================================================
  //  KEYDOWN HANDLER — core typing engine
  // ==========================================================
  document.addEventListener("keydown", function (event) {
    let typedChar = event.key;
    // Resume timer if paused
    if (levelConfig.hasTimer && isPaused) {
      resumeTimer();
    }

    // Reset inactivity countdown
    if (levelConfig.hasTimer && startTime) {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(function () {
        pauseTimer();
      }, 5000);
    }

    // level9: swap single ↔ double quote
    if (levelConfig.quoteSwap) {
      if      (typedChar === '"') typedChar = "'";
      else if (typedChar === "'") typedChar = '"';
    }

    if (
      typedChar.length !== 1 &&
      typedChar !== "Backspace" &&
      typedChar !== " "
    ) return;

    // Start timer on first keypress (level10 only)
    if (levelConfig.hasTimer && !startTime && typedChar !== "Backspace") {
      startTimer();
    }

    // Backspace
    if (typedChar === "Backspace") {
      userInput = userInput.slice(0, -1);
      if (
        allTypingResults[currentLevel][currentStage] &&
        allTypingResults[currentLevel][currentStage].length > 0
      ) {
        allTypingResults[currentLevel][currentStage].pop();
      }
      updateDisplay();
      return;
    }

    // Normal character
    if (userInput.length < stages[currentStage].length) {
      const expectedChar = stages[currentStage][userInput.length];

      if (!allTypingResults[currentLevel][currentStage]) {
        allTypingResults[currentLevel][currentStage] = [];
      }

      const isCorrect = levelConfig.caseSensitive
        ? typedChar === expectedChar
        : typedChar.toLowerCase() === expectedChar.toLowerCase();

      if (isCorrect) {
        userInput += expectedChar;
        keySound.currentTime = 0;
        keySound.play();
        speak(expectedChar);
        pressKey(expectedChar);
        allTypingResults[currentLevel][currentStage].push([expectedChar, 1]);
        updateDisplay();

        // Stage complete?
        if (userInput === stages[currentStage]) {
          setTimeout(function () {
            currentStage++;
            if (currentStage < stages.length) {
              userInput = "";
              hideCongrats();
              if (timerPausedOverlay) timerPausedOverlay.classList.add("hidden");
              updateDisplay();
              speak(stages[currentStage][0]);
            } else {
              messageElement.textContent =
                "Congratulations! You've completed all stages.";
              keysToTypeElement.innerHTML = "";
              showCongrats();
              localStorage.setItem(
                "allTypingResults",
                JSON.stringify(allTypingResults)
              );
            }
          }, 1000);
        }

} else {
        // Wrong key
        errorSound.currentTime = 0;
        errorSound.play();
        messageElement.textContent =
          'Wrong key. Expected "' + expectedChar + '", typed "' + typedChar + '". Try again.';

        // Flash the keyboard key red
        const keyEl = document.querySelector(
          '[data-char*="' + typedChar.toUpperCase() + '"]'
        );
        if (keyEl) {
          keyEl.style.backgroundColor = "#EF5350";
          keyEl.style.transform        = "scale(0.9)";
          setTimeout(function () {
            keyEl.style.backgroundColor = "";
            keyEl.style.transform        = "scale(1)";
          }, 300);
        }

        // Blink the current letterBox red (level1-5 only)
        if (levelConfig.useLetterBoxes) {
          const boxes = keysToTypeElement.querySelectorAll(".letterBox");
          const currentBox = boxes[userInput.length];
          if (currentBox) {
            currentBox.style.backgroundColor = "#ffcdd2";
            currentBox.style.borderColor     = "#e53935";
            setTimeout(function () {
              currentBox.style.backgroundColor = "";
              currentBox.style.borderColor     = "";
            }, 300);
          }
        }
        allTypingResults[currentLevel][currentStage].push(
          [expectedChar, 0, typedChar]
        );
      }
    }
  });

  // ==========================================================
  //  TOGGLE SOUND  (called via onclick="toggleSound()" in template)
  // ==========================================================
  window.toggleSound = function () {
    soundEnabled = !soundEnabled;
    const toggleEl = document.getElementById("soundToggle");
    const volImg   = document.querySelector(".vol");
    if (toggleEl) {
      toggleEl.textContent = "Sound: " + (soundEnabled ? "On" : "Off");
    }
    if (volImg) {
      volImg.src = soundEnabled
        ? "../assets/images/volume.png"
        : "../assets/images/mute.png";
    }
  };

  // ==========================================================
  //  COLOR NUMBER KEYS  (level8 + level9)
  // ==========================================================
  if (levelConfig.colorNumbers) {
    const colorMap = {
      "2":"#ff7b7b","3":"#ffa07a","4":"#ffd700","5":"#ffd700",
      "6":"#ffd700","7":"#ffd700","8":"#ffa07a","9":"#ff7b7b"
    };
    Object.entries(colorMap).forEach(function (entry) {
      const key = document.querySelector('.keyboard [data-char^="' + entry[0] + '"]');
      if (key) key.style.color = entry[1];
    });
  }

  // ==========================================================
  //  KEYBOARD RESIZE
  // ==========================================================
  const keyboard = document.querySelector(".keyboard");
  function resizeKeyboard() {
    if (keyboard && keyboard.parentNode) {
      keyboard.style.fontSize =
        keyboard.parentNode.clientWidth / 90 + "px";
    }
  }
  window.addEventListener("resize", resizeKeyboard);
  resizeKeyboard();

  // ==========================================================
  //  VIRTUAL KEYBOARD  (touch + click)
  // ==========================================================
  document.querySelectorAll(".keyboard [data-key], .keyboard [data-char]")
    .forEach(function (key) {
      key.addEventListener("click", function () { handleVirtualKey(key); });
      key.addEventListener("touchstart", function (e) {
        e.preventDefault();
        handleVirtualKey(key);
      });
    });

  // ==========================================================
  //  SAVE on tab close
  // ==========================================================
  window.addEventListener("beforeunload", function () {
    localStorage.setItem("allTypingResults", JSON.stringify(allTypingResults));
  });

  // Save + download on Next click
  if (next) {
    next.addEventListener("click", saveResultsToFile);
  }

  // ==========================================================
  //  INITIALISE
  // ==========================================================
  hideCongrats();
  updateDisplay();

} // end bootEngine()


// ============================================================
//  VIRTUAL KEYBOARD HANDLERS
//  Must be global so onclick="" in template can call them.
// ============================================================
function sendKey(keyValue) {
  document.dispatchEvent(
    new KeyboardEvent("keydown", { key: keyValue, bubbles: true })
  );
}

function handleVirtualKey(keyEl) {
  const keyCode  = keyEl.getAttribute("data-key");
  const charData = keyEl.getAttribute("data-char");

  if (keyCode === "16" || keyCode === "16-R") {
    virtualShift = true;
    keyEl.classList.add("shift-active");
    return;
  }
  if (keyCode === "20") {
    virtualCaps = !virtualCaps;
    keyEl.classList.toggle("caps-active", virtualCaps);
    return;
  }
  if (keyCode === "8")  return sendKey("Backspace");
  if (keyCode === "13") return sendKey("Enter");
  if (keyCode === "9")  return sendKey("\t");
  if (keyCode === "32") return sendKey(" ");

  if (!charData) return;

  let normalChar = charData.length > 1 ? charData[1] : charData[0];
  let shiftChar  = charData[0];
  let finalChar  = virtualShift ? shiftChar : normalChar;

  if (/[a-zA-Z]/.test(finalChar)) {
    finalChar = (virtualCaps ^ virtualShift)
      ? finalChar.toUpperCase()
      : finalChar.toLowerCase();
  }

  sendKey(finalChar);

  if (virtualShift) {
    virtualShift = false;
    document.querySelectorAll('[data-key="16"], [data-key="16-R"]')
      .forEach(function (k) { k.classList.remove("shift-active"); });
  }
}

// ============================================================
//  indexscript.js  —  Typing Tutor Landing Page
// ============================================================

// ── START GAME ───────────────────────────────────────────────
function openHome() {
  const btn = document.querySelector(".start-btn");
  if (btn) {
    btn.innerHTML = "Loading...";
    btn.disabled = true;
  }
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "home.html";
  }, 900);
}

// ── ROTATE SCREEN ────────────────────────────────────────────
// Show the rotate prompt only on portrait mobile/tablet
// CSS media query already handles most of this, but JS gives
// us live orientation-change detection.
const rotateScreen = document.getElementById("rotate-screen");

function checkOrientation() {
  if (!rotateScreen) return;
  const isPortrait = window.innerHeight > window.innerWidth;
  const isMobile   = window.innerWidth <= 768;

  if (isPortrait && isMobile) {
    rotateScreen.style.display = "flex";
  } else {
    rotateScreen.style.display = "none";
  }
}

// Run on load + on every resize / orientation change
checkOrientation();
window.addEventListener("resize",            checkOrientation);
window.addEventListener("orientationchange", () => {
  // Small delay lets the browser finish rotating
  setTimeout(checkOrientation, 120);
});

// ── KEYBOARD / HAND HOVER INTERACTION ────────────────────────
const keyboard  = document.querySelector(".keyboard-area");
const leftHand  = document.querySelector(".hand-left");
const rightHand = document.querySelector(".hand-right");

if (keyboard && leftHand && rightHand) {
  keyboard.addEventListener("mouseenter", () => {
    leftHand.style.transform  = "translateY(-18px)";
    rightHand.style.transform = "translateY(-18px)";
  });
  keyboard.addEventListener("mouseleave", () => {
    leftHand.style.transform  = "";
    rightHand.style.transform = "";
  });
}

// ── MASCOT HOVER INTERACTION ──────────────────────────────────
function setupMascot(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const idle = el.getAttribute("data-idle");
  const wave = el.getAttribute("data-wave");

  el.addEventListener("mouseenter", () => {
    if (wave) el.src = wave;
    el.classList.add("wave");
  });
  el.addEventListener("mouseleave", () => {
    if (idle) el.src = idle;
    el.classList.remove("wave");
  });
}

setupMascot("mascot-left");
setupMascot("mascot-right");
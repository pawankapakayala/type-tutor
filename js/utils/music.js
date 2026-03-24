const music = document.getElementById("backgroundMusic");

// Restore state
window.addEventListener("load", () => {
  const wasPlaying = localStorage.getItem("musicPlaying");

  if (wasPlaying === "true") {
    music.volume = 0.5;
    music.play().catch(() => {});
  }
});

// Start music on first interaction (browser policy fix)
document.addEventListener("click", () => {
  if (music.paused) {
    music.volume = 0.5;
    music.play().catch(() => {});
    localStorage.setItem("musicPlaying", "true");
  }
}, { once: true });

// Save state before leaving page
window.addEventListener("beforeunload", () => {
  localStorage.setItem("musicPlaying", !music.paused);
});

function checkOrientation() {
  const rotateScreen = document.getElementById("rotate-screen");

  if (window.innerWidth < 900 && window.innerHeight > window.innerWidth) {
    // Mobile + Portrait
    rotateScreen.style.display = "flex";
    document.body.style.overflow = "hidden";
  } else {
    rotateScreen.style.display = "none";
    document.body.style.overflow = "";
  }
}

// Run on load
checkOrientation();

// Run on resize / rotate
window.addEventListener("resize", checkOrientation);
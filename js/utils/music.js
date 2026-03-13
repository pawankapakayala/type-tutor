document.addEventListener("DOMContentLoaded", function () {
    var backgroundMusic = document.getElementById("backgroundMusic");

    if (!backgroundMusic) return;

    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(function () {

            document.addEventListener("click", function () {
                backgroundMusic.play().catch(function (error) {
                    console.error("Failed to play audio:", error);
                });

            }, { once: true });

        });
    }
});
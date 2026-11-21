
(function () {
  // Load custom audio from your Sounds/ folder
  const foxAudio = new Audio("./Sounds/fox.mp3");
  foxAudio.loop = true;
  foxAudio.volume = 0.75;

  let isFoxPlaying = false;

  function mountFoxButton() {
    const btnContainer = document.querySelector(".hdr-btns");
    const soundBtn = document.getElementById("soundToggle");
    if (!btnContainer || !soundBtn) return;

    // Create button matching existing Matrix UI
    const foxBtn = document.createElement("button");
    foxBtn.id = "foxToggle";
    foxBtn.className = "mode-btn";
    foxBtn.textContent = "🦊 FOX: OFF";

    // Insert right before the 432Hz sound menu button
    btnContainer.insertBefore(foxBtn, soundBtn);

    foxBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isFoxPlaying) {
        foxAudio.pause();
        isFoxPlaying = false;
        foxBtn.textContent = "🦊 FOX: OFF";
        foxBtn.style.borderColor = "";
      } else {
        foxAudio.play().then(() => {
          isFoxPlaying = true;
          foxBtn.textContent = "🦊 FOX: ON";
          foxBtn.style.borderColor = "#ffb000";
        }).catch((err) => {
          console.warn("Audio playback blocked until interaction:", err);
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountFoxButton);
  } else {
    mountFoxButton();
  }
})();

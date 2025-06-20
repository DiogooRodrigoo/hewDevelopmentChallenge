const SHOW_LAYOUT_AFTER_SECONDS = 1214;

let player;
let intervalId = null;
let offerShown = false;

(function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player("player", {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

function onPlayerReady() {
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING && !intervalId) {
    intervalId = setInterval(checkTime, 1000);
  }
  if ((event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) && intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function checkTime() {
  if (!player || typeof player.getCurrentTime !== 'function') return;

  const currentTime = player.getCurrentTime();

  if (!offerShown && currentTime >= SHOW_LAYOUT_AFTER_SECONDS) {
    showFinalLayout();
  }
}

function showFinalLayout() {
  offerShown = true;
  clearInterval(intervalId);
  intervalId = null;

  const dynamicLayout = document.getElementById("dynamic-layout-container");
  const initialLayout = document.getElementById("initial-layout");

  if (!dynamicLayout || !initialLayout) return;

  dynamicLayout.classList.remove("d-none");
  initialLayout.classList.add("d-none");

  document.querySelectorAll(".countdown-timer").forEach(timerEl => {
    startCountdown(20 * 60, timerEl); // 20 minutos em segundos
  });
}

function startCountdown(durationInSeconds, timerElement) {
  let timeLeft = durationInSeconds;

  const minutesEl = timerElement.querySelector(".minutes");
  const secondsEl = timerElement.querySelector(".seconds");

  if (!minutesEl || !secondsEl) return;

  const countdownInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
    } else {
      timeLeft--;
    }
  }, 1000);
}
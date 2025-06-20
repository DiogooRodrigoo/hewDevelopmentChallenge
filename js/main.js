document.addEventListener("DOMContentLoaded", function () {
  console.log("Chegou no JS");

  const postContent = document.getElementById("dynamic-layout");
  const initialLayout = document.getElementById("initial-layout");

  let player;
  let intervalId;
  let offerShown = false;

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("player", {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  };

  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING && !intervalId) {
      console.log("Vídeo começou a tocar");
      intervalId = setInterval(checkTime, 1000); 
    }

    if (event.data === YT.PlayerState.ENDED && intervalId) {
      clearInterval(intervalId);
    }
  }

  function checkTime() {
    const currentTime = player.getCurrentTime();
    if (!offerShown && currentTime >= 1214) {
      offerShown = true;
      postContent.classList.remove("d-none");
      initialLayout.classList.add("d-none");
      startCountdown(20 * 60);
      console.log("Conteúdo exibido após 20:14");
    }
  }

  function startCountdown(duration) {
    const timerDisplay = document.getElementById("timer");
    let time = duration;

    const countdownInterval = setInterval(() => {
      const minutes = Math.floor(time / 60).toString().padStart(2, '0');
      const seconds = (time % 60).toString().padStart(2, '0');
      timerDisplay.textContent = `${minutes}:${seconds}`;

      if (--time < 0) {
        clearInterval(countdownInterval);
        timerDisplay.textContent = "Offer expired";
      }
    }, 1000);
  }
});
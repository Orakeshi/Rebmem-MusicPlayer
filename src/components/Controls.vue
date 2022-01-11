<template>
  <div id="audio-player-container">
    <audio id="audio-player-test" src="" preload="metadata" loop>
      <source id="audioSource" src="">
    </audio>
    <div id="img-container">
      <img id="song-img" src="../../public/images/Orakeshi.png">
    </div>
    <div id="song-name-container">
      <p id="song-name">Persona 4 song</p>
    </div>
    <div id="play-icon-container">
      <button id="play-icon"></button>
    </div>

    <div id="volume-container">
      <button id="mute-icon"></button>
      <div id="volume-controls-container">
        <output id="volume-output">100</output>
        <input class="slider-input" type="range" id="volume-slider" max="100" value="100">
      </div>
    </div>


    <div id="controls-parent">
      <div id="song-progress-container">
        <span id="current-time" class="time">0:00</span>
        <input class="slider-input" type="range" id="seek-slider" max="100" value="0">
        <span id="duration" class="time">0:00</span>
      </div>
    </div>

  </div>
</template>

<script>
  const path = window.require("path")
  const lottieWeb = window.require("lottie-web")

  window.addEventListener('load', function () {
    const playIconContainer = document.getElementById('play-icon');
    const audioPlayerContainer = document.getElementById('audio-player-container');
    const seekSlider = document.getElementById('seek-slider');
    const volumeSlider = document.getElementById('volume-slider');
    const muteIconContainer = document.getElementById('mute-icon');
    let playState = 'play';
    let muteState = 'unmute';

    const playAnimation = lottieWeb.loadAnimation({
      container: playIconContainer,
      path: path.join('../','public/pause.json'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      name: "Play Animation",
    });

    const muteAnimation = lottieWeb.loadAnimation({
      container: muteIconContainer,
      path: path.join('../','public/mute.json'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      name: "Mute Animation",
    });

    playAnimation.goToAndStop(14, true);

    window.changeSong = function (bypassPlayState){
      if(bypassPlayState!=null){
        playState=bypassPlayState;
      }
      if(playState === 'play') {
        audio.play();
        playAnimation.playSegments([14, 27], true);
        requestAnimationFrame(whilePlaying);
        playState = 'pause';
      } else {
        audio.pause();
        playAnimation.playSegments([0, 14], true);
        cancelAnimationFrame(raf);
        playState = 'play';
      }
    };

    playIconContainer.addEventListener('click', () => {
      changeSong();
    })


    muteIconContainer.addEventListener('click', () => {
      if(muteState === 'unmute') {
        muteAnimation.playSegments([0, 15], true);
        audio.muted = true;
        muteState = 'mute';
      } else {
        muteAnimation.playSegments([15, 25], true);
        audio.muted = false;
        muteState = 'unmute';
      }
    });

    const showRangeProgress = (rangeInput) => {
      if(rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
      else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    }

    seekSlider.addEventListener('input', (e) => {
      showRangeProgress(e.target);
    });
    volumeSlider.addEventListener('input', (e) => {
      showRangeProgress(e.target);
    });


    /** Implementation of the functionality of the audio player */

    const audio = document.querySelector('audio');
    const durationContainer = document.getElementById('duration');
    const currentTimeContainer = document.getElementById('current-time');
    const outputContainer = document.getElementById('volume-output');
    let raf = null;

    const calculateTime = (secs) => {
      const minutes = Math.floor(secs / 60);
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${minutes}:${returnedSeconds}`;
    }

    const displayDuration = () => {
      durationContainer.textContent = calculateTime(audio.duration);
    }

    const setSliderMax = () => {
      seekSlider.max = Math.floor(audio.duration);
    }

    const displayBufferedAmount = () => {
      audio.onprogress = function (){
        const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
        audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
      }

    }

    const whilePlaying = () => {
      seekSlider.value = Math.floor(audio.currentTime);
      currentTimeContainer.textContent = calculateTime(seekSlider.value);
      audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
      raf = requestAnimationFrame(whilePlaying);
    }

    if (audio.readyState > 0) {
      displayDuration();
      setSliderMax();
      displayBufferedAmount();
    } else {
      audio.addEventListener('loadedmetadata', () => {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
      });
    }

    audio.addEventListener('progress', displayBufferedAmount);

    seekSlider.addEventListener('input', () => {
      currentTimeContainer.textContent = calculateTime(seekSlider.value);
      if(!audio.paused) {
        cancelAnimationFrame(raf);
      }
    });

    seekSlider.addEventListener('change', () => {
      audio.currentTime = seekSlider.value;
      if(!audio.paused) {
        requestAnimationFrame(whilePlaying);
      }
    });

    volumeSlider.addEventListener('input', (e) => {
      const value = e.target.value;

      outputContainer.textContent = value;
      audio.volume = value / 100;
    });
  })

  export default {
    name: "Controls"
  }
</script>

<style scoped>
  #song-name-container{
    position: relative;
    float: left;
    width: auto;
    height: auto;
    margin: 10px 10px 10px;
  }
  #song-name {
    font-size: 16px;
    margin: 0;
    color: white;
  }
  #img-container{
    position: relative;
    float: left;
    width: 80px;
    height: 80px;
    max-height: 80px;
    margin: 0;
  }
  #song-img{
    height: 100%;
    width: 100%;
  }
  #play-icon-container{
    position: relative;
    height: 35px;
    margin: auto;
    width: 35px;
    border: 3px solid green;
  }
  #play-icon {
    width: 35px;
    max-width: 35px;
    height: 35px;
    margin: 0 auto;
    color: white;
    /*margin: 20px 2.5% 10px 2.5%;*/
  }
  button {
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
  }


  #controls-parent{
    position: relative;
    margin: 0;
    width: 100%;
    height: auto;
  }
  #song-progress-container{
    position: absolute;
    display: block;
    height: 35px;
    width: 60%;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
    border: 3px solid red;
  }


  #seek-slider {
    position: relative;
    -webkit-appearance: none;
    width: 80%;
    padding: 0;
    height: 19px;
    /*margin: 30px 2.5% 20px 2.5%;*/
    /*margin: 0 auto;*/
    outline: none;
    border: 3px solid blue;
    background-color: #1E272E;
  }


  #volume-container{
    position: absolute;
    right: 0;
    top: 0;
    height: 35px;
    width: 200px;
    border: 3px solid green;
  }
  #volume-slider {
    position: relative;
    -webkit-appearance: none;
    padding: 0;
    height: 19px;
    /*margin: 30px 2.5% 20px 2.5%;*/
    /*margin: 0 auto;*/
    outline: none;
    border: 3px solid blue;
    /*margin: 10px 2.5%;*/
    top: 0;
    width: 70%;
    margin: 0;
    right: 0;
    background-color: #1E272E;
  }
  #mute-icon {
    position: relative;
    left: 0;
    width: 35px;
    height: 35px;
    /*float: left;*/
    margin: 0;
    border: 3px solid orange;
    /*margin: 0 2.5%;*/
  }
  #volume-output{
    position: relative;
    font-size: 15px;
    display: block;
    border: 3px solid yellow;
  }
  #volume-controls-container{
    position: absolute;
    margin: 0;
    right: 0;
    top: 0;
    width: 150px;
    border: 3px solid purple;
  }

  .slider-input::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: linear-gradient(to right, rgba(0, 125, 181, 0.6) var(--buffered-width), rgba(0, 125, 181, 0.2) var(--buffered-width));
  }
  .slider-input::before {
    position: absolute;
    content: "";
    top: 8px;
    left: 0;
    width: var(--seek-before-width);
    height: 3px;
    background-color: #007db5;
    cursor: pointer;
  }
  .slider-input::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none;
    box-sizing: content-box;
    border: 1px solid #007db5;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: #1E272E;
    cursor: pointer;
    margin: -7px 0 0 0;
  }
  .slider-input:active::-webkit-slider-thumb {
    transform: scale(1.2);
    background: #007db5;
  }
  .slider-input::-moz-range-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: linear-gradient(to right, rgba(0, 125, 181, 0.6) var(--buffered-width), rgba(0, 125, 181, 0.2) var(--buffered-width));
  }
  .slider-input::-moz-range-progress {
    background-color: #007db5;
  }
  .slider-input::-moz-focus-outer {
    border: 0;
  }
  .slider-input::-moz-range-thumb {
    box-sizing: content-box;
    border: 1px solid #007db5;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: #1E272E;
    cursor: pointer;
  }
  .slider-input:active::-moz-range-thumb {
    transform: scale(1.2);
    background: #007db5;
  }
  .slider-input::-ms-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: transparent;
    border: solid transparent;
    color: transparent;
  }
  .slider-input::-ms-fill-lower {
    background-color: #007db5;
  }
  .slider-input::-ms-fill-upper {
    background: linear-gradient(to right, rgba(0, 125, 181, 0.6) var(--buffered-width), rgba(0, 125, 181, 0.2) var(--buffered-width));
  }
  .slider-input::-ms-thumb {
    box-sizing: content-box;
    border: 1px solid #007db5;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: #1E272E;
    cursor: pointer;
  }
  .slider-input:active::-ms-thumb {
    transform: scale(1.2);
    background: #007db5;
  }

  /* NO MY STYLES */
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: -0.5px;
  }

  #audio-player-container {
    --seek-before-width: 0%;
    --volume-before-width: 100%;
    --buffered-width: 0%;
    position: relative;
    /*margin: 100px 2.5% auto 2.5%;*/
    width: 100%;
    max-width: 100%;
    height: 80px;
    max-height: 80px;
    background: #1E272E;
  }
  #audio-player-container::before {
    position: relative;
    content: '';
    width: 100%;
    height: 80px;
    max-height: 80px;
    background: linear-gradient(to left, #007db5, #ff8a00);
    z-index: -1;
  }

  path {
    stroke: #007db5;
  }
  .time {
    position: relative;
    display: inline-block;
    width: auto;
    text-align: center;
    font-size: 15px;
    margin: 0px 10px 0px;
    color: white;
    /*margin: 28.5px 0 18.5px 0;*/
  }
  output {
    display: inline-block;
    width: 32px;
    text-align: center;
    font-size: 20px;
    /*margin: 10px 2.5% 0 5%;*/
    float: left;
    clear: left;
    color: white;
    margin: 0 auto;
  }

  #volume-slider::-webkit-slider-runnable-track {
    background: rgba(0, 125, 181, 0.6);
  }
  #volume-slider::-moz-range-track {
    background: rgba(0, 125, 181, 0.6);
  }
  #volume-slider::-ms-fill-upper {
    background: rgba(0, 125, 181, 0.6);
  }
  #volume-slider::before {
    width: var(--volume-before-width);
  }


</style>
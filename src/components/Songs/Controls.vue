<template>
  <!-- Audio Player container -->
  <div id="audio-player-container">
    <audio id="audio-player-test" src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" preload="metadata" loop>
      <source id="audioSource" src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3">
    </audio>
    <!-- Current image of the song that is being played -->
    <div id="img-container">
      <img id="song-img" src="../../../public/images/Orakeshi.png">
    </div>
    <!-- Name of the song that is being played -->
    <div id="song-name-container">
      <p id="song-name"></p>
    </div>
    <div id="song-control-parent">
      <div id="previous-song-container" @click="previousSong()">
        <img id="previous-song-icon" src="../../../public/images/previous-icon.png">
      </div>
      <div id="play-icon-container">
        <!--      <button id="play-icon"></button>-->
        <img id="play-icon" src="../../../public/images/play-icon.png">
      </div>
      <div id="next-song-container" @click="nextSong()">
        <img id="next-song-icon" src="../../../public/images/next-icon.png">
      </div>
      <div id="shuffle-song-container" @click="shuffleSong()">
        <img id="shuffle-song-icon" src="../../../public/images/shuffle-icon.png">
      </div>
    </div>

    <!-- Container for the volume of the application -->
    <div id="volume-container">
<!--      <button id="mute-icon"></button>-->
      <img id="mute-icon" src="../../../public/images/speaker-icon.png">
      <div id="volume-controls-container">
        <output id="volume-output">100</output>
        <input class="slider-input" type="range" id="volume-slider" max="100" value="100">
      </div>
    </div>

    <!-- Controls parent which controls the seek slider -->
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
  const os = window.require("os").homedir()
  const songFolder = path.join(os, 'Music')
  let currentId = 0;
  let originalData
  let shuffle = false;

  // Wait until window is loaded
  window.addEventListener('load', function () {
    // Store all HTML elements in variables for access at later date
    const playIconContainer = document.getElementById('play-icon');
    const audioPlayerContainer = document.getElementById('audio-player-container');
    const seekSlider = document.getElementById('seek-slider');
    const volumeSlider = document.getElementById('volume-slider');
    const muteIconContainer = document.getElementById('mute-icon');
    let playState = 'play';

    let muteState = 'unmute';
    /***
     * Continuously play songs without button input
     * @param songData
     * @param clickedId
     */
    window.continuePlay = function (songData, clickedId){
      if (songData !== originalData){
        currentId=0
      }

      originalData = songData;
      let currentSongs = songData
      let audio = document.getElementById("audio-player-test")

      // Check if user clicked song
      if (clickedId !== ""){
        for (let i in currentSongs){
          if (currentSongs[i].id == clickedId){
            currentId = currentSongs.indexOf(currentSongs[i])
          }
        }
      }

      audio.loop=false
      audio.onended = function (){
        currentId +=1
        if (shuffle){
          window.shuffleOrder()
        }

        if (currentId>=currentSongs.length){
          currentId = 0
        }

        audio.setAttribute("src", "file:///"+songFolder+"/"+currentSongs[currentId].audiosrc)
        document.getElementById("song-img").setAttribute("src", currentSongs[currentId].imgdata)
        document.getElementById("song-name").innerHTML=currentSongs[currentId].title
        window.changeSong('play')
        clickedId = "";
      }
    }

    /***
     * Sets currentID to a random int in range of song data
     */
    window.shuffleOrder = function (){
      if (shuffle){
        currentId = Math.floor(Math.random() * originalData.length);
      }
    }

    /***
     * changeSong is responsible for bypassing the animation
     * bypass play state of the application
     * @param bypassPlayState
     */
    window.changeSong = function (bypassPlayState){
      if(bypassPlayState!=null){
        playState=bypassPlayState;
      }
      if(playState === 'play') {
        audio.play();
        playIconContainer.setAttribute("src", "../images/pause-icon.png")

        requestAnimationFrame(whilePlaying);
        playState = 'pause';
      } else {
        audio.pause();
        playIconContainer.setAttribute("src", "../images/play-icon.png")
        cancelAnimationFrame(raf);
        playState = 'play';
      }
    };

    playIconContainer.addEventListener('click', () => {
      window.changeSong();
    })


    muteIconContainer.addEventListener('click', () => {
      if(muteState === 'unmute') {
        audio.muted = true;
        muteIconContainer.setAttribute("src", "../images/mute-icon.png")
        muteState = 'mute';
      } else {
        audio.muted = false;
        muteIconContainer.setAttribute("src", "../images/speaker-icon.png")
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
        let bufferedAmount;
        if(audio.buffered.length>0){
          bufferedAmount = audio.buffered.end(0)
        }
        else{
          bufferedAmount = audio.buffered.start(0)
        }
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
    name: "Controls",
    data(){
      return{
        shuffleSongOrder: []
      }
    },
    methods: {
      /***
       * Handles playing next song in QUEUE on button press
       */
      nextSong(){
        currentId +=1
        if (shuffle){
          window.shuffleOrder()
        }

        if (currentId<=0){
          currentId = 1
        }

        if (currentId>=originalData.length){
          currentId = 0
        }
        let audio = document.getElementById("audio-player-test")
        audio.setAttribute("src", "file:///"+songFolder+"/"+originalData[currentId].audiosrc)
        document.getElementById("song-img").setAttribute("src", originalData[currentId].imgdata)
        document.getElementById("song-name").innerHTML=originalData[currentId].title
        window.changeSong('play')

      },
      /***
       * Handles playing previous song in QUEUE on button press
       */
      previousSong(){
        currentId -=1

        if (currentId<=0){
          currentId = 0
        }
        let audio = document.getElementById("audio-player-test")
        audio.setAttribute("src", "file:///"+songFolder+"/"+originalData[currentId].audiosrc)
        document.getElementById("song-img").setAttribute("src", originalData[currentId].imgdata)
        document.getElementById("song-name").innerHTML=originalData[currentId].title
        window.changeSong('play')
      },
      /***
       * Repsonsibe for setting button state
       * Sets shuffle boolean value
       */
      shuffleSong(){
        if (shuffle == false){
          document.getElementById("shuffle-song-icon").setAttribute("src", "../../images/shuffle-icon-on.png")
          this.shuffleSongOrder = []
        }
        else{
          document.getElementById("shuffle-song-icon").setAttribute("src", "../../images/shuffle-icon.png")
        }
        shuffle =! shuffle
      },

    }
  }
</script>

<style scoped>
  /* Styles for the controls */
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
  #song-control-parent{
    position: absolute;
    margin: auto;
    text-align: center;
    left: 50%;
    padding-top: 5px;
    transform: translateX(-50%);
  }
  #previous-song-container{
    display: inline-block;
    position: relative;
    height: 35px;
    top: 50%;
    transform: translateY(-20%);
    padding-right: 10px;
    cursor: pointer;
    width: 35px;
  }
  #play-icon-container{
    display: inline-block;
    position: relative;
    height: auto;
    margin: 0;
    cursor: pointer;
    width: auto;
  }
  #next-song-container{
    display: inline-block;
    position: relative;
    height: 35px;
    margin: 0;
    padding-left: 10px;
    top: 50%;
    transform: translateY(-20%);
    cursor: pointer;
    width: 35px;
  }
  #shuffle-song-container{
    display: inline-block;
    position: relative;
    height: 35px;
    top: 50%;
    transform: translateY(-20%);
    padding-left: 10px;
    padding-right: 10px;
    margin: 0;
    cursor: pointer;
    width: 35px;
  }
  #play-icon {
    color: white;
    height: 45px;
    width: 45px;
    cursor: pointer;
    /*margin: 20px 2.5% 10px 2.5%;*/
  }
  #next-song-icon{
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
  #previous-song-icon{
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
  #shuffle-song-icon{
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
  button {
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
  }


  #controls-parent{
    position: absolute;
    margin: 0;
    bottom: 0;
    height: 40%;
    width: 100%;
  }
  #song-progress-container{
    position: absolute;
    display: block;
    height: 35px;
    width: 60%;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
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
    background-color: #1E272E;
  }


  #volume-container{
    position: absolute;
    right: 0;
    top: 0;
    height: 35px;
    width: 200px;
  }
  #volume-slider {
    position: relative;
    -webkit-appearance: none;
    padding: 0;
    height: 19px;
    /*margin: 30px 2.5% 20px 2.5%;*/
    /*margin: 0 auto;*/
    outline: none;
    /*margin: 10px 2.5%;*/
    top: 0;
    width: 70%;
    margin: 0;
    right: 0;
    background-color: #1E272E;
  }
  #mute-icon {
    position: relative;
    width: 30px;
    height: 30px;
    margin-top: 3px;
    margin-left: 17px;
    cursor: pointer;
  }
  #volume-output{
    position: relative;
    font-size: 15px;
  }
  output {
    display: inline-block;
    width: 32px;
    text-align: center;
    font-size: 20px;
    margin-top: 2px;
    float: left;
    clear: left;
    color: white;
  }
  #volume-controls-container{
    position: absolute;
    margin: 0;
    right: 0;
    top: 8px;
    width: 150px;
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
    margin-left: 10px;
    margin-right: 10px;
    color: white;
    top: -25%;
    transform: translateY(25%);
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
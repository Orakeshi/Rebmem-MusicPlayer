<template>
  <div class="controls-container">
    <div id="audio-player-container">
      <audio id="music-player" src="" preload=”metadata” loop></audio>
      <button id="play-icon"></button>
      <span id="current-time" class="time">0:00</span>
      <input type="range" id="seek-slider" max="100" value="0">
      <span id="duration" class="time">0:00</span>
      <output id="volume-output">100</output>
      <input type="range" id="volume-slider" max="100" value="100">
      <button id="mute-icon"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Controls"
}
</script>

<style scoped>
  .controls-container {
    position: fixed;
    background: grey;
    bottom: 0;
    width: 100%;
    height: 100px;
    border: 1px pink solid;
  }
</style>
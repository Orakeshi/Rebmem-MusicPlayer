<template>
  <div class="container">
    <div class="library-parent-container">
      <Library title="Library"></Library>
    </div>
    <div class="divider">

    </div>
    <div class="controls-parent-container">
      <Controls></Controls>
    </div>

  </div>
</template>

<script>
import Library from './components/Library';
import Controls from './components/Controls';

export default {
  name: 'App',
  components: {
    Controls,
    Library
  },
}
</script>

<style>
  html{
    height: 100%;
    margin:0;
    padding:0;
  }

  body{
    margin:0;
    padding:0;
    height:100%;
    background: #485460;
  }
  .container{
    display: block;
    position: absolute;
    height: 100%;
  }
  .library-parent-container{
    position: relative;
    height: 85%;
    overflow: auto;
  }
  .controls-parent-container{
    position: fixed;
    height: 15%;
    width: 100%;
    bottom: 0;
    overflow: hidden;
  }
</style>

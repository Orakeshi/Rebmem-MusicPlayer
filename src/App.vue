<template>
  <div class="container">
    <Library title="Library"></Library>
    <Controls></Controls>
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
  html, body{
    padding: 0;
    margin: 0;
  }
</style>

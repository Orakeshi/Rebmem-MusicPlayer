<template>
  <div class="container">
    <Library title="Booey"></Library>
    <Songs :songs="songs"></Songs>
  </div>
</template>

<script>
import Library from './components/Library';
import Songs from './components/Songs';
const fs = window.require("fs")
const testFolder = './src/assets/songs';
console.log(testFolder);
export default {
  name: 'App',
  components: {
    Library,
    Songs,
  },
  data(){
    return {
      songs: []
    }
  },
  created() {
    let test = 1;
    fs.readdir(testFolder, (err, files) => {
      if(err){
        console.log(err);
      }
      else{
        files.forEach(file => {
          let newSong = {
            id: test,
            name: file,
          }
          this.songs.push(newSong);
          test +=1
          console.log(file);
        });
      }
    });
  }
}
</script>

<style>
</style>
<template>
  <div class="library-songs-container">
    <header>
      <h1>{{ title }}</h1>
      <Button text="Hey" color = "green"></Button>
    </header>
    <Songs :songs="songs"></Songs>
  </div>

</template>

<script>
import Button from './Button'
import Songs from './Songs';

const fs = window.require("fs")

const testFolder = './src/assets/songs';
console.log(testFolder);

export default {
  name: 'Library',
  props:  {
    title: String,
  },
  components: {
    Button,
    Songs
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
            audiosrc: testFolder+"/"+file
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

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 10px;
}
.library-songs-container{
  width: 100%;
  height: 100%;
  display: block;
  margin-bottom: 10px;
}
</style>

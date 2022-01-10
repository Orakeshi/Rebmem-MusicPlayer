<template>
  <div class="library-songs-container">
    <header>
      <h1>{{ title }}</h1>
    </header>
    <Songs :songs="songs"></Songs>
    <div class="controls-blocker">

    </div>
  </div>

</template>

<script>
import Button from './Button'
import Songs from './Songs';

const fs = window.require("fs")
const path = window.require("path")

const testFolder = './src/assets/songs';
console.log(testFolder);
// Simple API - will fetch all tags
const jsmediatags = window.require("jsmediatags");


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
    let songId = 1;
    fs.readdir(testFolder, (err, files) => {
      if(err){
        console.log(err);
      }
      else{
        files.forEach(file => {
          if(file.endsWith(".mp3")){
            let newSong = {
              id: songId,
              title: "",
              artist: "",
              audiosrc: path.join(testFolder,'../../../..','src/assets/songs/',file),
              imgdata: ""
            }
            console.log(path.join(testFolder,'../../../..','src/assets/songs/',file))

            new jsmediatags.Reader(testFolder+"/"+file).setTagsToRead(["title", "artist", "picture", "lyrics"]).read({
              onSuccess: function(tag) {

                let tags = tag.tags;

                let base64String = "";

                for (let i = 0; i < tags.picture.data.length; i++) {
                  base64String += String.fromCharCode(tags.picture.data[i]);
                }
                let dataUrl = "data:" + tags.picture.format + ";base64," + window.btoa(base64String);
                newSong.imgdata = dataUrl
                newSong.title = tags.title;
                newSong.artist = tags.artist;
              },
              onError: function(error) {
                console.log(':(', error.type, error.info);
                newSong.imgdata = "https://blog.sqlauthority.com/wp-content/uploads/2007/06/null-500x259.png"
                newSong.title = file;
                newSong.artist = "N/A";
              }
            });

            this.songs.push(newSong);
            songId +=1
            console.log(file);
          }
          else{
            console.log("Not audio")
          }
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
  background: #485460;
}

#test-img{
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>

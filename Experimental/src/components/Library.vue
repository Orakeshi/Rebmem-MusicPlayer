<template>
  <!-- Library elements -->
  <div class="library-songs-container">
    <Songs :songs="songs"></Songs>
    <div class="controls-blocker">

    </div>
  </div>

</template>

<script>
  // Import VUE component and packages needed
  import Songs from './Songs';

  const fs = window.require("fs")
  const path = window.require("path")

  const songFolder = './src/assets/songs';
  console.log(songFolder);
  // Simple API - will fetch all tags
  const jsmediatags = window.require("jsmediatags");


  export default {
    name: 'Library',
    props:  {
      title: String,
    },
    components: {
      Songs
    },
    data(){
      // Store array of song data
      return {
        songs: []
      }
    },
    created() {
      let songId = 1;
      // Read all files in the given song directory
      fs.readdir(songFolder, (err, files) => {
        if(err){
          console.log(err);
        }
        else{
          // If a file ends with .mp3 add to application
          files.forEach(file => {
            if(file.endsWith(".mp3")){
              let newSong = {
                id: songId,
                title: "",
                artist: "",
                audiosrc: path.join(songFolder,'../../../..','src/assets/songs/',file),
                imgdata: ""
              }
              console.log(path.join(songFolder,'../../../..','src/assets/songs/',file))

              // Use npm jsmediatags package to read song tags
              new jsmediatags.Reader(songFolder+"/"+file).setTagsToRead(["title", "artist", "picture"]).read({
                onSuccess: function(tag) {

                  let tags = tag.tags;

                  let base64String = "";

                  try {
                    for (let i = 0; i < tags.picture.data.length; i++) {
                      base64String += String.fromCharCode(tags.picture.data[i]);
                    }
                    newSong.imgdata = "data:" + tags.picture.format + ";base64," + window.btoa(base64String)
                    newSong.title = tags.title;
                    newSong.artist = tags.artist;
                  }
                  catch (err){
                    console.log(err);
                    newSong.imgdata = "https://blog.sqlauthority.com/wp-content/uploads/2007/06/null-500x259.png"
                    newSong.title = file.substring(0, file.length - 4);
                    newSong.artist = "N/A";
                  }
                },
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
/* CSS styles for the library container */
  header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 10px;
  }
  .library-songs-container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background: #485460;
  }

  #test-img{
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>

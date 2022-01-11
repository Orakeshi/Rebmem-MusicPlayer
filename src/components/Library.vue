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
  import mm from 'musicmetadata'

  const fs = window.require("fs")
  const path = window.require("path")
  const os = window.require("os").homedir()

  //const songFolder = './src/assets/songs';
  const songFolder = path.join(os, 'Music')
  //const songFolder = app.getPath('music')
  console.log(songFolder);

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
    beforeMount()
    {
      let songId = 1;
      // Read all files in the given song directory
      fs.readdir(songFolder, (err, files) => {
        if(err){
          console.log(err);
        }
        else{
          // If a file ends with .mp3 add to application
          files.forEach(file => {
            if(file.endsWith(".mp3")) {
              let newSong = {
                id: songId,
                title: "",
                artist: "",
                audiosrc: file,
                imgdata: ""
              }
              console.log(path.join(songFolder,'/',file))
              // create a new parser from a node ReadStream
              mm(fs.createReadStream(songFolder+"/"+file), function (err, metadata) {
                if (err) throw err;
                console.log(metadata);
                try {
                  if (metadata.picture.length > 0) {
                    var picture = metadata.picture[0];
                    newSong.imgdata = URL.createObjectURL(new Blob([picture.data], {'type': 'image/' + picture.format}));
                  }
                  newSong.title = metadata.title;
                  newSong.artist = metadata.artist;

                } catch (err) {
                  console.log(err);
                  newSong.imgdata = "https://blog.sqlauthority.com/wp-content/uploads/2007/06/null-500x259.png"
                  newSong.title = file.substring(0, file.length - 4);
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

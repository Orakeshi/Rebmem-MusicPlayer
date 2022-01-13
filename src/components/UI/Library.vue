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
  import Songs from '../Songs/Songs';
  import mm from 'musicmetadata'

  const fs = window.require("fs")
  const path = window.require("path")
  const os = window.require("os").homedir()

  const songFolder = path.join(os, 'Music')

  //let currentId = 0;

export default {
    name: 'Library',
    props:  {
      title: String,
    },
    components: {
      Songs,
    },
    data(){
      // Store array of song data
      return {
        songs: []
      }
    },
  methods: {

  },
    mounted () {
      this.$emit('songs', this.songs);

      window.addEventListener("load", ()=>{
        //this.PlaySongs()
      })

    },
    beforeMount()
    {
      let songId = 1;
      // Read all files in the given song directory
      fs.readdir(songFolder, (err, files) => {
        if(err){
          console.log(err);
        }
        else {
          // If a file ends with .mp3 add to application
          files.forEach(file => {
            if (file.endsWith(".mp3")) {
              let newSong = {
                id: "",
                title: "",
                artist: "",
                audiosrc: file,
                imgdata: ""
              }
              newSong.id = "library"+songId
              // create a new parser from a node ReadStream
              mm(fs.createReadStream(songFolder + "/" + file), function (err, metadata) {
                if (err) throw err;



                let cont = document.getElementById(newSong.id);
                let allImg = cont.getElementsByTagName('img');
                let allP = cont.getElementsByTagName('p');

                if (metadata.picture.length > 0) {
                  var picture = metadata.picture[0];

                  newSong.imgdata = URL.createObjectURL(new Blob([picture.data], {'type': 'image/' + picture.format}));
                  //console.log(newSong.imgdata)
                  newSong.title = metadata.title;
                  newSong.artist = metadata.artist;
                } else {
                  // Set images
                  console.log(err);
                  newSong.imgdata = "../images/Large-Logo.png";
                  newSong.title = file.substring(0, file.length - 4);
                  newSong.artist = "N/A";
                }
                // Set Images
                allImg[0].setAttribute("src", newSong.imgdata)
                // Set Names
                allP[0].innerHTML = newSong.title;
              });
              this.songs.push(newSong);
              songId += 1
            }
          });
        }
      })
    },
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

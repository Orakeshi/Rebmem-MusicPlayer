<template>
  <div class="song">
    <div class="song-img">
<!--      <img :src="image">-->
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png">
    </div>

    <div class="song-name" id="song-name-container">
      <p>{{ song.name }}</p>
    </div>
    <!--<h3>{{ song.text }}</h3>-->
  </div>

</template>

<script>
/*import image from "./public/images/placeholder-song.png"*/

export default {
  name: "Song",
  props: {
    song: Object
  },
  /*data: function (){
    return {
      image: image
    }
  }*/
}
</script>

<style scoped>
.song {
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  background: grey;
  /*
  margin: 5px;
  padding: 10px 20px;
   */
  cursor: pointer;
  border: 1px solid red;
}
.song h3 {

}
.song-img{
  position: relative;
  width: 100%;
  height: 75%;
  flex-grow : 1;
}
.song-img img{
  height: 100%;
  width: 100%;
}

.song-name {
  position: relative;
  bottom: 0;
  border: blue 1px solid;
  height: 25%;
  width: 100%;
  text-align: center;
}

.song-name p{
  position: relative;
  font-size: large;
  border: 1px solid green;
  margin: 0;
  height: 100%;
  width: 100%;
  text-align: center;
}


</style>
<template>
  <button @click="onClick()" :style="{background: color}" class="btn">{{ text }}</button>
</template>

<script>
if (window && window.require) {
  console.log("IN HERE DOING THAT ")
}
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
  },
  methods: {
    onClick(){
      const fs = window.require("fs")
      // Import the filesystem module
      const testFolder = './src/assets/songs/songs.json';
      console.log(testFolder);
      fs.readdir(testFolder, (err, files) => {
        if(err){
          console.log(err);
        }
        else{
          files.forEach(file => {
            console.log(file);
          });
        }
      });
    }
  },
}
</script>

<style scoped>
</style>
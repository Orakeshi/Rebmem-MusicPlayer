<!--
Rebmem Muisc Player
-->
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://solarflarestudio.co.uk/">
    <img src="https://i.imgur.com/hm4WzVU.png" alt="logo" width="250" height="90">
  </a>

<h3 align="center">Rebmem Music Application</h3>

  <p align="center">
    This is a music player built using electron for Rebmems hardware
    <br />
    <a href=""><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="">View Demo</a>
    ·
    <a href="https://github.com/Orakeshi/Rebmem-MusicPlayer/issues">Report Bug</a>
    ·
    <a href="https://github.com/Orakeshi/Rebmem-MusicPlayer/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <a href="#application-showcase">Application Showcase</a>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#songs-tags">Songs Tags</a></li>
        <li><a href="#things-to-know">Things To Know</a></li>
      </ul>
    </li>
    <li><a href="#steps-to-use">Steps To Use</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#development-steps">Development Steps</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT 1-->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://i.imgur.com/jV8K5GJ.png)

### Application Showcase
<img src="https://i.imgur.com/HkIOtuI.gif">

This project was created for Rebmems hardware. The development was carried out over a deadline of 5 days. The application supports the typical functionality you would expect from a music player. Play, Pause, Seeking, Volume adjustment and more are all supported.

Tech Used:
* Electron - Used to create an application using web technologies
* Vue - Used as the framework for development

### Built With

These are all the frameworks & programming languages that were used
* [Electron](https://www.electronjs.org/)
* [Vue](https://vuejs.org/)
* [JavaScript](https://www.javascript.com/)


<!-- GETTING STARTED -->
## Getting Started

Below will show you how to get the application up and running on your local machine from this repository

### Installation

1. [Download](https://drive.google.com/drive/folders/1DFvbXwa7F_X_LCdHoX6wCTutMVS9HHas?usp=sharing) the latest build from GDrive  
   OR  
   1.1. [Download](https://github.com/Orakeshi/Rebmem-MusicPlayer/archive/refs/heads/main.zip) the repo OR Clone the repo
   ```sh
   git clone https://github.com/Orakeshi/Rebmem-MusicPlayer.git
   ```

### Prerequisites

#### Songs Root Folder
1. You will need to make sure you have a "Music" folder in the route of your machine
2. This is where the application will pull the song data from
``` 
"C:\users\xxx\Music"
```
4. Image of the folder on a MacBook  
   ![image](https://i.imgur.com/B0StJmk.png)
5. Make sure that ANY song you want to listen to on the application is placed in the Music folder for either Mac Or Window

#### Songs Tags
1. The application provides images and song names by scraping the song metadata of an MP3.
   1. If your song is showing a default Rebmem logo as the image, it means your song doesnt have sufficient tag data to scrape
2. If your song doesnt have metadata you can provide metadata yourself via this link:
   https://overbits.herokuapp.com/mp3tageditor/
![image](https://i.imgur.com/mK8biU8.png)
### Things to know

If you have masses of songs, the application may experience CPU spikes whilst displaying the metadata

Any Songs without metadata will be given default tags

Only MP3 music format will be recognised

## Steps to use
1. Store any songs in your Music directory at the root of your OS
2. Open the application
3. Enjoy your music
<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/Orakeshi/Rebmem-MusicPlayer/issues) for a list of proposed features (and known issues).


<!-- CONTACT -->
## Contact

Orakeshi (Tommy) - tommy@solarflarestudio.co.uk

Project Link: [https://github.com/Orakeshi/Rebmem-MusicPlayer](https://github.com/Orakeshi/Rebmem-MusicPlayer)

[product-screenshot]: https://i.imgur.com/jV8K5GJ.png



# Development Steps

## Project setup -> Must be run
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn electron:serve
```

### Compiles and minifies for production
```
yarn electron:build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

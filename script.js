// console.log("Hello");
let songindex = 0;
let songs = [
    {songName: "On & On",filePath: "songs/0.mp3", coverPath: "covers/1.png"},
    {songName: "Invincible",filePath: "songs/1.mp3",coverPath: "covers/2.png"},
    {songName: "Mortals",filePath: "songs/2.mp3",coverPath: "covers/3.png"},
    {songName: "Shine",filePath: "songs/3.mp3",coverPath: "covers/4.png"},
    {songName: "Sky High", filePath: "songs/4.mp3",coverPath: "covers/5.png"},
    {songName: "Faded Dreams",filePath: "songs/5.mp3",coverPath: "covers/6.png"},
    {songName: "Energy",filePath: "songs/6.mp3",coverPath: "covers/7.png"},
    {songName: "Alone",filePath: "songs/7.mp3",coverPath: "covers/8.png"}
];

 let audioElement = new Audio("songs/0.mp3"); 
 let masterplay = document.getElementById("masterplay");
 let songnamebottom = document.getElementById("songnameletter");
songnamebottom.innerText=songs[0].songName;

 //handling masterplay/play pause
 masterplay.addEventListener("click",function(){
    console.log("masterplay called");
    if(audioElement.paused){
        audioElement.play();
        masterplay.classList.remove("fa-play");
        masterplay.classList.add("fa-pause");
    }else{
        audioElement.pause();
        masterplay.classList.remove("fa-pause");
        masterplay.classList.add("fa-play");
        makeallplay();
    }
 });

//logic for progress bar 
let progressBar = document.getElementById("myprogressBar");
audioElement.addEventListener("timeupdate",() =>{
    console.log("slider");//as audio moves forward slider prints
    if(audioElement.duration){
    let progress = (audioElement.currentTime/audioElement.duration)*100;
    progressBar.value = progress;  
    }
});

//logic for slider to move whereever i place
progressBar.addEventListener("input" , () =>{
    audioElement.currentTime = (progressBar.value*audioElement.duration)/100;
});
//we are making a event on progressBar so whenever there we  click anywhere on progress bar song should start form there
//input listener means it runs whenever slider changes
 
//logic for each changing songname and image with javascript
let songitems = Array.from(document.getElementsByClassName("songItem"));
songitems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//logic for each play pause
let songplaybuttons = document.getElementsByClassName("playsongList");
// console.log(songplaybuttons.length);

const makeallplay=()=>{
    Array.from(songplaybuttons).forEach((element)=>{
        console.log("button called");
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
    })
}
Array.from(songplaybuttons).forEach((element) =>{
    console.log("new song played");
    element.addEventListener("click", function(e) {
       console.log("clicked");
       makeallplay();
       songindex = parseInt(e.target.id);
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
       audioElement.src = `songs/${songindex}.mp3`;
       audioElement.currentTime=0;
       audioElement.play();
       masterplay.classList.remove("fa-play");
        masterplay.classList.add("fa-pause");
        console.log(songindex);
        songnamebottom.innerText=songs[songindex].songName;
    });
});

//logic for next 
let forward = document.getElementById("next");
forward.addEventListener("click", ()=>{
    console.log("next played");
    if(songindex>=7){
        songindex = 0;//because we do not need to know target we directly update songindex with numbers
    
    }else{
        songindex = songindex+1;
    }
       audioElement.src = `songs/${songindex}.mp3`;
       audioElement.currentTime=0;
       audioElement.play();
       masterplay.classList.remove("fa-play");
        masterplay.classList.add("fa-pause");
        songnamebottom.innerText = songs[songindex].songName;

});

//logic for prev
let prev = document.getElementById("back");

prev.addEventListener("click",()=>{
    console.log("prev played");
    if(songindex<=0){
        songindex=7;
        
    }else{
        songindex=songindex-1;
    }
       audioElement.src = `songs/${songindex}.mp3`;
       audioElement.currentTime=0;
       audioElement.play();
       masterplay.classList.remove("fa-play");
        masterplay.classList.add("fa-pause");
        songnamebottom.innerText = songs[songindex].songName;    
});



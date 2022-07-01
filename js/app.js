////////////////////////////////
// Global Variables Here
const onePlayer = document.querySelector('#one-player');
const twoPlayers = document.querySelector('#two-player');

////////////////////////////////
// Functions For Game Logic Here



////////////////////////////////
// Event Listeners Here


onePlayer.addEventListener("mouseover",()=>{
    onePlayer.style.fontSize = "x-large";


})

onePlayer.addEventListener('mouseout',()=>{
    onePlayer.style.fontSize = "15px";
    })
    
twoPlayers.addEventListener("mouseover",()=>{
    twoPlayers.style.fontSize = "x-large";

})
twoPlayers.addEventListener('mouseout',()=>{
    twoPlayers.style.fontSize = "15px";
    })


////////////////////////////////

//grab needed html tags
const gridSpots = document.querySelectorAll('.grid');
const turnTracker = document.querySelector('#turn');
const banner = document.querySelector('#banner');

//declare a turn tracker to check for ties
let numOfTurns = 0;

//declare a win boolean to clear game when true
let win = false;

//playerOne object contains all player's information
const playerOne = {
    marker: 'X',
    currentScore: 0,
    score: document.querySelector('#player-one-score'),
    turn: true,
    markedSpots: [],
}

//comp object contains all of the computer's information
const comp = {
    marker: 'O',
    currentScore: 0,
    score: document.querySelector('#player-two-score'),
    turn: false,
    markedSpots: [],
}

//function that checks for a winner
//conditional statement is used to check the player's marked choices against the winning combos as well as the comp's marked space.
//when neither are met checkForTie function is called
const checkWinner =()=>{
    //declare empty variable to store banner content
    let content = null;

    //an array containing multiple arrays. each with a different winning combo
    const winningCombos = [[0,1,2],
                            [0,3,6],
                            [0,4,8],
                            [1,4,7],
                            [2,5,8],
                            [2,4,6],
                            [3,4,5],
                            [6,7,8]];

    //this if statement checks player's marked spots with the winning combos
    //this will only run if the players marked spots contain one of the winning combos
    if(winningCombos[0].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[1].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[2].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[3].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[4].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[5].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[6].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[7].every(spot => playerOne.markedSpots.includes(spot))){
        win = true;
        content = 'Player Wins!';
        playerOne.currentScore++;
        playerOne.score.innerText = playerOne.currentScore;
        displayBanner(content);
        stop();

    //this else if statement checks comp's marked spots with the winning combos
    //this will only run if the comp's marked spots contain one of the winning combos
    }else if(winningCombos[0].every(spot => comp.markedSpots.includes(spot))||winningCombos[1].every(spot => comp.markedSpots.includes(spot))||winningCombos[2].every(spot => comp.markedSpots.includes(spot))||winningCombos[3].every(spot => comp.markedSpots.includes(spot))||winningCombos[4].every(spot => comp.markedSpots.includes(spot))||winningCombos[5].every(spot => comp.markedSpots.includes(spot))||winningCombos[6].every(spot => comp.markedSpots.includes(spot))||winningCombos[7].every(spot => comp.markedSpots.includes(spot))){
        content = 'Computer Wins!';
        win = true;
        comp.currentScore++;
        comp.score.innerText = comp.currentScore;
        displayBanner(content);
        stop();
    
    //this else statement will check for ties.
    //this will only run if the if and else if statement above are false;
    }else{
        content =  `It's a Tie!`;
        checkForTie(content);
    }
}

//function that checks for ties
//increases numOfTurns by 1 
//checks if num of turns equals 9. if so there is a tie
const checkForTie =(content)=>{
    //num of turns increased by 1 everytime the function is called
    numOfTurns++;

    //when num of turns equals 9 there is a tie
    if(numOfTurns===9){
        win = true
        displayBanner(content)
        stop();
    }
}

//function to display banner
//function recieves content as a parameter and assigns it to the banner's innerText
//banner's opacity is changed to 1 to make it visible
const displayBanner =(content)=>{
    banner.innerText = content;
    banner.style.opacity = '1';
}

//stops the game
//sets player's and comp's turn to false so no more spots can be selected
const stop =()=>{
    playerOne.turn = false;
    comp.turn = false;
}

//sets players turn to true and comps turn to false
//changes the inner text of the turntracker to P1
const playerOnesTurn =()=>{
    playerOne.turn = true;
    comp.turn = false;
    turnTracker.innerText = 'P1';  
}

//sets comps turn to true and players turn to false
//changes the inner text of the turntracker to comp
const compsTurn =()=>{
    playerOne.turn = false;
    comp.turn = true;
    turnTracker.innerText = 'COMP';
}

//changes banners opacitiy to 0 so it no longer is visible
//resets numOfTurns to 0 and win to false
//clears the board, players and comps marked spots
//uses conditional statement to determine next player's turn. who ever is loosing goes first.
//uses conditional statement to check if comp is going first. if so compChooses function is called;
const clear =()=>{
    banner.style.opacity = '0';
    numOfTurns = 0;
    win = false;

    for(let i=0; i<gridSpots.length; i++){
        gridSpots[i].innerText = null;
    }

    if(playerOne.currentScore > comp.currentScore){
        compsTurn();
    }else if(playerOne.currentScore < comp.currentScore){
        playerOnesTurn();
    }else {
        let randNum = Math.floor(Math.random()*2)
        if(randNum === 0){
            playerOnesTurn();
        }else if(randNum === 1){
            compsTurn();
        }else{
            console.log('Computing Error!'
            );
        }}

    for(i=0; i<playerOne.markedSpots.length; i++){
        playerOne.markedSpots[i] = null;
    }
    for(i=0; i<comp.markedSpots.length; i++){
        comp.markedSpots[i] = null;
    }
    
    if(comp.turn === true && playerOne.turn === false){
        let timeout = setTimeout(compChooses, 500);
    }
}


//generates a random number 0-9 to use as index 
//uses a conditional statement to check if the gridspot with the index generated is empty
//if empty the spot is marked with comps marker, checks for winner, sets to players turn
//if not empty the compChooses function is called again to repeat the process until it chooses an empty spot.
const compChooses =()=>{
    let randNum = Math.floor(Math.random()*9);
    if(gridSpots[randNum].innerText !== playerOne.marker && gridSpots[randNum].innerText !== comp.marker){
        if(playerOne.turn === false && comp.turn === true){
        gridSpots[randNum].innerText = comp.marker;
        comp.markedSpots.push(randNum);
        checkWinner();}
        playerOnesTurn();}else{
            compChooses();
        }


}

//uses a for loop to add an event listener to all grid divs
//uses conditional statement to check if anyone has won. 
//if win is false another conditional statement is ran to check if the spot selected is empty.
    //if the spot selected is empty. player's marker is places in the innerText of the div selected,checks for winner, sets to comps turn
    //if the spot is not empty user is prompted to choose another spot;
//if win is true the clear function is ran and the game resets keeping the scoreboard going.
for(let i=0; i<gridSpots.length; i++){
    gridSpots[i].addEventListener('click',()=>{
        if(win === false){
        if(gridSpots[i].innerText !== playerOne.marker && gridSpots[i].innerText !== comp.marker){
        if(playerOne.turn === true && comp.turn === false){
        gridSpots[i].innerText = playerOne.marker;
        playerOne.markedSpots.push(i);        
        compsTurn();
        checkWinner();
        } let timeout = setTimeout(compChooses,500);
        }
        else{
            alert('Choose another spot');
        }}else if(win === true){
            clear();}})}

//grab needed html tags
const gridSpots = document.querySelectorAll('.grid');
const turnTracker = document.querySelector('#turn');
const banner = document.querySelector('#banner');

//declare a turn tracker to check for ties
let numOfTurns = 0;

//declare a win boolean to clear game when true
let win = false;

//playerOne object contains all player One's information
const playerOne = {
    marker: 'X',
    currentScore: 0,
    score: document.querySelector('#player-one-score'),
    turn: true,
    markedSpots: [],
}

//playerTwo object contains all player Two's information
const playerTwo = {
    marker: 'O',
    currentScore: 0,
    score: document.querySelector('#player-two-score'),
    turn: false,
    markedSpots: [],
}

//function that checks for a winner
//conditional statement is used to check the player ones's marked choices against the winning combos as well as player two's marked space.
//when neither are met checkForTie function is called
const checkWinner =()=>{
    let content = null;
    const winningCombos = [[0,1,2],
                            [0,3,6],
                            [0,4,8],
                            [1,4,7],
                            [2,5,8],
                            [2,4,6],
                            [3,4,5],
                            [6,7,8]];

    if(winningCombos[0].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[1].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[2].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[3].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[4].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[5].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[6].every(spot => playerOne.markedSpots.includes(spot))||winningCombos[7].every(spot => playerOne.markedSpots.includes(spot))){
        win = true;
        content = 'player 1 wins!';
        playerOne.currentScore++;
        playerOne.score.innerText = playerOne.currentScore;
        displayBanner(content);
        stop();
    }else if(winningCombos[0].every(spot => playerTwo.markedSpots.includes(spot))||winningCombos[1].every(spot => playerTwo.markedSpots.includes(spot))||winningCombos[2].every(spot => playerTwo.markedSpots.includes(spot))||winningCombos[3].every(spot => playerTwo.markedSpots.includes(spot))||winningCombos[4].every(spot => playerTwo.markedSpots.includes(spot))||winningCombos[5].every(spot => playerTwo.markedSpots.includes(spot))||winningCombos[6].every(spot => playerTwo.markedSpots.includes(spot))||winningCombos[7].every(spot => playerTwo.markedSpots.includes(spot))){
        content = 'player 2 wins!';
        win = true;
        playerTwo.currentScore++;
        playerTwo.score.innerText = playerTwo.currentScore;
        displayBanner(content);
        stop();
    }else{
        content =  `It's a Tie!`;
        checkForTie(content);
    }
}

//function that checks for ties
//increases numOfTurns by 1 
//checks if num of turns equals 9. if so there is a tie
const checkForTie =(content)=>{
    numOfTurns++;
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
//sets player one's and plaer two's turn to false so no more spots can be selected
const stop =()=>{
    playerOne.turn = false;
    playerTwo.turn = false;
}

//sets players turn to true and comps turn to false
//changes the inner text of the turntracker to P1
const playerOnesTurn =()=>{
    playerOne.turn = true;
    playerTwo.turn = false;
    turnTracker.innerText = 'P1';  
}

//sets players turn to true and comps turn to false
//changes the inner text of the turntracker to P2
const playerTwosTurn =()=>{
    playerOne.turn = false;
    playerTwo.turn = true;
    turnTracker.innerText = 'P2';
}

//changes banners opacitiy to 0 so it no longer is visible
//resets numOfTurns to 0 and win to false
//clears the board, player one's and player two's marked spots
//uses conditional statement to determine next player's turn. who ever is loosing goes first.
const clear =()=>{
    banner.style.opacity = '0';
    numOfTurns = 0;
    win = false;

    for(let i=0; i<gridSpots.length; i++){
        gridSpots[i].innerText = null;
    }
    if(playerOne.currentScore > playerTwo.currentScore){
        playerTwosTurn();
    }else if(playerOne.currentScore < playerTwo.currentScore){
        playerOnesTurn();
    }else {
        let randNum = Math.floor(Math.random()*2)
        if(randNum === 0){
            playerOnesTurn();
        }else if(randNum === 1){
            playerTwosTurn();
        }else{
            console.log('Computing Error!'
            );
        }
    }

    for(i=0; i<playerOne.markedSpots.length; i++){
        playerOne.markedSpots[i] = null;
    }
    for(i=0; i<playerTwo.markedSpots.length; i++){
        playerTwo.markedSpots[i] = null;
    }
    
}


//uses a for loop to add an event listener to all grid divs
//uses conditional statement to check if anyone has won. 
//if win is false another conditional statement is ran to check if the spot selected is empty.
    //if the spot selected is empty. checks which player's turn it is
            //if player one's turn player one's marker is placed
            //if player two's turn player two's marker is placed
        //checks for winner.
    //if the spot is not empty user is prompted to choose another spot;
//if win is true the clear function is ran and the game resets keeping the scoreboard going.
for(let i=0; i<gridSpots.length; i++){
    gridSpots[i].addEventListener('click',()=>{
        if(win === false){
        if(gridSpots[i].innerText !== playerOne.marker && gridSpots[i].innerText !== playerTwo.marker){
        if(playerOne.turn === true && playerTwo.turn === false){
        gridSpots[i].innerText = playerOne.marker;
        playerOne.markedSpots.push(i);
        playerTwosTurn();
        }else if(playerTwo.turn === true && playerOne.turn === false){
            gridSpots[i].innerText = playerTwo.marker;
            playerTwo.markedSpots.push(i);
            playerOnesTurn();
        }
        checkWinner();}else{
            alert('Choose another spot');
        }}else if(win === true){
            clear();}
        }
    )
}


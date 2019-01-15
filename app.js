//generating a list for all of the cards
let allCard = document.querySelectorAll(".card");
let allCards = [...allCard];
console.log(allCards);

//Get elements from html
let deck = document.querySelector(".deck");

let restart = document.querySelector(".restart");

let moves = document.querySelector(".moves");

let stars = document.querySelectorAll(".fa-star");

let move = 0;

let timer = document.querySelector("#timer");

let button = document.querySelector(".play-again");

//Array for opened cards
let openList = [];

//Array for matched cards
let matchList = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randominutesdex;

  while (currentIndex !== 0) {
    randominutesdex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randominutesdex];
    array[randominutesdex] = temporaryValue;
  }

  return array;
}

//Shuffling the cards and starting the game
function startGame() {
  let shuffled = shuffle(allCards);

  //Appends cards to the deck
  let appending = function(item) {
    deck.appendChild(item);
  };

  for (let i = 0; i < shuffled.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(shuffled, appending);
    shuffled[i].classList.remove("open", "show", "match", "no_match");
  }
  matchList.splice(0, 16);
  move = 0;
  moves.innerHTML = move;
}

document.onload = startGame();

//Flipping the cards
//if(!allCards.classList.contains("open") && !allCards.classList.contains("show") && !allCards.classList.contains("match"))
let openedCard = function() {
 /**if (allCards.classList.contains("open") || allCards.classList.contains("show") || allCards.classList.contains("match")) {
    disableClick()
  }**/
  if(!openList.includes(this) ) {
  this.classList.add("open", "show");
  openList.push(this);
  /**if(openList.classList.contains("open show match") {
    function stopClick() {
      for(let allC of allCards) {
        allC.classList.add("stop-event");
      }
    }
  });**/
  
  if (openList.length === 2) {
    countMoves();
    disableClick();
    setTimeout(function() {
      enableClick();
    }, 1000);
    if (openList[0].innerHTML === openList[1].innerHTML /**&& openList[0] !=== openList[1]**/) {
      matchedCards();
    } else if (openList[0].innerHTML != openList[1].innerHTML) {
      noMatch();
    }
  }
}

};


//when cards match
function matchedCards() {
  openList[0].classList.remove("open", "show");
  openList[0].classList.add("match");
  openList[1].classList.remove("open", "show");
  openList[1].classList.add("match");
  matchList.push(openList[0]);
  matchList.push(openList[1]);
  openList.splice(0, 2);
}

//when cards don't match
function noMatch() {
  openList[0].classList.replace("show", "no_match");
  openList[1].classList.replace("show", "no_match");
  setTimeout(function() {
    openList[0].classList.remove("open", "no_match");
    openList[1].classList.remove("open", "no_match");
  }, 1100);
  setTimeout(function() {
    openList.splice(0, 2);
  }, 1200);
}

//Disables click event on cards
function disableClick() {
  for (let x = 0; x < allCards.length; x++) {
    allCards[x].classList.add("stop-event");
  }
}

//Enables click event on cards
function enableClick() {
  for (let x = 0; x < allCards.length; x++) {
    allCards[x].classList.remove("stop-event");
  }
}

//Counts player's moves and starts timer
function countMoves() {
  move++;
  moves.innerHTML = move;

  //Removes stars after a number of moves
  if (move > 15 && move < 20) {
    for (let i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (move > 20) {
    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}


//timer
let minutes = 0;
let seconds = 0;

function myTimer() {
  if (move) {
    timer.innerHTML = minutes + " minutes " + seconds + " second";
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
  }
}

//Starts the timer
let startTimer = setInterval(function() {
  myTimer();
}, 1000);

//Creates the modal
let modalAppear = function() {
  if (matchList.length == 16) {
    clearInterval(startTimer);

    let timinutesg = timer.innerHTML;
    let starNumber = document.querySelector(".stars").innerHTML;

    document.querySelector("#end-popup").style.display = "block";
    document.querySelector(".total-moves").innerHTML = move;
    document.querySelector(".total-time").innerHTML = timinutesg;
    document.querySelector(".total-stars").innerHTML = starNumber;

    closeEnd();
  }
};

//Closes the end
function closeEnd() {
  button.addEventListener("click", function() {
    document.querySelector("#end-popup").style.display = "none";
    startGame();
    for (let i = 0; i < stars.length; i++) {
      stars[i].style.visibility = "visible";
    }

    minutes = 0;
    seconds = 0;
    setInterval(function() {
      myTimer();
    }, 1000);
  });
}

//FLipping the cards
for (let x = 0; x < allCards.length; x++) {
  allCards[x].addEventListener("click", openedCard);
  allCards[x].addEventListener("click", modalAppear);
}

//Restarting the game
restart.addEventListener("click", function() {
  startGame();
  for (let i = 0; i < stars.length; i++) {
    stars[i].style.visibility = "visible";
  }
  minutes = 0;
  seconds = 0;
});

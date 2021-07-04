let transitioned = false;
let playerScore = 0;
let computerScore = 0;
let round = 0;
const names = ["Maya", "Mahmoud"];

//On click store the selectedOpp in a var and transition
let selectedOpponent;
function AddOppEventListeners()
{
  const opponents = document.querySelectorAll(".opponent");
  opponents.forEach(function(opponent)
{
  opponent.addEventListener("click", function()
  {
    if (!transitioned)
    {
      document.querySelector("#choose-opponent").style.opacity = "0";
      selectedOpponent = opponent;
      window.setTimeout(() => document.querySelector("#choose-opponent").remove(), 500);
      TransitionToGame();
    }
  });
});
}
AddOppEventListeners();

let playerImg = document.querySelector("#player-img").children[0];
function TransitionToGame()
{
  transitioned = true;
  document.querySelector("#game").classList.toggle("disabled");

  //Changes the opponent image to the selected one
  playerImg.src = selectedOpponent.children[0].children[0].src;
}

function AddOppInput()
{
  let userInput = prompt("What do you want?");
  userInput = userInput.toLowerCase();
  userInput = userInput.charAt(0).toUpperCase() + userInput.slice(1);
  names.forEach((name) =>
  {
    if (userInput === name) 
    {
      AddNewOpponent(userInput);
    }
  });
}

window.addEventListener("keydown", (e) =>
{
  if (e.keyCode === 192)
  {
    AddOppInput();
  }
});

document.querySelector("#AddOpp").addEventListener("click", () =>
{
  AddOppInput();
});

function AddNewOpponent(name)
{
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("opponent") ;

  let figure = document.createElement("figure");
  let oppImage = document.createElement("img");
  oppImage.src = "images/opponents/" + name + ".png";
  let oppName = document.createElement("figcaption");
  oppName.innerText = name;
  oppName.classList.add("opponent-name");

  figure.appendChild(oppImage);
  figure.appendChild(oppName);
  mainDiv.appendChild(figure);
  document.querySelector("#opponents").appendChild(mainDiv);

  AddOppEventListeners();
}

let computerSelectionURL;
const ComputerSelection = function()
{
  let index = Math.floor(Math.random() * 3);
  const choices = ["Rock", "Paper", "Scissors"];
  const choicesURL = ["images/Computer-Rock.png", "images/Computer-Paper.png", "images/Computer-Scissors.png"]
  console.log(index, choices[index], choicesURL[index]);
  let choice = choices[index];
  computerSelectionURL = choicesURL[index];
  return choice;
}


const playerChoices = document.querySelectorAll(".rps-choice");
playerChoices.forEach((choice) =>
{
  choice.addEventListener("click", () =>
  {
    let playerChoice = choice.id;

    document.querySelector("#player-choice").querySelector("img").src = choice.querySelector("img").src;
    document.querySelector("#player-choices").classList.toggle("disabled");
    PlayRound(playerChoice)
  });
});

//text is the text at the bottom of the page
const text = document.querySelector("#text").querySelector("p");
const playerScoretxt = document.querySelector("#player-score-text-p");
const opponentScoretxt = document.querySelector("#opponent-score-text").children[1];
function ResetRound()
{
  document.querySelector("#player-choice").querySelector("img").src = "images/Transparent.png";
  document.querySelector("#player-choices").classList.toggle("disabled");
  document.querySelector("#opponent-choice").querySelector("img").src = "images/Transparent.png"
  text.innerText = "";
}

function PlayRound(_playerSelection)
{
  console.log(opponentScoretxt);
  let _computerSelection = ComputerSelection();
  document.querySelector("#opponent-choice").querySelector("img").src = computerSelectionURL;

  if (_playerSelection === "Rock")
  {
    if (_computerSelection === _playerSelection)
    {
      text.innerText = ("Tie.");
      playerScoretxt.innerText = playerScore;
      opponentScoretxt.innerText = computerScore;
    }
    else if (_computerSelection === "Scissors")
    {
      playerScore++;
      text.innerText = ("You win this round! Fuck you AI.");
      playerScoretxt.innerText = playerScore;
      opponentScoretxt.innerText = computerScore;
    }
    else if (_computerSelection === "Paper")
    {
      computerScore++;
      text.innerText = ("Fuck. You lost this one, champ.");
      playerScoretxt.innerText = playerScore;
      opponentScoretxt.innerText = computerScore;
    }
  }
  else if (_playerSelection === "Scissors")
  {
    if (_computerSelection === _playerSelection)
    {
      text.innerText = ("Tie.");
      playerScoretxt.innerText = playerScore;
      opponentScoretxt.innerText = computerScore;
    }
    else if (_computerSelection === "Rock")
    {
      computerScore++;
      text.innerText = ("Fuck. You lost this one, champ.");
      playerScoretxt.innerText = playerScore;
      opponentScoretxt.innerText = computerScore;
    }
    else if (_computerSelection === "Paper")
    {
      playerScore++;
      text.innerText = ("You win this round! Fuck you AI.");
      playerScoretxt.innerText = playerScore;
      opponentScoretxt.innerText = computerScore;
    }
  }
  else if (_playerSelection === "Paper")
  {
    if (_computerSelection === _playerSelection)
    {
      text.innerText = ("Tie.");
      playerScoretxt.innerText = playerScore;
      opponentScoretxt.innerText = computerScore;
    }
    else if (_computerSelection === "Rock")
    {
      playerScore++;
      text.innerText = ("You win this round! Fuck you AI.");
      playerScoretxt.innerText = playerScore;
      opponentScoretxt.innerText = computerScore;
    }
    else if (_computerSelection === "Scissors")
    {
      computerScore++;
      text.innerText = ("Fuck. You lost this one, champ.");
      playerScoretxt.innerText = playerScore;
      opponentScoretxt.innerText = computerScore;
    }
  }
  round++;
  document.querySelector("#round-text-p").innerText = round;

  if (playerScore < 5 && computerScore < 5)
  {
    window.setTimeout(() => ResetRound(), 2500);
  }
  else if (playerScore === 5)
  {
    text.innerText = "Ayyyy. You won!"
  }
  else
  {
    text.innerText = "You lost to a fucking computer, bruv."
  }
}

var images = new Array()
function preload() {
  for (i = 0; i < preload.arguments.length; i++) {
    images[i] = new Image()
    images[i].src = preload.arguments[i]
  }
}
preload(
  "images/Computer-Rock.png",
  "images/Computer-Paper.png",
  "images/Computer-Scissors.png"
)

//5 Round Game Function
// function game()
// {
//   for (let i = 0; i < 5; i++)
//   {
//     playRound();
//   }

//   if (playerScore > computerScore)
//   {
//     console.log("Player won!");
//   }
//   else
//   {
//     console.log("Computer won!");
//   }
// }
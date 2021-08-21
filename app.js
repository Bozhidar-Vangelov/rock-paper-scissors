const icons = Array.from(document.querySelectorAll(".icon-image"));
const message = document.querySelector(".message");
const computerSelection = computerPlay();
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");
const playAgainButton = document.querySelector(".play-again");

let playerWins = 0;
let computerWins = 0;

message.textContent = "Please pick up an option!";
playAgainButton.style.display = "none";

icons.forEach((icon) => {
  icon.addEventListener("click", () => {
    if (playerWins >= 5 || computerWins >= 5) {
      return;
    }
    game(icon.id);
  });
});

playAgainButton.addEventListener("click", () => {
  playerWins = 0;
  computerWins = 0;
  playerScore.textContent = 0;
  computerScore.textContent = 0;
  message.textContent = "Please pick up an option!";
  playAgainButton.style.display = "none";
});

function computerPlay() {
  let option = "";
  let randomizer = Math.floor(Math.random() * 3) + 1;

  if (randomizer === 1) {
    option = "rock";
  } else if (randomizer === 2) {
    option = "paper";
  } else {
    option = "scissors";
  }
  return option;
}

function playRound(playerSelection, computerSelection) {
  let message = "";

  if (
    playerSelection !== "rock" &&
    playerSelection !== "paper" &&
    playerSelection !== "scissors"
  ) {
    message = `${playerSelection} is an invalid option, please try again`;
  } else if (
    (playerSelection == "rock" && computerSelection == "scissors") ||
    (playerSelection == "scissors" && computerSelection == "paper") ||
    (playerSelection == "paper" && computerSelection == "rock")
  ) {
    playerWins++;
    message = `You win! ${playerSelection} beats ${computerSelection}.`;
  } else if (
    (playerSelection === "rock" && computerSelection === "rock") ||
    (playerSelection === "paper" && computerSelection === "paper") ||
    (playerSelection === "scissors" && computerSelection === "scissors")
  ) {
    message = `It's a tie! You picked ${playerSelection} and computer picked ${computerSelection}.`;
  } else {
    computerWins++;
    message = `You lose! ${computerSelection} beats ${playerSelection}.`;
  }

  return message;
}

function game(playerSelection) {
  playerSelection = playerSelection.toLowerCase();
  let result = playRound(playerSelection, computerPlay());
  playerScore.textContent = playerWins;
  computerScore.textContent = computerWins;
  message.textContent = result;

  if (playerWins >= 5 && computerWins < 5) {
    message.textContent = `Congratulations, you won the game! Final score - You: ${playerWins} Computer: ${computerWins}`;
    playAgainButton.style.display = "block";
  } else if (playerWins < 5 && computerWins >= 5) {
    message.textContent = `You lost :[ Final score: You: ${playerWins} Computer: ${computerWins}`;
    playAgainButton.style.display = "block";
  } else if (
    playerWins === computerWins &&
    playerWins >= 5 &&
    computerWins >= 5
  ) {
    message.textContent = `It's a tie! Final score: You: ${playerWins} Computer: ${computerWins}`;
    playAgainButton.style.display = "block";
  }
}

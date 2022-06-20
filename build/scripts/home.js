const colors = ["rgba(72, 224, 100", "rgba(241, 91, 94", "rgba(72, 151, 242"];

const shadowPosition = [
  ", 0.56) 0px 22px 70px 4px",
  ", 0.56) 0px 22px 70px 4px",
  ", 0.56) 0px 22px 70px 4px",
];

const games = document.querySelectorAll(".game");
const imgs = document.querySelectorAll(".game-img");
const gameTitle = document.querySelectorAll(".game-title");

// Add event listener to each of the game covers.
for (let i = 0; i < games.length; i++) {
  // remove grey scale on mouseenter and add color according to game
  games[i].addEventListener("mouseenter", () => {
    imgs[i].style.webkitFilter = "grayscale(0)";
    imgs[i].style.filter = "grayscale(0)";
    games[i].style.boxShadow = `${colors[i]}${shadowPosition[i]}`;
    gameTitle[i].style.color = `${colors[i]})`;
  });
  // switch game list content to grey when not selected or mouseleave
  games[i].addEventListener("mouseleave", () => {
    imgs[i].style.webkitFilter = "grayscale(1)";
    imgs[i].style.filter = "grayscale(1)";
    games[i].style.boxShadow = "none";
    gameTitle[i].style.color = "white";
  });
}

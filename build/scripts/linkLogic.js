const form = document.querySelector("#searchForm");

// All Possible Types w/ Color Hex Values
const typeColor = {
  ground: "#b59469",
  water: "#0037ff",
  fire: "#ff2a00",
  grass: "#0b7026",
  ghost: "#310273",
  dragon: "#964ef5",
  steel: "#8a8888",
  fairy: "#b569b4",
  psychic: "#f781ef",
  normal: "#e3d8ca",
  fighting: "#800c04",
  flying: "#c5b8e3",
  dark: "#0f0f1f",
  electric: "#ffee00",
  poison: "#772ff5",
  ice: "#14bbe0",
  rock: "#AE964D",
};

// --------------

const rgbas = {
  ground: "rgba(181, 148, 105,",
  water: "rgba(0, 55, 255,",
  fire: "rgba(255, 42, 0,",
  grass: "rgba(11, 112, 38,",
  ghost: "rgba(49, 2, 115,",
  dragon: "rgba(150, 78, 245,",
  steel: "rgba(138, 136, 136,",
  fairy: "rgba(181, 105, 180,",
  psychic: "rgba(247, 129, 239,",
  normal: "rgba(227, 216, 202,",
  fighting: "rgba(128, 12, 4,",
  flying: "rgba(197, 184, 227,",
  dark: "rgba(15, 15, 31,",
  electric: "rgba(255, 238, 0,",
  poison: "rgba(119, 47, 245,",
  ice: "rgba(20, 187, 224,",
  rock: "rgba(174, 150, 77,",
};

const card = document.querySelector(".rect");
const displayTypeOne = document.querySelector("#type");

// ---------

const displayTypeTwo = document.querySelector("#type-two");

// Function for handling form submit event
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchTerm = form.elements.query.value.toLowerCase();
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const res = await axios.get(`${url}${searchTerm}`);
  displayTypeTwo.style.display = "none";
  makeCard(res);
  form.elements.query.value = "";
  document.querySelector(".result-text").style.display = "block";
});

// Function displayiong card w/ information
const makeCard = (res) => {
  // const card = document.querySelector(".rect");
  displayImg(res);
  displayName(res);
  displayDexNum(res);
  displayType(res);
  displayDesc(res);
  // add shadow color of the card to the first type of pokemon
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = `${
      rgbas[displayTypeOne.innerHTML]
    } 0.56) 0px 22px 70px 4px`;
  });
  // remove the shadow color of card when the mouse leaves
  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "none";
  });
  card.style.display = "flex";
};

// Function for displaying pokemon name on card
const displayName = (res) => {
  const pokeName = document.querySelector("#pokemon-name");
  pokeName.innerHTML = `${
    res.data["name"].charAt(0).toUpperCase() + res.data["name"].slice(1)
  }`;
};

// function for displaying pokedex number
const displayDexNum = (res) => {
  const dexNum = document.querySelector("#dex-number");
  dexNum.innerHTML = `#${res.data["game_indices"][8]["game_index"]}`;
};

// function for displaying the pokemon image
const displayImg = (res) => {
  const img = document.querySelector("#pokemon-img");
  img.src = `${res.data["sprites"]["front_default"]}`;
};

// Function for displaying pokemon type
const displayType = (res) => {
  // const displayTypeOne = document.querySelector("#type");
  const typeOne = res.data["types"][0]["type"]["name"];
  displayTypeOne.innerHTML = typeOne;
  displayTypeOne.style.backgroundColor = typeColor[typeOne];
  displayTypeOne.style.textTransform = "capitalize";
  displayTypeOne.style.color = "black";

  // Avoid displaying error in console when 2nd type does not exist
  try {
    const typeTwo = res.data["types"][1]["type"]["name"];
    if (typeTwo) {
      displayTypeTwo.innerHTML = typeTwo;
      displayTypeTwo.style.backgroundColor = typeColor[typeTwo];
      displayTypeTwo.style.textTransform = "capitalize";
      displayTypeTwo.style.color = "black";
      displayTypeTwo.style.display = "block";
    }
  } catch (error) {
    // catch the error and do nothing
  }
};

// Asynchronous function that makes a call to a different route
// for retrieving the pokemon description
async function displayDesc(res) {
  const specURL = `https://pokeapi.co/api/v2/pokemon-species/`;
  const dexNumber = `${res.data["game_indices"][8]["game_index"]}`;
  const fetchSpec = await axios.get(`${specURL}${dexNumber}`);
  const desc = document.querySelector("#poke-desc");
  desc.innerHTML = fetchSpec.data["flavor_text_entries"][1]["flavor_text"];
}

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a";

const toggle = document.querySelector(".nav-toggle");
const input = document.querySelector("#search-input");
const searchResult = document.querySelector(".search-result");
const filterBtn = document.querySelectorAll(".filter-btn");
let cocktails;

//Navbar toggle button
toggle.addEventListener("click", function (e) {
  const links = e.currentTarget.parentNode.nextElementSibling;
  links.classList.toggle("hidden");
});

// Fetch data from API
async function getCocktails() {
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  cocktails = data.drinks;
  console.log(cocktails);
  renderData(cocktails);
}
getCocktails();

//Rendering data with map
const renderData = function (cocktails) {
  cocktails.map((cocktail) => {
    createCocktails(cocktail);
  });
};

//How each cocktail info will be displayed
const createCocktails = function (cocktail) {
  const cocktailInfo = `
  <div class="cocktail-item">
          <div class="img-wrapper">
            <img
              src=${cocktail.strDrinkThumb}
              alt=""
            />
          </div>
          <div class="cocktail-info">
            <p class="cocktail-name">${cocktail.strDrink}</p>
            <p class="glass">${cocktail.strGlass}</p>
            <p class="cocktail-type">${cocktail.strAlcoholic}</p>
            <button class="details">Details</button>
          </div>
        </div>
  `;
  searchResult.innerHTML += cocktailInfo;
};

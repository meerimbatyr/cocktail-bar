import { toggleBar } from "../toggle.js";

const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;

//select all elements
const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const searchResult = document.querySelector(".search-result");
const btnContainer = document.querySelector(".filter");
const modal = document.querySelector(".modal");
let cocktails;
let singleCocktail;

toggleBar();

window.addEventListener("DOMContentLoaded", function () {
  getCocktails();
});

function loading() {
  searchResult.style.display = "block";
  searchResult.innerHTML = `
  <div class='loading'>
    <img src="https://cutewallpaper.org/21/loading-gif-transparent-background/Bee-Hollow-Farm-beekeeping-classes-and-events-near-Schodack-.gif" alt="loading"/>
  </div>
  `;
}

// Fetch data from API
async function getCocktails() {
  loading();
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  cocktails = data.drinks;
  console.log(cocktails);
  renderData(cocktails);
  displayCategoryBtns(cocktails);
}

//How each cocktail info will be displayed
const createCocktails = function (cocktail) {
  const cocktailInfo = `
  <div class="cocktail-item" id=${cocktail.idDrink}>
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
            <button class="details" data-id=${cocktail.idDrink}>Details</button>
          </div>
        </div>
  `;
  searchResult.innerHTML += cocktailInfo;

  const details = document.querySelectorAll(".details");
  details.forEach((detailBtn) => {
    detailBtn.addEventListener("click", function (e) {
      const id = e.target.dataset.id;
      async function fetchById() {
        const req = await fetch(
          `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await req.json();
        singleCocktail = data.drinks[0];
        showModal(singleCocktail);
      }
      fetchById();
    });
  });
};

//show modal window when clicking on each cocktail details
function showModal(singleCocktail) {
  const list = [
    singleCocktail.strIngredient1,
    singleCocktail.strIngredient2,
    singleCocktail.strIngredient3,
    singleCocktail.strIngredient4,
    singleCocktail.strIngredient5,
  ];
  const modalInfo = `
  <div class='modal-info'>
    <button class="back">Back to Home</button>
        <h1 class="name">${singleCocktail.strDrink}</h1>
        <main>
          <article class="image">
          <img src="${singleCocktail.strDrinkThumb}" alt="drink-pic">
          </article>
          <article class="drink-info">
             <p><span>Name:</span>${singleCocktail.strDrink}</p>
             <p><span>Category:</span>${singleCocktail.strCategory}</p>
             <p><span>Info:</span>${singleCocktail.strAlcoholic}</p>
             <p><span>Glass:</span>${singleCocktail.strGlass}</p>
             <p><span>Instructions:</span>${singleCocktail.strInstructions}</p>
             <p><span>Ingredients:</span>${list
               .map((ingredient) => {
                 if (ingredient) {
                   return ingredient;
                 }
               })
               .join(" ")}</p>
          </article>
        </main>
  </div>
      
  `;
  modal.innerHTML = modalInfo;
  modal.classList.add("open-modal");

  const backBtns = document.querySelectorAll(".back");
  backBtns.forEach((backBtn) => {
    backBtn.addEventListener("click", function () {
      modal.classList.remove("open-modal");
    });
  });
}

//Rendering data with map
const renderData = function (cocktails) {
  searchResult.style.display = "grid";
  searchResult.innerHTML = "";
  cocktails.map((cocktail) => {
    createCocktails(cocktail);
  });
};

//category buttons
function displayCategoryBtns(cocktails) {
  //solution with new Set
  /*  const category = cocktails.map((cocktail) => {
    return cocktail.strCategory;
  });
  const categories = new Set(category);
  categories.add("All");
  console.log(categories);
  for (let category of categories) {
    const categoryBtn = `
      <button class="filter-btn" data-id=${category}>${category}</button>
           `;
    // console.log(categoryBtn);
    btnContainer.innerHTML += categoryBtn;
  } */

  //solution with reduce HOF
  const categories = cocktails.reduce(
    (values, item) => {
      if (!values.includes(item.strCategory)) {
        values.push(item.strCategory);
      }
      return values;
    },
    ["All"]
  );

  categories.map((category) => {
    const categoryBtn = `
      <button class="filter-btn" data-id=${category}>${category}</button>
           `;
    // console.log(categoryBtn);
    btnContainer.innerHTML += categoryBtn;
  });

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((filterBtn) => {
    filterBtn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      console.log(category);
      const cocktailItems = cocktails.filter((cocktailItem) => {
        if (cocktailItem.strCategory.includes(category)) {
          return cocktailItem;
        }
      });
      if (category === "All") {
        console.log(cocktails);
        return renderData(cocktails);
      } else {
        console.log(cocktailItems);
        return renderData(cocktailItems);
      }
    });
  });
}

//Search by name
form.addEventListener("input", function (e) {
  e.preventDefault();
  const value = input.value;
  // searchResult.innerHTML = "";

  //filter cocktails by name
  const filteredByName = cocktails.filter((cocktail) => {
    return cocktail.strDrink.toUpperCase().includes(value.toUpperCase());
  });
  if (filteredByName.length) {
    searchResult.style.display = "grid";
    renderData(filteredByName);
  } else {
    searchResult.style.display = "block";
    searchResult.innerHTML = `<div class="message">No Cocktails Matched Your Search Criteria</div>`;
  }
});

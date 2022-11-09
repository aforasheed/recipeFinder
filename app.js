const appId = "0246b9cf";
const appKey = "5dbba17ed3c6f5f5f723c58addfac866";
const baseUrl =
  "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=0246b9cf&app_key=5dbba17ed3c6f5f5f723c58addfac866";
const recipeContainer = document.querySelector("#recipe-container");
const txtSearch = document.querySelector("#txtSearch");
const btnFind = document.querySelector(".btn");

btnFind.addEventListener("click", () => loadRecipies(txtSearch.value));

txtSearch.addEventListener("keyup", (e) => {
  const inputVal = txtSearch.value;
  if (e.keyCode === 13) {
    loadRecipies(inputVal);
  }
});

const setScrollPosition = () => {
  recipeContainer.scrollTo({ top: 0, behavior: "smooth" });
};

function loadRecipies(type = "panner") {
  const url = baseUrl + `&q=${type}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderRecipies(data.hits))
    .catch((error) => console.log(error));
}

loadRecipies();

const getReipeStepsStr = (ingredientLines) => {
  let str = "";
  for (let step of ingredientLines) {
    str = str + `<li>${step}</li>`;
  }
  return str;
};

const renderRecipies = (recipeList = []) => {
  recipeContainer.innerHTML = "";
  recipeList.forEach((recipeObj) => {
    const {
      label: recipeTitle,
      ingredientLines,
      image: recipeImage,
    } = recipeObj.recipe;
    const recipeStepStr = getReipeStepsStr(ingredientLines);
    const htmlStr = ` <div class="recipe">
        <div class="recipe-title">${recipeTitle}</div>
        <div class="recipe-image">
            <img src="${recipeImage}" alt="recipe">
        </div>
        <div class="recipe-text">
            <ul>
                ${recipeStepStr}
            </ul>
        </div>
    </div>`;
    recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
  });
};

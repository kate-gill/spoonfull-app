const input = document.getElementById('searchInput');
const form = document.getElementById('searchForm');
const btn = document.getElementById('searchBtn');
const h1 = document.getElementById('myH1');
const opening = document.getElementById('opening');
const mainContainer = document.getElementById('mainContainer');
const card = document.getElementById('row');

const appId = config.APP_ID;
const appKey = config.APP_KEY;

//form submition listener
form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (input.value === ''){
      alert('Can\'t be empty!');
  } else {
    searchRecipe(input.value);
  }
});

// search for recipe 
function searchRecipe(item){

  fetch(`https://api.edamam.com/search?q=${item}&app_id=${appId}&app_key=${appKey}`)

  .then(response => response.json())
  .then(function(data) {
  
    const recipes = data.hits;
  
    return recipes.map(function(recipe) {
  
      const div = document.createElement('div');
      div.classList.add('col-xs-12', 'col-lg-6', 'col-xl-4');

      div.innerHTML = `
      <div class="card">
        <div class="card-block info-card">
          <div class="front">
            <img src="${recipe.recipe.image}" class="card-img-top">
            <h5 class="card-title">${recipe.recipe.label}</h5>
          </div>
          <div class="back">
            <div class="card-text">
              <h4>${recipe.recipe.label}</h4>
              <h5 class="cardBack">Ingredients: <h5>
              <h6>${recipe.recipe.ingredientLines}</h6>
              <h5 class="cardBack">Calories: <h5>
              <h6>${recipe.recipe.calories.toFixed()}</h6>
              <h5 class="cardBack">Diet Type: <h5>
              <h6>${recipe.recipe.healthLabels}</h6>
              <a href="${recipe.recipe.shareAs}" target="_blank" class="btn btn-info">Recipe</a>
            </div>
          </div>
        </div>
      </div>
      `;

      card.appendChild(div);
      
      //class toggle for styling in search mode 
      h1.classList.add('hide');
      opening.classList.remove('opening');
      opening.classList.add('searchMode');
      mainContainer.classList.add('backgroundTop');
      input.classList.remove('searchInput');
      input.classList.add('searchInputTop');
      btn.classList.remove('mainBtn');
      btn.classList.add('topBtn');
  
    });
  })
  
  //error handling
  .catch(function(error) {
    alert('Something went wrong... please search again!');
  });   

  input.value = '';
}










document.addEventListener('DOMContentLoaded', function() {
    const recipeForm = document.getElementById('recipeForm');
    const titleInput = document.getElementById('titleInput');
    const ingredientsInput = document.getElementById('ingredientsInput');
    const instructionsInput = document.getElementById('instructionsInput');
    const saveButton = document.getElementById('saveButton');
    const recipeList = document.getElementById('recipeList');
  
    saveButton.addEventListener('click', function() {
      const title = titleInput.value;
      const ingredients = ingredientsInput.value;
      const instructions = instructionsInput.value;
  
      saveRecipe(title, ingredients, instructions);
    });
  
    function saveRecipe(title, ingredients, instructions) {
      fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, ingredients, instructions })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error saving the recipe.');
          }
        })
        .then(data => {
          // Handle the successful response, if needed
          console.log('Recipe saved successfully');
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
    }
    
  
    function displayRecipes() {
      fetch('/api/recipes')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error retrieving recipes.');
        }
      })
      .then(data => {
        // Handle the successful response by rendering the recipes in the UI
        data.forEach(recipe => {
          const recipeElement = document.createElement('div');
          recipeElement.innerHTML = `
            <h3>${recipe.Title}</h3>
            <p>${recipe.Ingredients}</p>
            <p>${recipe.Instructions}</p>`;
          recipeList.appendChild(recipeElement);
        });
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  }

  displayRecipes();
});
    
  
  // Get search form elements
  var searchForm = document.querySelector('#search-recipes form');
  var searchInput = document.querySelector('#search-recipes input[type="text"]');

  // Adding a form submit event listener
  searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default behavior (form submission)
    
    var searchValue = searchInput.value;
    
    // Here you can perform a recipe search and view the results
    console.log('Vyhledávání: ' + searchValue);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipeForm');
    recipeForm.addEventListener('submit', saveRecipe);
  
    // Function to handle form submission
    async function saveRecipe(event) {
      event.preventDefault();
  
      // Get form inputs
      const titleInput = document.getElementById('title');
      const ingredientsInput = document.getElementById('ingredients');
      const instructionsInput = document.getElementById('instructions');
  
      // Create recipe object
      const recipe = {
        title: titleInput.value,
        ingredients: ingredientsInput.value,
        instructions: instructionsInput.value
      };
  
      // Send recipe data to server-side API
      try {
        const response = await fetch('/api/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(recipe)
        });
  
        if (response.ok) {
          // Clear form inputs
          titleInput.value = '';
          ingredientsInput.value = '';
          instructionsInput.value = '';
  
          // Refresh recipe list
          fetchRecipes();
        } else {
          console.error('Failed to save recipe');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    // Fetch recipes from server-side API
    async function fetchRecipes() {
      try {
        const response = await fetch('/api/recipes');
        const data = await response.json();
  
        // Update the UI with the recipe list
        const recipeList = document.getElementById('recipeList');
        recipeList.innerHTML = '';
  
        data.forEach(recipe => {
          const recipeItem = document.createElement('li');
          recipeItem.classList.add('recipe-item');
  
          const title = document.createElement('h3');
          title.textContent = recipe.title;
  
          const ingredients = document.createElement('p');
          ingredients.textContent = recipe.ingredients;
  
          const instructions = document.createElement('p');
          instructions.textContent = recipe.instructions;
  
          recipeItem.appendChild(title);
          recipeItem.appendChild(ingredients);
          recipeItem.appendChild(instructions);
  
          recipeList.appendChild(recipeItem);
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    // Fetch recipes when the page loads
    fetchRecipes();
  });

  //Hamburger menu
  $(document).ready(function() {
  $('#menu-toggle').click(function() {
    $('nav ul').toggle();
    $('nav ul').toggleClass('menu-open');
  });

  $(window).resize(function() {
    if ($(window).width() > 768) {
      $('nav ul').show();
    } else {
      $('nav ul').hide();
      $('nav ul').removeClass('menu-open');
    }
  });
});
const ingredientParser = (recipe) => {
  const ingredients = [];

  for (let key in recipe) {
    if (key.includes('strIngredient') && recipe[key]) {
      ingredients.push([recipe[key]]);
    }
  }

  for (let i = 1; i <= ingredients.length; i++) {
    const measure = `strMeasure${i}`;
    ingredients[i - 1].push(recipe[measure]);
  }

  return ingredients;
};

const ingredientMap = (mealProp) => {
  let ingredientArr = [];
  for (let measurement in mealProp) {
    let ingredient = mealProp[measurement];
    ingredientArr.push([measurement, ingredient]);
  }
  return ingredientArr;
};

module.exports = {
  ingredientParser,
  ingredientMap,
};

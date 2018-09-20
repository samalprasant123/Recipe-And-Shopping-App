import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
          'Chicken roll',
          'Flat bread wrapped chicken and onions',
          'https://upload.wikimedia.org/wikipedia/commons/a/a8/Chicken-kathi-roll-recipe.jpg'),
        new Recipe(
          'Chicken biryani',
          'Rice cooked with chicken',
          'https://upload.wikimedia.org/wikipedia/commons/7/7c/Hyderabadi_Chicken_Biryani.jpg')
    ];

    getRecipes() {
        return this.recipes.slice();
    }



}

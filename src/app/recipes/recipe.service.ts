import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
          'Chicken roll',
          'Flat bread wrapped chicken and onions',
          'https://upload.wikimedia.org/wikipedia/commons/a/a8/Chicken-kathi-roll-recipe.jpg',
          [
            new Ingredient('Wheat', 200),
            new Ingredient('Chicken', 100)
          ]),
        new Recipe(
          'Chicken biryani',
          'Rice cooked with chicken',
          'https://upload.wikimedia.org/wikipedia/commons/7/7c/Hyderabadi_Chicken_Biryani.jpg',
          [
            new Ingredient('Rice', 500),
            new Ingredient('Chicken', 500)
          ])
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
      return this.recipes.slice();
    }

    getRecipeById(index: number) {
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients);
    }

}

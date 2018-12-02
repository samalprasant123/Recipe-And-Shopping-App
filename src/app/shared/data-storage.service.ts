import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable()
export class DataStorageService {

    private databaseRootUrl = 'https://ng-recipe-book-7e555.firebaseio.com/';
    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        const recipeJson = 'recipes.json';
        return this.http.put(this.databaseRootUrl + recipeJson, this.recipeService.getRecipes(), {headers: myHeaders});
    }
}

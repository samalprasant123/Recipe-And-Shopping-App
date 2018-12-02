import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {

    private databaseRootUrl = 'https://ng-recipe-book-7e555.firebaseio.com/';
    private recipeJson = 'recipes.json';

    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http.put(this.databaseRootUrl + this.recipeJson, this.recipeService.getRecipes(), {headers: myHeaders});
    }

    getRecipes() {
        this.http.get(this.databaseRootUrl + this.recipeJson)
            .pipe(
                map(
                    (response: Response) => {
                        const recipes: Recipe[] = response.json();
                        for (const recipe of recipes) {
                            if (!recipe['ingredients']) {
                                console.log(recipe);
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                    }
                )
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}

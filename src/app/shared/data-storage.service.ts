import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

    private databaseRootUrl = 'https://ng-recipe-book-7e555.firebaseio.com/';
    private recipeJson = 'recipes.json';

    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipes() {
        const req = new HttpRequest('PUT',
                            this.databaseRootUrl + this.recipeJson,
                            this.recipeService.getRecipes(),
                            {
                                reportProgress: true
                            });
        return this.httpClient.request(req);
    }

    getRecipes() {
        this.httpClient.get<Recipe[]>(this.databaseRootUrl + this.recipeJson, {
            observe: 'body',
            responseType: 'json'
        })
            .pipe(
                map(
                    (recipes) => {
                        // console.log(recipes);
                        for (const recipe of recipes) {
                            if (!recipe['ingredients']) {
                                console.log(recipe);
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                        // return [];
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

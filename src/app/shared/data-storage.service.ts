import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

    private databaseRootUrl = 'https://ng-recipe-book-7e555.firebaseio.com/';
    private recipeJson = 'recipes.json';

    constructor(private http: Http,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http.put(this.databaseRootUrl + this.recipeJson + '?auth=' + token,
            this.recipeService.getRecipes(),
            {headers: myHeaders});
    }

    getRecipes() {
        const token = this.authService.getToken();
        this.http.get(this.databaseRootUrl + this.recipeJson + '?auth=' + token)
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

import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Recipe 1', 'Recipe 1 Description', 'https://www.flickr.com/photos/soniagoyal/24330115331')
  ];

  constructor() { }

  ngOnInit() {
  }

}

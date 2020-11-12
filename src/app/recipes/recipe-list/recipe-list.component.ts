import {  ActivatedRoute, Router } from '@angular/router';
import { Recipe } from './../recipe.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipes.service';
import { Subscription } from 'rxjs'



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy{

  recipes: Recipe[] =[];

  subcription : Subscription;

  constructor(private recipeService : RecipeService,
    private router : Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.subcription = this.recipeService.recipeChanged.subscribe(
      (recipes : Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();

  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy(){
    this.subcription.unsubscribe();
  }

}

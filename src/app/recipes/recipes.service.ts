import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Injectable} from '@angular/core'
import {Subject} from 'rxjs'

@Injectable()
export class RecipeService{

  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

    // private recipes: Recipe[] =[
    //     new Recipe('Baigan Ka Bharta', 'nice recipe', 'https://myfoodstory.com/wp-content/uploads/2017/11/Easy-Baingan-Bharta-Smoky-eggplant-stir-fry-3.jpg',
    //     [
    //         new Ingredient("Egg Plant", 1),
    //         new Ingredient('Aalo', 4)
    //     ]),
    //     new Recipe('Aalo Kumro Ghet', 'darun recipe', 'https://s4.scoopwhoop.com/anj/Bengali_Vegetarian/516861833.jpeg',
    //     [
    //         new Ingredient("Kumro", 5),
    //         new Ingredient("Kochu", 6)
    //     ]),
    //   ];

      constructor(private slService : ShoppingListService){

      }

      setRecipes(recipes : Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice())
      }
      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index: number){
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients)
      }

      addRecipe(newRecipe : Recipe){
        this.recipes.push(newRecipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index : number, newRecipe : Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index : number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
      }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated: boolean = false;
  subscription: Subscription;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

  ngOnInit() {
    this.subscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    })
  }

  onSaveData(){
    this.dataStorageService.storedRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

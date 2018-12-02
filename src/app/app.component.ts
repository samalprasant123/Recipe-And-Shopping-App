import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedFeature = 'recipe';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDZFdON0_m_mBh-z4pp5ZW4LEUXLQ79rKs',
      authDomain: 'ng-recipe-book-7e555.firebaseapp.com'
    });
    this.authService.loadUser();
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}

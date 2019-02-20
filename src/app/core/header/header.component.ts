import { Component, OnInit } from '@angular/core';
// import { Response } from '@angular/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService, protected authService: AuthService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        // (response: Response) => {
        (response: HttpEvent<Object>) => {
          if (response.type === HttpEventType.Sent) {
            console.log('response = HttpEventType.Sent');
          } else {
            console.log(response);
          }
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}

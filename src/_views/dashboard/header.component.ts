import { TokenStorageService } from './../../_services/token-storage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector : 'app-header',
  templateUrl : 'header.component.html'
})

export class HeaderComponent{

  constructor(
    private _tokenStorageService: TokenStorageService,
    private router : Router
  ){}

  
  logout() {
    this._tokenStorageService.signOut();
    this.router.navigateByUrl('/login');
  }

}
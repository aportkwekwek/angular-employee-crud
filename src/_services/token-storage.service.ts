import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';


const USER_ID = "email";
const TOKEN_ID = "token";
const ACCESS_LEVEL = "access_level";
const EDIT_EMAIL = 'edit-email';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  emailAddress!:string;
  token!:string;
  decodedToken!: { [key: string]: string };
  expiryTime!: number;
  access_level!: string;
  edit_user!: string;


  constructor() { }

  signOut() { 
    window.sessionStorage.clear();
    this.token = '';
  }

  setEditUser(editEmail: string) {
    window.sessionStorage.removeItem(EDIT_EMAIL);
    window.sessionStorage.setItem(EDIT_EMAIL, editEmail);
    this.edit_user = editEmail;
  }

  getEditEmployee() {
    return this.edit_user;
  }

  setUser(emailAddress: string) { 
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, emailAddress);
    this.emailAddress = emailAddress;
  }

  setAccessLevel(access_level: string) {
    window.sessionStorage.removeItem(ACCESS_LEVEL)
    window.sessionStorage.setItem(ACCESS_LEVEL, access_level);
    this.access_level = access_level;
  }
  
  getAccessLevel() {
    return this.access_level;
  }

  setToken(token: any) {
    window.sessionStorage.removeItem(TOKEN_ID);
    window.sessionStorage.setItem(TOKEN_ID, token);
    this.token = token;
  }
  
  getToken() { 
    return this.token;
  }

  decodeToken() { 
    if (this.token) { 
      this.decodedToken = jwt_decode(this.token);
    }
  }
  
  getUser() { 
    return this.emailAddress;
  }

  getDecodedToken() { 
    return jwt_decode(this.token);
  }

  getTokenExpired() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.expiryTime : null;
  }

  isTokenExpired(): boolean { 
    const expiryTime: any = this.getTokenExpired();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date().getTime())) < 500;
    } else { 
      return false;
    }
    
  }



}

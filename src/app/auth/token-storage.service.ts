import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const FIRSTNAME_KEY = 'AuthFirstname';
const LASTNAME_KEY = 'AuthLastname';
const ID_KEY = 'AuthId';
const AUTHORITY_KEY = 'AuthAuthority';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  // @ts-ignore
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    // @ts-ignore
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    // @ts-ignore
    return sessionStorage.getItem(USERNAME_KEY);
  }
  public saveLastname(lastname: string) {
    window.sessionStorage.removeItem(LASTNAME_KEY);
    window.sessionStorage.setItem(LASTNAME_KEY, lastname);
  }

  public getLastname(): string {
    // @ts-ignore
    return sessionStorage.getItem(LASTNAME_KEY);
  }
  public saveFirstname(firstname: string) {
    window.sessionStorage.removeItem(FIRSTNAME_KEY);
    window.sessionStorage.setItem(FIRSTNAME_KEY, firstname);
  }

  public getFirstname(): string {
    // @ts-ignore
    return sessionStorage.getItem(FIRSTNAME_KEY);
  }
  public saveAuthority(authority: string) {
    window.sessionStorage.removeItem(AUTHORITY_KEY);
    window.sessionStorage.setItem(AUTHORITY_KEY, authority);
  }

  public getAuthority(): string {
    // @ts-ignore
    return sessionStorage.getItem(AUTHORITY_KEY);
  }
  public saveId(id: string) {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, id);
  }

  public getId(): number {
    // @ts-ignore
    return sessionStorage.getItem(ID_KEY);
  }
}

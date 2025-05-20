import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7061/api/Users/";
  constructor(private http : HttpClient, private router : Router) { }

  signUp(userObj:any) {
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
  }

  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj).pipe(
      tap(res => {
      if(res.token){
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      }
    })
  );   
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['client/login']);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
  
    // Check if the token is expired
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  }

  getUser() : { firstName: string;  } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  setUser(user: { firstName: string;  }) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  }

  



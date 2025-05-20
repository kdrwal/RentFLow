import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard  implements CanActivate {
constructor(private auth: AuthService){
  
}

canActivate(): boolean {
  if (this.auth.isLoggedIn()) {
    return true;
  } else {
    this.auth.signOut(); // Redirect to login if not authenticated
    return false;
  }
}


}
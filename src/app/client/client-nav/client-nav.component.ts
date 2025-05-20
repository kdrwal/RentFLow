import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-client-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-nav.component.html',
  styleUrls: ['./client-nav.component.css']
})
export class ClientNavComponent {
  constructor(public authService: AuthService) {}

  
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  
  get userName(): string {
    const user = this.authService.getUser();
    return user?.firstName ?? '';
  }

  logout(): void {
    this.authService.signOut();
  }
}

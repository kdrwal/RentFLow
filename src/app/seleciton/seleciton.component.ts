import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleciton',
  standalone: true,
  imports: [],
  templateUrl: './seleciton.component.html',
  styleUrl: './seleciton.component.css'
})
export class SelecitonComponent {

  constructor(private router: Router) { }

  navigateToClient(){
    this.router.navigate(['client/home']);
  }

  navigateToAdmin() {
    this.router.navigate(['admin/dashboard']);
  }

}

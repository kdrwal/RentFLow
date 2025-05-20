import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { BikeTableComponent } from './admin/bike-table/bike-table.component';
import { ClientNavComponent } from "./client/client-nav/client-nav.component";
import { AdminNavComponent } from "./admin/admin-nav/admin-nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BikeTableComponent, RouterModule, ClientNavComponent, AdminNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'rentflow-app';
  
 
 



}

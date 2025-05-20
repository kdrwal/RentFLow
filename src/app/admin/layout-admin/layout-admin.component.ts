import { Component } from '@angular/core';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [AdminNavComponent, RouterModule],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.css'
})
export class LayoutAdminComponent {

}

import { Component } from '@angular/core';
import { ClientNavComponent } from "../client-nav/client-nav.component";
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-layout-client',
  standalone: true,
  imports: [ClientNavComponent, RouterModule, FooterComponent],
  templateUrl: './layout-client.component.html',
  styleUrl: './layout-client.component.css'
})
export class LayoutClientComponent {

}

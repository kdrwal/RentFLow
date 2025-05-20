import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private router: Router) {}

  services = [
    {
      image: '/icon4.png',
      title: 'Bike Rentals',
      description: 'Rent a bike for a day, week, or month. We have a variety of bikes to choose from.'
    },
    {
      image: '/icon1.png',
      title: 'Guided Tours',
      description: 'Join our guided tours to explore the best biking trails in the area. Perfect for all skill levels.'
    },
    {
      image: '/icon3.png',
      title: 'Bike Maintenance',
      description: 'Keep your bike in top shape with our maintenance services. We offer tune-ups, repairs, and more.'
    },
    {
      image: '/icon2.png',
      title: 'Accessories & Gear',
      description: 'Shop our selection of biking accessories and gear, including helmets, lights, and locks.'
    }
  ];

  goToReservationPage() : void {
    this.router.navigate(['client/reservation']);
  }

}

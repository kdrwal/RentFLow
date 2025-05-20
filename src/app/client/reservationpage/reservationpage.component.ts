import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bike } from '../../../models/bike';
import { BikeService } from '../../services/bike.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservationpage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reservationpage.component.html',
  styleUrls: ['./reservationpage.component.css'] 
})
export class ReservationpageComponent implements OnInit {

  bikes : Bike[] = [];
  categories : string[] = [];
  searchTerm : string = '';
  selectedCategory : string = '';

  
 
  constructor(private bikeService : BikeService) { }
  
  ngOnInit(): void {
    this.loadBikes();
  }

  loadBikes() : void {
    this.bikeService.getBike().subscribe({
      next: (data: Bike[]) => {
        this.bikes = data;
        this.extractCategories();
        this.filterBikes();
      },
      error: (err) => {
        console.error('Error loading bikes', err);
      }
    })
  }

  extractCategories(): void {
    this.categories = [...new Set(this.bikes.map(bike => bike.category))];
  }

  filterBikes(): void {
    this.bikeService.getFilteredBikes(this.searchTerm, this.selectedCategory).subscribe({
      next: (filteredData: Bike[]) => {
        this.bikes = filteredData;
      }
    });
 }

}
  




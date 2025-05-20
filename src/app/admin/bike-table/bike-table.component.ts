import { Component, OnInit } from '@angular/core';
import { Bike } from '../../../models/bike';

import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { BikeService } from '../../services/bike.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'bike-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bike-table.component.html',
  styleUrl: './bike-table.component.css'
})

export class BikeTableComponent {

  bikes: Bike[] = [];
  searchTerm: string = '';
  category: string = '';
  
  constructor(private bikeService: BikeService, private router: Router) { }
    
    ngOnInit(){
      this.bikeService.getBike().subscribe((data: Bike[])=> {
        this.bikes = data;
        console.log(data);
      }) 
    }
    
    deleteBike(id: number) : void { 
      this.bikeService.deleteBike(id).subscribe({
        next: (response) => {
          this.bikes = this.bikes.filter(b => b.bikeId !== id);
        },
        error: (err) => {
          console.error('Error deleting bike', err);
        }
      });
    }

    editBike(id: number) : void {
      this.router.navigate(['admin/edit', id])
    }

    goToAddNewBike() : void {
      this.router.navigate(['admin/createbike'])
    }

    searchBikes() : void {
      this.bikeService.getFilteredBikes(this.searchTerm, this.category).subscribe({
        next: (filteredData: Bike[]) => {
          this.bikes = filteredData;
        }
      })
    }

    

    
  }





import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bike } from '../../../models/bike';

import { ActivatedRoute, Router } from '@angular/router';
import { BikeService } from '../../services/bike.service';


@Component({
  selector: 'app-bike-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bike-form.component.html',
  styleUrl: './bike-form.component.css'
})
export class BikeFormComponent implements OnInit {

  bike: Bike = {
    bikeId: 0,
    description: '',
    imageUrl: '',
    price: 0,
    category: '',
    brand: '',
    color: '',
    size: '',
    quantity: 0
  }

  isEditing: boolean = false;
  
  errorMessage :string = "";

  constructor(
    private bikeService: BikeService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(pm => {
      const id = pm.get('id');
      if(id){
        this.isEditing = true;
        this.bikeService.getBikeById(+id).subscribe(bike => {
          this.bike = bike;
          
        });
      }
    });
}




 onSubmit() {
  const action$ = this.isEditing
    ? this.bikeService.editBike(this.bike)
    : this.bikeService.createBike(this.bike);

  action$.subscribe(() => this.router.navigate(['admin/bikes']));
  }
}
      



   

  


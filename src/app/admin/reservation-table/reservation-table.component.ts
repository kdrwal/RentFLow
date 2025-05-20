import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserProfile } from '../../../models/user';
import { Bike } from '../../../models/bike';
import { UserService } from '../../services/user.service';
import { BikeService } from '../../services/bike.service';
import { ReservationService } from '../../services/reservation.service';
import { ReservationCreate } from '../../../models/reservationcreate';

import { forkJoin } from 'rxjs';
import { ReservationDto } from '../../../models/ReservationDto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-table.component.html',
  styleUrl: './reservation-table.component.css'
})
export class ReservationTableComponent {

  users : UserProfile[] = [];
  bikes : Bike[] = [];
  reservations : ReservationDto[] = [];

  searchTerm: string = '';
  filteredReservations: typeof this.combinedReservations = [];
  
  
  combinedReservations: Array<{
    reservationId: number;
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    bikeId: number;
    description: string;
    quantity: number;
    totalPrice: number;
    startDate: string;
    endDate: string;
  }> = [];
  
 
  constructor(private userService: UserService, private bikeService: BikeService, private reservationService: ReservationService) { }

  ngOnInit() {
    this.loadReservations();
  }

loadReservations() {
  forkJoin({
      users: this.userService.getAllUsers(),
      reservations: this.reservationService.getReservations()
    }).subscribe(({ users, reservations }) => {
      this.users = users;
      this.reservations = reservations;

      
      
      this.combinedReservations = reservations.flatMap(res => {
        const user = users.find(u => u.userId === res.userId)!;
        return res.reservationBikes.map(rb => ({
          reservationId: res.reservationId,
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          bikeId: rb.bikeId,
          description: rb.bike.description,
          quantity: rb.quantity,
          totalPrice: res.totalPrice,
          startDate: res.startDate,
          endDate: res.endDate
        }));
      });
      this.applyFilter();
    });
}

onDelete(reservationId: number) {
  if(!confirm("Are you sure you want to delete this reservation?")) return;
  this.reservationService.deleteReservation(reservationId).subscribe(() => {
    this.loadReservations();
  }, err => console.error(err));
  
}

applyFilter() {
  const term = this.searchTerm.trim().toLowerCase();
  if(!term) {
    this.filteredReservations = this.combinedReservations;
    return;
  }

  this.filteredReservations = this.combinedReservations.filter(r => 
    r.firstName.toLowerCase().includes(term) ||
    r.lastName.toLowerCase().includes(term) ||
    r.email.toLowerCase().includes(term) ||
    r.description.toLowerCase().includes(term) ||
    r.startDate.includes(term) ||
    r.endDate.includes(term)
  )

}



  
 

}



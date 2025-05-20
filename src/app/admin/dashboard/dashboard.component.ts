import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { UserService } from '../../services/user.service';
import { BikeService } from '../../services/bike.service';
import { Chart } from 'chart.js/auto';
import { ReservationDto } from '../../../models/ReservationDto'
import { UserProfile } from '../../../models/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit  {

  totalReservations = 0;
  totalUsers = 0;
  totalBikes = 0;

  reservationsOverTimeLabels: string[] = [];
  reservationsOverTimeData: number[] = [];

  topBikesLabels: string[] = [];
  topBikesData: number[] = [];

  newUsersLabels: string[] = [];
  newUsersData: number[] = [];

  private reservations: ReservationDto[] = [];
  private users: UserProfile[] = [];

  constructor(
    private reservationService: ReservationService,
    private userService: UserService,
    private bikeService: BikeService
  ) {}

  ngOnInit() {
    const today = new Date();

   
    for (let i = 7; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateLabel = d.toISOString().split('T')[0]; // YYYY-MM-DD
      this.reservationsOverTimeLabels.push(dateLabel);
      this.newUsersLabels.push(dateLabel);
      this.reservationsOverTimeData.push(0);
      this.newUsersData.push(0);
    }

    
    this.bikeService.getBike().subscribe(bikes => this.totalBikes = bikes.length);

    this.reservationService.getReservations().subscribe(res => {
      this.reservations = res;
      this.totalReservations = res.length;
      this.processReservations();
    });

    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.totalUsers = users.length;
      this.processUsers();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      new Chart('reservationsChart', {
        type: 'line',
        data: {
          labels: this.reservationsOverTimeLabels,
          datasets: [{
            label: 'Reservations',
            data: this.reservationsOverTimeData,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          }]
        }
      });

      new Chart('topBikesChart', {
        type: 'pie',
        data: {
          labels: this.topBikesLabels,
          datasets: [{
            label: 'Quantity Rented',
            data: this.topBikesData,
            backgroundColor:[ 'rgba(255, 99, 132, 0.5)',
                              'rgba(60, 155, 41, 0.5)',
                              'rgba(13, 46, 231, 0.5)',
                              'rgba(252, 227, 10, 0.5)',

            ]
          }]
        }
      });

      new Chart('newUsersChart', {
        type: 'bar',
        data: {
          labels: this.newUsersLabels,
          datasets: [{
            label: 'New Users',
            data: this.newUsersData,
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
          }]
        }
      });
    }, 500);
  }

  private processReservations() {
    const countByDate = new Map<string, number>();
    const bikeCount = new Map<number, number>();

    for (const res of this.reservations) {
      const dateKey = res.startDate.split('T')[0]; 
      countByDate.set(dateKey, (countByDate.get(dateKey) || 0) + 1);

      for (const rb of res.reservationBikes) {
        bikeCount.set(rb.bikeId, (bikeCount.get(rb.bikeId) || 0) + rb.quantity);
      }
    }

    this.reservationsOverTimeLabels.forEach((label, index) => {
      this.reservationsOverTimeData[index] = countByDate.get(label) || 0;
    });

    const sortedBikes = Array.from(bikeCount.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
    this.topBikesLabels = sortedBikes.map(([bikeId]) => `Bike ${bikeId}`);
    this.topBikesData = sortedBikes.map(([, qty]) => qty);
  }

  private processUsers() {
  const labels = this.newUsersLabels;
  const usersSorted = [...this.users].sort((a, b) => a.userId - b.userId);
  const totalUsers = usersSorted.length;

  const usersPerDay: number[] = new Array(7).fill(0);

  
  const usersPerChunk = Math.ceil(totalUsers / 7);

  for (let i = 0; i < 7; i++) {
    usersPerDay[i] = usersPerChunk * (i + 1);
    if (usersPerDay[i] > totalUsers) usersPerDay[i] = totalUsers;
  }

  this.newUsersData = usersPerDay;
}

}

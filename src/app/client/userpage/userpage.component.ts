// src/app/client/userpage/userpage.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfile } from '../../../models/user';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  profileForm!: FormGroup;
  reservations: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      email:     [{ value: '', disabled: true }, Validators.required],
      passwordHash: ['']  
    });

    
    this.loadData();
  }

  private loadData() {
    this.loading = true;
    this.userService.getProfile().subscribe({
      next: (user: UserProfile) => {
        this.profileForm.patchValue(user);
        this.userService.getMyReservations().subscribe(res => {
          this.reservations = res;
          this.loading = false;
        });
      },
      error: () => this.loading = false
    });
  }

  onUpdateProfile(): void {
    if (this.profileForm.invalid) return;
    const { firstName, lastName, passwordHash } = this.profileForm.getRawValue();
    this.userService.updateProfile({ firstName, lastName, passwordHash })
      .subscribe(() => {
        alert('Profile updated successfully');
        
       
      

      this.userService.getProfile().subscribe(profile => {
        this.authService.setUser({
          firstName: profile.firstName,
        });
        this.loadData();
      });
    });
  }

  onDeleteAccount(): void {
    if (!confirm('Are you sure you want to delete your account?')) return;
    this.userService.deleteAccount().subscribe(() => {
      alert('Account deleted');
      this.authService.signOut();
    });
  }

  onCancelReservation(reservationId : number): void {
      if (!confirm('Are you sure you want to cancel your reservation?')) return;
  this.reservationService.deleteReservation(reservationId)
    .subscribe(() => {
      // odśwież listę
      this.loadData();
    }, err => console.error(err));
  }
}

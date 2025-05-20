import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../../models/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {

  users : UserProfile[] = [];
  searchTerm : string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: UserProfile[]) => {
      this.users = data;
      
    })
  }

  deleteUser(id: number) : void {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        this.users = this.users.filter(u => u.userId !== id);
      },
      error: (err) => {
        console.error('Error deleting user', err);
      }
    })
  }

  editUser(id: number) : void {
    this.router.navigate(['admin/edituser', id])
    
  }

  filterUsers() : void {
    this.userService.getFilteredUsers(this.searchTerm).subscribe({
      next: (filteredData: UserProfile[]) => {
        this.users = filteredData;
      }
    });
  }

  


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfile } from '../../models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = "https://localhost:7061/api/Users/";
  constructor(private http: HttpClient) { }

  
  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}profile`);
  }

  
  updateProfile(payload: {
    firstName: string;
    lastName: string;
    passwordHash?: string;
  }): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}update`, payload);
  }

  
  deleteAccount(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}delete`);
  }

  
  getMyReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}reservations`);
  }

  getAllUsers(): Observable<UserProfile[]> {
    
    return this.http.get<UserProfile[]>(`${this.baseUrl}`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }

  getUserById(id: number): Observable<UserProfile>{
    return this.http.get<UserProfile>(`${this.baseUrl}${id}`);
  }

  getFilteredUsers(searchTerm: string): Observable<UserProfile[]> {
    return this.getAllUsers().pipe(
      map((users: UserProfile[]) => 
        users.filter(user =>
        (searchTerm === '' || user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) 
                            || user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
                            || user.email.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    )
    );
  }

}

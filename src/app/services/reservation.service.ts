import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationCreate } from '../../models/reservationcreate';
import { ReservationDto } from '../../models/ReservationDto';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl : string = "https://localhost:7061/api/Reservations";
  
  constructor(private http: HttpClient) { }

  createReservation(create: ReservationCreate) : Observable<{ reservationId: number }> {
    return this.http.post<{ reservationId: number  }>(this.baseUrl, create);
  }

  getUnavailable(bikeId: number) : Observable<{ start: string, end: string}[]> {
    return this.http.get<{ start: string; end : string }[]>(`${this.baseUrl}/${bikeId}/unavailable`);
  }


  getReservations(): Observable<ReservationDto[]> {
    return this.http.get<ReservationDto[]>(`${this.baseUrl}`);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }





}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Bike } from '../../models/bike';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private baseUrl: string = "https://localhost:7061/api/Bikes";

  constructor(private http: HttpClient) { }

  

  getBike(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.baseUrl);
  }

  getBikeById(id: number): Observable<Bike> {
    return this.http.get<Bike>(`${this.baseUrl}/${id}`);
  }

  deleteBike(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  createBike(bike: Bike) {
    return this.http.post<Bike>(this.baseUrl, bike);
  }

  editBike(bike: Bike) {
    return this.http.put<Bike>(`${this.baseUrl}/${bike.bikeId}`, bike);
  }

  getFilteredBikes(searchTerm: string, category: string): Observable<Bike[]> {
    return this.getBike().pipe(
      map((bikes: Bike[]) =>
        bikes.filter(bike => 
        (category === '' || bike.category === category) &&
        (searchTerm === '' || bike.description.toLowerCase().includes(searchTerm.toLowerCase()))
        ) 
      )
    );
  }

}

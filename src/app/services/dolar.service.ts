import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DolarService {
  constructor(private http: HttpClient) {}

  getDolar(): Observable<any> {
    return this.http.get('https://cl.dolarapi.com/api/v1/dolar'); // Cambia esto por la URL correcta
  }
}

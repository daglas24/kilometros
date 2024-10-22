import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8100'; // Cambia esta URL según tu servidor

  constructor(private http: HttpClient) {}

  // GET: Obtener todos los productos
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // POST: Crear un nuevo producto
  createProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  // PUT: Actualizar un producto existente
  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, producto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  // DELETE: Eliminar un producto
  deleteProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

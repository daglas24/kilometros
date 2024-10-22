import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Cambia esta URL según el puerto de tu servidor json-server
  private apiUrl = 'http://localhost:8100/users'; // URL del servidor json-server (puedes ajustar a 3000 si es necesario)

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear un usuario
  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // Editar un usuario
  editUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${user.id}`, user);
  }

  // Eliminar un usuario
  deleteUser(user: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${user.id}`);
  }
}

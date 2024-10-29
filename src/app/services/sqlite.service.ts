import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular'; // Importa Storage de Ionic
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  
  private db!: SQLiteObject;
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable(); 
  private authenticated: boolean = false;
  productosSubject: any;

  // Inicializa con algunos usuarios
  constructor(private router: Router, private http: HttpClient, private sqlite: SQLite, private storage: Storage, private platform: Platform) {
    this.init();
    this.loadInitialUsers(); 
  }

  
    async init() {
      if (this.platform.is('cordova')) {
        // Usa SQLite en dispositivos móviles
        this.db = await this.sqlite.create({
          name: 'mydatabase.db',
          location: 'default'
        });
        console.log('Base de datos SQLite creada');
      } else {
        // Usa Ionic Storage en el navegador
        await this.storage.create();
        console.log('Almacenamiento Ionic Storage inicializado');
      }
    }
  

  login(email: string, password: string): string | null {
    const user = this.usersSubject.getValue().find(u => u.email === email && u.password === password);
    
    if (user) {
      this.authenticated = true;
      const token = this.generateToken(email);
      localStorage.setItem('auth_token', token);
      localStorage.setItem('isAuthenticated', 'true');
      return token;
    }
    
    return null; 
  }

  async createUser(email: string, password: string): Promise<boolean> {
    const exists = this.usersSubject.getValue().some(u => u.email === email);
    if (exists) {
      return false; 
    }

    const newUser = { email, password };
    const currentUsers = this.usersSubject.getValue();
    currentUsers.push(newUser); 
    this.usersSubject.next(currentUsers); 

    await this.saveUserToDb(newUser); 
    return true;
  }

  private async saveUserToDb(user: any): Promise<void> {
    try {
      await this.db.executeSql(`INSERT INTO usuarios (email, password) VALUES (?, ?)`, [
        user.email,
        user.password,
      ]);
      console.log('Usuario guardado en la base de datos:', user);
    } catch (error) {
      console.log('Error al guardar el usuario en la base de datos', error);
    }
  }

  generateToken(email: string): string {
    return btoa(`${email}:${new Date().getTime()}`);
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem('authenticated');
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  updateUser(updatedUser: any) {
    const currentUsers = this.usersSubject.getValue();
    const index = currentUsers.findIndex(user => user.email === updatedUser.email);
    
    if (index !== -1) {
      currentUsers[index] = updatedUser; 
      this.usersSubject.next(currentUsers); 
      this.saveUserToDb(updatedUser); 
    }
  }

  getUsers() {
    return this.usersSubject.getValue();
  }

  isAuthenticated(): boolean {
    const isAuth = localStorage.getItem('isAuthenticated');
    return isAuth === 'true';
  }

  private loadInitialUsers() {
    this.usersSubject.next([
      { email: 'edu.villanueva@duocuc.cl', password: 'Eduv1234' },
      
    ]);
  }

  async createOpenDatabase(): Promise<void> {
    try {
      const db = await this.sqlite.create({
        name: 'data.db',
        location: 'default'
      });
      this.db = db;
      await this.createTable();  
      console.log('Base de datos abierta con éxito');
    } catch (e) {
      console.error('Error al abrir la base de datos', e);
    }
  }

  createTable(): Promise<void> {
    return this.db.executeSql('CREATE TABLE IF NOT EXISTS productos(tipo VARCHAR(30), precio REAL, cantidad INTEGER)', [])
      .then(() => {
        console.log('Tabla creada con éxito');
      }).catch(e => {
        console.error('Error al crear la tabla', e);
        return Promise.reject(e);
      });
  }

  async insertData(tipo: string, precio: number, cantidad: number): Promise<void> {
    const query = 'INSERT INTO productos(tipo, precio, cantidad) VALUES (?, ?, ?, ?)';
    
    if (this.db) {
      return this.db.executeSql(query, [tipo, precio, cantidad])
        .then(async () => {
          alert('Producto agregado con éxito');
          await this.selectData(); // Llama a selectData para actualizar la lista de productos
        })
        .catch(e => {
          console.error('Error al insertar producto', e);
          return Promise.reject(e);  
        });
    } else {
      return Promise.reject('Base de datos no inicializada');
    }
  }

  

  async selectData(): Promise<combustible[]> {
    const combustibleLista: combustible[] = []; // Cambié el nombre a productosList para evitar confusión
    
    if (this.db) {
      return this.db.executeSql('SELECT * FROM productos', [])
        .then((result) => {
          for (let i = 0; i < result.rows.length; i++) {
            combustibleLista.push({
              tipo: result.rows.item(i).tipo,
              precio: result.rows.item(i).precio,
              cantidad: result.rows.item(i).cantidad,
            });
          }
          this.productosSubject.next(combustibleLista); // Actualiza el BehaviorSubject
          return combustibleLista;  
        })
        .catch(e => {
          console.error('Error al seleccionar productos', e);
          return Promise.reject(e);
        });
    } else {
      return Promise.reject('Base de datos no inicializada');
    }
  }

  async selectDataByName(tipo: string): Promise<combustible | null> {
    if (this.db) {
      const query = 'SELECT * FROM productos WHERE tipo = ?';
      const result = await this.db.executeSql(query, [tipo]);
      
      if (result.rows.length > 0) {
        const item = result.rows.item(0);
        return {
          tipo: item.name,
          precio: item.precio,
          cantidad: item.cantidad
        };
      }
    }
    return null; 
  }

  async updateRecord(tipo: string,  precio: number, cantidad: number) {
    const query = 'UPDATE productos SET  precio = ?, cantidad = ? WHERE tipo = ?';
    await this.db.executeSql(query, [tipo, precio, cantidad, ]);
    await this.selectData(); // Llama al método que actualiza el BehaviorSubject
  }


  async deleteRecord(tipo: string) {
    const query = 'DELETE FROM productos WHERE tipo = ?';
    await this.db.executeSql(query, [tipo]);
    await this.selectData(); // Actualiza la lista de productos después de eliminar
  }


  
}

// Las clases se deben hacer afuera de todo

export class combustible {
  public tipo!: string;
  public cantidad!: string; 
  public precio!: number;
}


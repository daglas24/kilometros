import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  map: any;

  user = {
    email: '',
    password: ''
  };

  passwordValid: boolean = true;
  errorMessage: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private sqliteService: SqliteService,
    private modalController: ModalController,
    private http: HttpClient
  ) {
    this.loadUserFromLocalStorage();
  }

  ngOnInit() {
    this.checkIfAuthenticated();
    this.loadMap();
  }

  loadMap() {
    const latLng = new google.maps.LatLng(40.73061, -73.935242); // Coordenadas de ejemplo
    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  checkIfAuthenticated() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.isAuthenticated = true;
      let navigationExtras: NavigationExtras = {
        state: { user: this.user }
      };
      this.router.navigate(['/home'], navigationExtras);
    }
  }

  loadUserFromLocalStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  saveUserToLocalStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  async ingresar() {
    this.errorMessage = '';
    if (this.isPasswordValid(this.user.password)) {
      const token = this.sqliteService.login(this.user.email, this.user.password);
      if (token) {
        localStorage.setItem('auth_token', token);
        this.saveUserToLocalStorage();
        let navigationExtras: NavigationExtras = {
          state: { user: this.user }
        };
        this.router.navigate(['/home'], navigationExtras);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
        this.passwordValid = false;
      }
    } else {
      this.errorMessage = 'Contraseña no cumple los requisitos';
      this.passwordValid = false;
    }
  }

  async registrar() {
    this.errorMessage = '';
    if (this.isPasswordValid(this.user.password)) {
      const userCreated = await this.sqliteService.createUser(this.user.email, this.user.password); 
      if (userCreated) {
        this.errorMessage = 'Usuario registrado correctamente';
        this.saveUserToLocalStorage();
        let navigationExtras: NavigationExtras = {
          state: { user: this.user }
        };
        this.router.navigate(['/home'], navigationExtras);
      } else {
        this.errorMessage = 'El usuario ya existe';
      }
    } else {
      this.errorMessage = 'Contraseña no cumple los requisitos';
      this.passwordValid = false;
    }
  }

  isPasswordValid(password: string): boolean {
    const regex = /^(?=(?:.*\d){4})(?=(?:.*[a-zA-Z]){3})(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  }

  async cerrarSesion() {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    this.isAuthenticated = false;
    this.sqliteService.logout();
    this.router.navigate(['/login']);
  }

  async checkServerConnection() {
    this.http.get('https://1689-152-230-70-242.ngrok-free.app:3000/').subscribe(
      (data) => {
        console.log('Datos obtenidos del JSON Server:', data);
        alert('Datos obtenidos: ' + JSON.stringify(data));
      },
      (error) => {
        console.error('Error al conectarse al JSON Server', error);
        alert('No se pudo conectar al JSON Server');
      }
    );
  }
}

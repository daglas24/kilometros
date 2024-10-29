import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-combustible',
  templateUrl: './combustible.page.html',
  styleUrls: ['./combustible.page.scss'],
})
export class CombustiblePage implements OnInit {
  username: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || 'Invitado';
    });
  }

  goToInicio() {
    this.router.navigate(['/inicio']);
  }
}

import { Component, OnInit } from '@angular/core';
import { config } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  env = '';

  constructor() {

  }

  ngOnInit(): void {
    this.env = config.environmentName;
  }

}

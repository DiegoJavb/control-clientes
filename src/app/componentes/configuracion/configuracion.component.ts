import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
})
export class ConfiguracionComponent implements OnInit {
  permitirRegistro: boolean = false;
  constructor(private router: Router) {}
  ngOnInit(): void {}
  guardar() {}
}

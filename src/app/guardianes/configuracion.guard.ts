import { CanActivate, Router } from '@angular/router';
import { ConfiguracionService } from '../servicios/configuracion.service';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class ConfiguracionGuard implements CanActivate {
  constructor(
    private router: Router,
    private configuracionServicio: ConfiguracionService
  ) {}
  canActivate(): Observable<boolean> {
    return this.configuracionServicio.getConfiguracion().pipe(
      map((configuracion) => {
        if (configuracion?.permitirRegistro) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
// se conbinan los metodos de pipe y map para poder acceder al objeto auth

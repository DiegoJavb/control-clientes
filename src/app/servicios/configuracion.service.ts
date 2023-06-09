import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Configuracion } from '../modelo/configuracion.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class ConfiguracionService {
  configuracionDoc?: AngularFirestoreDocument<Configuracion>;
  configuracion?: Observable<Configuracion | undefined>;
  //   id unico de la colexxion de configuracion
  id = '1';
  constructor(private db: AngularFirestore) {}
  getConfiguracion(): Observable<Configuracion | undefined> {
    this.configuracionDoc = this.db.doc<Configuracion>(
      `configuracion/${this.id}`
    );
    this.configuracion = this.configuracionDoc.valueChanges();
    return this.configuracion;
  }
  modificarConfiguracion(configuracion: Configuracion) {
    this.configuracionDoc = this.db.doc<Configuracion>(
      `configuracion/${this.id}`
    );
    this.configuracionDoc.update(configuracion);
  }
}

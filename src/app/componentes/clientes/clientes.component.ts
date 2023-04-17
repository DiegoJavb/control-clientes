import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/modelo/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgClass } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes?: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    saldo: 0,
    email: '',
  };
  @ViewChild('clienteForm') clienteForm?: NgForm;
  @ViewChild('botonCerrar') botonCerrar?: ElementRef;
  constructor(
    private clientesServicio: ClienteServicio,
    private flasMessagesService: FlashMessagesService
  ) {}
  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }
  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes != null) {
      this.clientes.forEach((cliente) => {
        return (saldoTotal += cliente.saldo!);
      });
    }
    return saldoTotal;
  }
  agregar({ value, valid }: NgForm) {
    if (!valid) {
      this.flasMessagesService.show(
        'Por favor llenar formulario correctamente',
        {
          cssClass: 'alert-danger',
          timeout: 4000,
        }
      );
    } else {
      // Agregar el nuevo cliente
      this.clientesServicio.agregarCliente(value);
      this.clienteForm?.resetForm();
      this.cerrarModal();
    }
  }
  private cerrarModal() {
    this.botonCerrar?.nativeElement.click();
  }
}

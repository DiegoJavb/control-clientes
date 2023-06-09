import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };
  id?: string | undefined;
  constructor(
    private clienteService: ClienteServicio,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteService.getCliente(this.id!).subscribe((cliente) => {
      this.cliente = cliente!;
    });
  }
  guardar({ value, valid }: NgForm) {
    if (!valid) {
      this.flashMessages.show('Por favor llene el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      value.id = this.id;
      // modificar el cliente
      this.clienteService.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }
  eliminar() {
    if (confirm('Seguro que desea eliminar el cliente?')) {
      this.clienteService.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }
}
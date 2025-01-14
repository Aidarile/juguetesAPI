import { Component, inject } from '@angular/core';
import { JuguetesService } from '../../services/juguetes.service';
import { Juguete } from '../../interfaces/juguetes';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddjugueteComponent } from '../addjuguete/addjuguete.component';

@Component({
  selector: 'app-juguetes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juguetes-list.component.html',
  styleUrls: ['./juguetes-list.component.css'],
})
export class JuguetesListComponent {
  private readonly jugueteService: JuguetesService = inject(JuguetesService);
  private readonly modalService: NgbModal = inject(NgbModal);

  juguetes: Juguete[] = [];

  constructor() {
    this.loadJuguetes();
  }

  private loadJuguetes(): void {
    this.jugueteService.getJuguetes().subscribe({
      next: (value) => {
        this.juguetes = value.juguetes;
      },
      complete: () => {
        console.log('Juguetes cargados correctamente');
      },
      error: (err) => {
        console.error('Error al cargar los juguetes:', err.message);
      },
    });
  }

  removeJuguete(juguete: Juguete) {
    if (
      confirm('¿Seguro que quieres borrar el juguete ' + juguete.nombre + '?')
    ) {
      this.jugueteService.deleteJuguete(juguete._id).subscribe({
        next: (value) => {
          console.log(value);
        },
        complete: () => {
          console.log('Juguete borrado.');
        },
        error: (err) => console.error(err),
      });
    }
  }

  // Función para crear una nueva película, para lo que
  // abrirá el modal y pasará el listado de géneros
  newJuguete() {
    const modalRef = this.modalService.open(AddjugueteComponent);
    modalRef.componentInstance.editar = false;
  }
  /* Función para editar una película, para lo que abrirá
   el modal y pasará la película y el listado de géneros */
  loadJuguete(juguete: Juguete) {
    const modalRef = this.modalService.open(AddjugueteComponent);
    modalRef.componentInstance.juguete = juguete;
    modalRef.componentInstance.editar = true;

    // Esto se ejecutará cuando el modal se cierre
    modalRef.result
      .then(() => {
        this.loadJuguetes();
      })
      .catch(() => {
        this.loadJuguetes();
      });
  }
}

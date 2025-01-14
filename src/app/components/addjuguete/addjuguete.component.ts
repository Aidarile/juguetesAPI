import { Component, inject, Input, OnInit } from '@angular/core';
import { Juguete } from '../../interfaces/juguetes';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { JuguetesService } from '../../services/juguetes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-addjuguete',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './addjuguete.component.html',
  providers: [NgbActiveModal],
  styleUrl: './addjuguete.component.css'
})
export class AddjugueteComponent implements OnInit{
closeAndNavigate() {
throw new Error('Method not implemented.');
}
  @Input({required: true}) juguete!: Juguete;
  @Input({required: true}) editar!: boolean;
  activeModal= inject(NgbActiveModal);

  private readonly jugueteService: JuguetesService = inject(JuguetesService);
  private readonly formBuilder: FormBuilder  = inject(FormBuilder);
  private readonly modalService: NgbModal  = inject(NgbModal);
  formJuguete: FormGroup = this.formBuilder.group({
    _id: [''],
    nombre: [''],
    imagen: [''],
    categoria: [''],
    edadMinima: [''],
    precio: ['']
  });

  get nombre(): any{
    return this.formJuguete.get('nombre');
  }
  get imagen(): any{
    return this.formJuguete.get('imagen');
  }
  get categoria(): any{
    return this.formJuguete.get('categoria');
  }
  get edadMinima(): any{
    return this.formJuguete.get('edadMinima');
  }
  get precio(): any{
    return this.formJuguete.get('precio');
  }

  onSubmit() {
    if (this.editar) {
      this.jugueteService.updateJuguete(this.formJuguete.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value);
          },
          complete: () => {
            console.log('Actualizado');
            this.activeModal.dismiss();
          },
          error: err => {
            console.error(err)}
        }
      )
    }
    else {
      this.jugueteService.addJuguete(this.formJuguete.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value);
          },
          complete: () => {
            console.log('Juguete añadido');},
          error: err => {
            console.error(err);
          }
        }
      )
    }
  }
  ngOnInit(): void {
    if (this.editar){
      this.formJuguete.setValue(this.juguete);
    }else {
      this.formJuguete.reset();
    }
  }

}

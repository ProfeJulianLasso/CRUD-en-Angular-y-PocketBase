import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonaService } from '../services/persona.service';
import { CollectionModel } from '../models/collection.model';
import { PersonaModel } from '../models/persona.model';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

  frmPersona: FormGroup;
  personas!: PersonaModel[];
  btnValue: string;

  constructor(private personaService: PersonaService) {
    this.btnValue = 'Crear';
    this.frmPersona = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      correo: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getPersonas();
  }

  submit(): void {
    console.log(this.frmPersona.getRawValue());
    this.personaService.create(this.frmPersona.getRawValue()).subscribe({
      next: (data: PersonaModel) => {
        console.log('Persona nueva', data);
        this.getPersonas();
        this.frmPersona.reset();
      },
      error: (error: any) => { },
      complete: () => { },
    });
  }

  update(): void {
    this.personaService.update(this.frmPersona.get('id')?.value, this.frmPersona.getRawValue()).subscribe({
      next: (data: PersonaModel) => {
        this.getPersonas();
        this.frmPersona.reset();
        this.btnValue = 'Crear';
      },
      error: (error: any) => { },
      complete: () => { },
    });
  }

  borrar(id: string): void {
    const response = confirm("¿Está segur, segurito, segurón que quiere borrar este dato?");
    if (response) {
      this.personaService.delete(id).subscribe({
        next: () => {
          this.getPersonas();
        },
        error: (error) => { },
        complete: () => { },
      });
    }
  }

  toForm(data: PersonaModel): void {
    this.frmPersona.patchValue(data);
    this.btnValue = 'Actualizar';
  }

  private getPersonas(): void {
    this.personaService.getAll().subscribe({
      next: (collection: CollectionModel) => {
        console.log(collection);
        if (collection.items.length > 0) this.personas = collection.items;
        else this.personas = [];
      },
      error: (error: any) => { },
      complete: () => { },
    });
  }

}

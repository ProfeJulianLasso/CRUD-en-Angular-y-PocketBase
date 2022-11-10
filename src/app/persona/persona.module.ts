import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PersonaComponent } from './page/persona.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonaRoutingModule } from './persona-routing.module';

@NgModule({
  declarations: [
    PersonaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PersonaRoutingModule
  ]
})
export class PersonaModule { }

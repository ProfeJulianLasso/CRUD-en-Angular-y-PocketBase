import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionModel } from '../models/collection.model';
import { PersonaModel } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private collection!: CollectionModel;
  changeCollection: EventEmitter<CollectionModel>;

  constructor(private httpClient: HttpClient) {
    this.changeCollection = new EventEmitter<CollectionModel>();
  }

  getAll(): void {
    this.httpClient.get<CollectionModel>(`${environment.urlBase}/persona/records`).subscribe({
      next: (data: CollectionModel) => {
        this.collection = data;
        this.changeCollection.emit(this.collection);
      },
    });
  }

  getOne(id: string): Observable<PersonaModel> {
    return this.httpClient.get<PersonaModel>(`${environment.urlBase}/persona/records/${id}`);
  }

  create(persona: PersonaModel): Observable<PersonaModel> {
    return this.httpClient.post<PersonaModel>(
      `${environment.urlBase}/persona/records`,
      persona,
      {
        headers: {
          'content-type': 'application/json'
        },
      }
    );
  }

  update(id: string, persona: PersonaModel): Observable<PersonaModel> {
    return this.httpClient.patch<PersonaModel>(
      `${environment.urlBase}/persona/records/${id}`,
      persona,
      {
        headers: {
          'content-type': 'application/json'
        },
      }
    );
  }

  delete(id: string): Observable<null> {
    return this.httpClient.delete<null>(`${environment.urlBase}/persona/records/${id}`);
  }
}

import { PersonaModel } from './persona.model';

export interface CollectionModel {
  page:       number;
  perPage:    number;
  totalItems: number;
  items:      PersonaModel[];
}

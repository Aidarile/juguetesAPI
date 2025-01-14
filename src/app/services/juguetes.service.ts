import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Juguete, Juguetes } from '../interfaces/juguetes';

@Injectable({
  providedIn: 'root',
})
export class JuguetesService {
  private readonly http = inject(HttpClient);
  private readonly urlBase = 'https://api-juguetes.vercel.app/api/v2/juguete/alljuguetes';
  private readonly urlPost = 'https://api-juguetes.vercel.app/api/v2/juguete/juguetes';

  constructor() {}

  getJuguetes(): Observable<Juguetes> {
    return this.http.get<Juguetes>(this.urlBase);
  }

  addJuguete(juguete: Juguete): Observable<StatusMessage>{
    return this.http.post<StatusMessage>(this.urlPost,juguete);
  }

  deleteJuguete(id: string): Observable<StatusMessage>{
    return this.http.delete<StatusMessage>("https://api-juguetes.vercel.app/api/v2/juguete/delete/"+id);
  }

  updateJuguete(juguete: Juguete): Observable<StatusMessageUpdate>{
    return this.http.patch<StatusMessageUpdate>("https://api-juguetes.vercel.app/api/v2/juguete/update/"+juguete._id, juguete);
  }
}

export interface StatusMessage{
  status: string;
}
export interface StatusMessageUpdate{
  status: string;
  data: Juguete
}
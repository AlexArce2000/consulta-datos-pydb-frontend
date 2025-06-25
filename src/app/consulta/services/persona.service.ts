import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = "http://localhost:8080/consulta-web/api/consulta-datos/datos-personales";
  constructor(private http: HttpClient) { }

  buscarPersonas(filtros: any): Observable<any> {
    let params = new HttpParams();  
    if (filtros.nombre) params = params.append('nombre', filtros.nombre);
    if (filtros.apellido) params = params.append('apellido', filtros.apellido);
    if (filtros.fechaNac) {
      const fecha = new Date(filtros.fechaNac); 
      if (!isNaN(fecha.getTime())) { 
        const fechaString = fecha.toISOString().split('T')[0];
        params = params.append('fechaNacimiento', fechaString);
      }
    }
    if (filtros.cedula) params = params.append('cedula', filtros.cedula);
    return this.http.get(this.apiUrl, { params });
  }
}

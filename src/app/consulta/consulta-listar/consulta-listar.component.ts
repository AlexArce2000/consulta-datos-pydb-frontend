import { Component, ViewChild} from '@angular/core';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../services/persona.service';
import form from './form.json';
import { MessageService } from 'primeng/api';
import { FormioModule } from '@formio/angular';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-consulta-listar',
  standalone: true,
  imports: [CommonModule, FormioModule, ToastModule],
  providers: [MessageService],
  templateUrl: './consulta-listar.component.html',
  styleUrls: ['./consulta-listar.component.css']
})
export class ConsultaListarComponent {
  tabulatorTable: any;
  formDefinition = form;
  constructor(private personaService: PersonaService, private messageService: MessageService) {}
  @ViewChild('formioElement') formioElement: any;

  ngOnInit() {
    this.initTabulator();
  }
  ngAfterViewInit() {
    this.formioElement.formio.on('searchClicked', () => {
      const formData = this.formioElement.formio.data;
      this.performSearch(formData);
    });
  }
  initTabulator(data: any[] = []) {
    this.tabulatorTable = new Tabulator('#personas-table', {
      data: data,
      height: '500px',
      layout: 'fitColumns',
      placeholder: 'No se encontraron registros',
      columns: [
        { title: 'Cédula', field: 'cedula', sorter: 'number', width: 120 },
        { title: 'Nombre', field: 'nombres', sorter: 'string',  },
        { title: 'Apellido', field: 'apellido', sorter: 'string' },
        { 
          title: 'Fecha Nacimiento', 
          field: 'fechnacim', 
          sorter: 'date'
        },
        { title: 'Nacionalidad', field: 'nacionalidadbean', sorter: 'string' },
        { title: 'Profesión', field: 'profesionbean', sorter: 'string' },
        { title: 'Sexo', field: 'sexo', sorter: 'string', width: 80 },
        { title: 'Estado Civil', field: 'estadocivil', sorter: 'string', width: 120 },
        { 
          title: 'Fecha Impresión', 
          field: 'fechimpresion', 
          sorter: 'date',
        },
      ],
      paginationSize: 10,
      paginationSizeSelector: [5, 10, 20, 50],
      langs: {
        'es-es': {
          pagination: {
            first: '<<',
            first_title: 'Primera página',
            last: '>>',
            last_title: 'Última página',
            prev: '<',
            prev_title: 'Página anterior',
            next: '>',
            next_title: 'Página siguiente'
          },
          page_size: 'Registros por página'
        }
      },
      locale: true,
      layoutColumnsOnNewData: true
    });
  }

  performSearch(formData: any) {
    console.log('Formulario enviado:', formData);
    this.tabulatorTable.clearData();
    if (formData) {
      this.personaService.buscarPersonas(formData).subscribe(
        (response: any) => {
          this.tabulatorTable.setData(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Persona/as encontrada/as exitosamente.'
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al buscar personas. Por favor, intente nuevamente.'
          });
          console.error('Error al buscar personas:', error);
        }
      );
    }
  }
}
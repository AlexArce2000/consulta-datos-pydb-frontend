import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../services/persona.service';
import { Formio } from '@formio/js';
import { FormioModule } from '@formio/angular';

@Component({
  selector: 'app-consulta-listar',
  standalone: true,
  imports: [CommonModule, FormioModule],
  templateUrl: './consulta-listar.component.html',
  styleUrls: ['./consulta-listar.component.css']
})
export class ConsultaListarComponent {
  tabulatorTable: any;
  
  formDefinition = {
    components: [
      {
        type: 'textfield',
        key: 'nombre',
        label: 'Nombre',
        input: true
      },
      {
        type: 'textfield',
        key: 'apellido',
        label: 'Apellido',
        input: true
      },
      {
        type: 'textfield',
        key: 'cedula',
        label: 'Cédula de Identidad',
        input: true
      },
      {
        type: 'datetime',
        key: 'fechaNac',
        label: 'Fecha de Nacimiento',
        input: true,
        widget: {
          type: 'calendar',
          displayInTimezone: 'utc',
          locale: 'es',
          useLocaleSettings: true,
          allowInput: true,
          mode: 'single',
          enableTime: false,
          noCalendar: false,
          format: 'yyyy-MM-dd',
          hourIncrement: 1,
          minuteIncrement: 1,
          time_24hr: false
        }
      },
      {
        type: 'button',
        key: 'submit',
        label: 'Buscar',
        action: 'submit',
        theme: 'primary'
      }
    ]
  };

  constructor(private personaService: PersonaService) {}

  ngOnInit() {
    this.initTabulator();
  }

  initTabulator(data: any[] = []) {
    this.tabulatorTable = new Tabulator('#personas-table', {
      data: data,
      height: '500px',
      layout: 'fitColumns',
      placeholder: 'No se encontraron registros',
      columns: [
        { title: 'Cédula', field: 'cedula', sorter: 'number', width: 120 },
        { title: 'Nombre', field: 'nombres', sorter: 'string' },
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

  onSubmit(event: any) {
    console.log('Formulario enviado:', event.data);
    if (event.data) {
      this.personaService.buscarPersonas(event.data).subscribe(
        (response: any) => {
          this.tabulatorTable.setData(response);
        },
        (error) => {
          console.error('Error al buscar personas:', error);
          this.tabulatorTable.clearData();
        }
      );
    }
  }
}
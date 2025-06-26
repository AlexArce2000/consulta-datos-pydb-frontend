import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsultaListarComponent } from './consulta/consulta-listar/consulta-listar.component';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConsultaListarComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'consulta-datos-pydb-frontend';
}

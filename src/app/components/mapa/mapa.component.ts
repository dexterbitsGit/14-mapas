import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  // lat = -41.465328;
  // lng = -72.992860;

  marcadores: Marcador[] = [];

  lat = -41.465328;
  lng = -72.99286;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
    // const nuevoMarcador = new Marcador(-41.465328, -72.992860);

    // this.marcadores.push( nuevoMarcador );

    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit(): void {}

  agregarMarcador(evento) {
    const coords: { lat: number; lng: number } = evento.coords;

    const nuevoMarcador = new Marcador(coords.lat, coords.lng);

    this.marcadores.push(nuevoMarcador);

    this.guardarStorage();
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  borrarMarcador(i: number) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador Borrado', 'Cerrar', { duration: 3000 });
  }

  editarMarcador(marcador: Marcador) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;

      this.guardarStorage();
      this.snackBar.open('Marcador Actualizado', 'Cerrar', { duration: 3000 });
    });
  }
}

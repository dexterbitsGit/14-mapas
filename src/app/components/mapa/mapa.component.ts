import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  // lat = -41.465328;
  // lng = -72.992860;

  marcadores: Marcador [] = [];

  lat = -41.465328;
  lng = -72.992860;

  constructor() {

    const nuevoMarcador = new Marcador(-41.465328, -72.992860);

    this.marcadores.push( nuevoMarcador );
   }

  ngOnInit(): void {
  }

  agregarMarcador( evento ){

    console.log(evento);
    
  }

}

import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSujeridos: Country[] = [];
  mostrarSujerencias: boolean = false;

  constructor(private paisService: PaisService){}

  buscar(termino: string){

    this.mostrarSujerencias = false;
    this.hayError = false;
    this.termino = termino;
    
    this.paisService.buscarPais(termino)
      .subscribe((paises) => {
        console.log(paises);
        
        this.paises = paises;

      }, (err) => {
        this.hayError = true;
        this.paises = [];
      });
  }

  sugerencias(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSujerencias = true;
    //crear sujerencias
    this.paisService.buscarPais(termino)
      .subscribe(
        paises => this.paisesSujeridos = paises.splice(0, 5),
        (err) => this.paisesSujeridos = []
      );
  }

  buscarSujerido(termino: string){
    this.buscar(termino);
  }

}

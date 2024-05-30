import { Component, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HeroesService } from '../../services/heroes.service';
import { switchMap, pipe, tap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{

  // Estable el formulario como un formulario reactivo
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),              
    superhero: new FormControl<string>('', { nonNullable: true }),  // No permite que el valor sea null, siempre va a ser un string      
    publisher: new FormControl<Publisher>( Publisher.DCComics ),        
    alter_ego: new FormControl(''),      
    first_appearance: new FormControl(''), 
    characters: new FormControl(''),       
    alt_img:    new FormControl(''), 
  });

  // Propiedad para establecer los valores del mat-select 'Creador'
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
  ){}

  ngOnInit(): void {

    if ( !this.router.url.includes( 'edit' ) ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroeService.getHeroById(id) )
      ).subscribe( heroe =>{

        if ( !heroe ) {
          return this.router.navigateByUrl('/');
        }
        // Establece los valores que vienen desde el backend del heroe al formulario
        this.heroForm.reset( heroe );
        return;
          
      })
  }

  // Usa el get para asignar la información que tiene el formulario del heroe a currenHero
  get currenHero(): Hero{    
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit():void {
    if ( this.heroForm.invalid ) return;    

    // Valida si el heroe tienen id, si es así es porque se quiere actualizar
    if( this.currenHero.id ){
      this.heroeService.updateHero( this.currenHero )
        .subscribe( hero =>{
          this.showSanckbar(`¡${ hero.superhero } actualizado con éxito!`);
        });

      return;    
    }

    // Si no tiene id, es porque se quiere crear un heroe nuevo
    this.heroeService.addHero( this.currenHero )
      .subscribe( hero =>{
        this.router.navigate(['/heroes/edit', hero.id])
        this.showSanckbar(`¡${ hero.superhero } creado con éxito!`);        
      });

  }

  // Snackbar que se muestra durante 2,5 segundos
  showSanckbar( message: string ): void {
    this.snackbar.open( message, 'done', {
      duration: 2500
    });
  }
    
  

}

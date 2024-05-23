import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
    providedIn: 'root'
})
export class HeroesService {

    private baseUrl: string = environments.baseUrl;
    
    constructor( private http: HttpClient ) { }

    getHero(): Observable<Hero[]> {

        return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
    }

    getHeroById( id: string ): Observable<Hero | undefined>{
        
        return this.http.get<Hero>(`${this.baseUrl}/heroes/${ id } `)
            .pipe(
                catchError( error => of(undefined) )
            )
    }

}
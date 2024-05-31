import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = environments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }

    get currentUser(): User | undefined {
        if( !this.user ) return undefined;
        return structuredClone( this.user ); // Esta es la solución que se implemento con Javascript para un clon profundo
    }

    login( email:string, password: string ): Observable<User>{

        return this.http.get<User>(`${ this.baseUrl }/users/1`)
                .pipe(
                    tap( user => this.user = user ),
                    tap( user => localStorage.setItem('token', 'asdaASasd.dasdeda.ASDsdafds') )
                )
    }

    logout(): void {
        this.user = undefined;
        localStorage.clear();
    }

}
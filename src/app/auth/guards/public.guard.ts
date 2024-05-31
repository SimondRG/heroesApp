import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable, tap, map} from 'rxjs';


const checkAuthStatus = (): Observable<boolean> => {

    const authService:AuthService = inject(AuthService);
    const router: Router = inject(Router);

    return authService.checkAuthentication()
        .pipe(
            tap( isAuthenticated => console.log({'Authenticated': isAuthenticated}) ),
            tap( isAuthenticated =>{ 
                if ( isAuthenticated ){
                    router.navigate(['./']);
                } 
            }),
            map( isAuthenticated => !isAuthenticated )
        );


}


//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const publicGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => { //Hay que tener en cuenta el tipado CanActiveFn
    //console.log('CanActivate');
    //console.log({ route, state });
    return checkAuthStatus();
};

  
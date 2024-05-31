import { ActivatedRouteSnapshot, CanActivateFn,  CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable, pipe, tap, of } from 'rxjs';


const checkAuthStatus = (): Observable<boolean> => {

    const authService:AuthService = inject(AuthService);
    const router: Router = inject(Router);

    return authService.checkAuthentication()
        .pipe(
            tap( isAuthenticated => console.log({'Authenticated': isAuthenticated}) ),
            tap( isAuthenticated =>{ 
                if ( !isAuthenticated ){
                    router.navigate(['/auth/login']);
                } 
            })
        );


}


//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canMatchGuard: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => { //Tipado CanMatchFN
    //console.log('CanMatch');
    //console.log({ route, segments });
    return checkAuthStatus();
};

export const canActivateGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => { //Hay que tener en cuenta el tipado CanActiveFn
    //console.log('CanActivate');
    //console.log({ route, state });
    return checkAuthStatus();
};

  
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from '../../../models/user.model';
import { AuthModel } from '../../../models/auth.model';
import { UsersTable } from '../../../../../_fake/users.table';
import { environment } from '../../../../../../environments/environment';

const API_USERS_URL = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {

  constructor(
    private http: HttpClient,
    ) {}

  public userLiber:any

  // public methods
  login(email: string, password: string, objLiber:any): Observable<any> {
    const notFoundError = new Error('Not Found');
    email       = 'admin@demo.com';
    password    = 'demo';
    if (!email || !password) {
      return of(notFoundError);
    }

    return this.getAllUsers().pipe(
      map((result: UserModel[]) => {
        if (result.length <= 0) {
          return notFoundError;
        }

        const user = result.find((u) => {
            return (
              u.email.toLowerCase() === email.toLowerCase() &&
              u.password === password
            );
          });
          if (!user) {
            return notFoundError;
          }
          // NUEVO CHES
          // console.log(objLiber)
          sessionStorage.setItem('nombre',      objLiber.nombres);
          sessionStorage.setItem('paterno',     objLiber.primer_apellido);
          sessionStorage.setItem('materno',     objLiber.segundo_apellido);
          sessionStorage.setItem('tipoManejo',  objLiber.acceso_activos.idrol);
          sessionStorage.setItem('access_token',objLiber.access_token);

          // console.log(objLiber.access_token)
          
          // END  NUEVO CHES

          const auth = new AuthModel();
          auth.authToken = user.authToken;
          auth.refreshToken = user.refreshToken;
          auth.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
          return auth;
      })
    );
  }

  createUser(user: UserModel): Observable<any> {
    user.roles = [2]; // Manager
    user.authToken = 'auth-token-' + Math.random();
    user.refreshToken = 'auth-token-' + Math.random();
    user.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
    user.pic = './assets/media/avatars/300-1.jpg';

    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map((result: UserModel[]) => {
        const user = result.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        return user !== undefined;
      })
    );
  }

  getUserByToken(token: string): Observable<UserModel | undefined> {
    const user = UsersTable.users.find((u: UserModel) => {
      return u.authToken === token;
    });

    if (!user) {
      return of(undefined);
    }

    return of(user);
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(API_USERS_URL);
  }

  
}

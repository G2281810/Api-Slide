import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient,
    private jwtHelper:JwtHelperService) { }

  //Conectando frontend con backend

  apiUri = 'http://localhost:3000/api/v1/empleados/'

  //Mostrando todos los empleados//
  getAllEmpleados():Observable<any>
  {
    return this._http.get(`${this.apiUri}`);
  }

  //Crear un nuevo empleado//
  createEmpleados(data:any):Observable<any>
  {
    console.log(data, 'createapi=>');
    return this._http.post(`${this.apiUri}`,data);
  }

  //Eliminar empleado//
  deleteEmpleados(idempleado:any):Observable<any>
  {
    let idem = idempleado;
    return this._http.delete(`${this.apiUri}/${idem}`)
  }
  //actualizar información//
  updateEmpleados(data:any,idempleado:any):Observable<any>
  {
    let idem= idempleado;
    return this._http.put(`${this.apiUri}/${idem}`,data);
  }

  //Ver un solo empleado//
  getSingleEmpleados(idempleado:any):Observable<any>
  {
    let idem = idempleado;
    return this._http.get(`${this.apiUri}/${idem}`);
  }
  //Login//
  login(empleado:any){
    return this._http.post(`${this.apiUri}login`,empleado)
  }
  //Verificar validación del token/7
  isAuth():boolean{
    const token = localStorage.getItem('token') as string;
    const refresToken = token;
    if(this.jwtHelper.isTokenExpired(refresToken) || !localStorage.getItem('token')){
      return false;
    }else{
      return true;
    }
  }
}

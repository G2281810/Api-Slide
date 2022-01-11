import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-info-empleados',
  templateUrl: './info-empleados.component.html',
  styleUrls: ['./info-empleados.component.css']
})
export class InfoEmpleadosComponent implements OnInit {

  constructor(private service:ApiserviceService, private router:ActivatedRoute, private rutas:Router) { }
  getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('idempleado');
      this.service.getSingleEmpleados(this.getparamid).subscribe((res)=>{
        console.log(res, 'res=>>');
        this.empleadosForm.patchValue({
          nombre:res[0].nombre,
          appaterno:res[0].appaterno,
          apmaterno:res[0].apmaterno,
          email:res[0].email,
          password:res[0].password,
          puesto:res[0].puesto,
          fecha_n:res[0].fecha_n,
          domicilio:res[0].domicilio,
          habilidad:res[0].habilidad
        });
      });
    

  }
  
  empleadosForm = new FormGroup({
    'nombre':new FormControl('',Validators.required),
    'appaterno':new FormControl('',Validators.required),
    'apmaterno':new FormControl('',Validators.required),
    'email':new FormControl('',Validators.required),
    'password':new FormControl('',[Validators.required, Validators.minLength(3)]),
    'puesto':new FormControl('',Validators.required),
    'fecha_n':new FormControl('',Validators.required),
    'domicilio':new FormControl('',Validators.required),
    'habilidad':new FormControl('',Validators.required),
  });

  regresar(){
    this.rutas.navigate(['lista-empleados']);
  }
}

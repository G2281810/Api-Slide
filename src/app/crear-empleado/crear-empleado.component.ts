import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {
   //Validaciones para el formulario//
   textovalidado: any =/^(([a-z A-z ]+))$/;
  constructor(private service:ApiserviceService, private router:ActivatedRoute, private routas:Router) { }



  errormsg:any;
  successmsg:any;
  getparamid:any;
  ngOnInit(): void { 
    this.getparamid = this.router.snapshot.paramMap.get('idempleado');
    if(this.getparamid){
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
    
  }
  empleadosForm = new FormGroup({
    'nombre':new FormControl('',[Validators.required, Validators.pattern(this.textovalidado)]),
    'appaterno':new FormControl('',[Validators.required, Validators.pattern(this.textovalidado)]),
    'apmaterno':new FormControl('',[Validators.required, Validators.pattern(this.textovalidado)]),
    'email':new FormControl('',[Validators.required,Validators.email]),
    'password':new FormControl('',[Validators.required,Validators.minLength(3)]),
    'puesto':new FormControl('',[Validators.required, Validators.pattern(this.textovalidado)]),
    'fecha_n':new FormControl('',[Validators.required]),
    'domicilio':new FormControl('',[Validators.required]),
    'habilidad':new FormControl('',[Validators.required, Validators.pattern(this.textovalidado)]),
  });

  get nombre(){ return this.empleadosForm.get('nombre');}
  get appaterno(){ return this.empleadosForm.get('appaterno');}
  get apmaterno(){ return this.empleadosForm.get('apmaterno');}
  get email(){ return this.empleadosForm.get('email');}
  get password(){ return this.empleadosForm.get('password');}
  get puesto(){ return this.empleadosForm.get('puesto');}
  get fecha_n(){ return this.empleadosForm.get('fecha_n');}
  get domicilio(){ return this.empleadosForm.get('domicilio');}
  get habilidad(){ return this.empleadosForm.get('habilidad');}
  
  empleadosSubmit(){
    if(this.empleadosForm.valid){
      console.log(this.empleadosForm.value);
      this.service.createEmpleados(this.empleadosForm.value).subscribe((res)=>{
        this.empleadosForm.reset();
        this.successmsg = res.message;
        this.routas.navigate(['lista-empleados']);
      });
    }else{
      this.errormsg = 'Todos los campos son requeridos';
    }
    
  }

  empleadosUpdate(){
    console.log(this.empleadosForm.value, 'updatedform');

    if(this.empleadosForm.valid){
      this.service.updateEmpleados(this.empleadosForm.value, this.getparamid).subscribe((res)=>{
        console.log(res,'resupdated');
        this.successmsg = res.message;
      });
    }else{
      this.errormsg = 'Todos los campos son obligatorios';
    }
  }
}

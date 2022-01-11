import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-lista-empleado',
  templateUrl: './lista-empleado.component.html',
  styleUrls: ['./lista-empleado.component.css']
})
export class ListaEmpleadoComponent implements OnInit {
  
  public page: number | undefined;
  
  constructor(private service:ApiserviceService) { }
  successmsg:any;
  readData:any;
  

  ngOnInit(): void {
    this.getAllData();
  }

  //Eliminado empleado por id//
  deleteID(idempleado:any)
  {
    console.log(idempleado, 'deleteid==>');
    this.service.deleteEmpleados(idempleado).subscribe((res)=>{
      console.log(res,'deleteres==>');
      this.successmsg = res.message;
      this.getAllData();
    });
  }

  //Funcion para mostrar la información//
  getAllData(){
    this.service.getAllEmpleados().subscribe((res)=>{
      console.log(res,"res==>");
      this.readData = res;
    });
  }
  pageSize = 5;
  cambiarPagina(e:PageEvent){
    console.log(e);
  }
}

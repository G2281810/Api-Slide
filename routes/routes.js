const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');

//Petición GET todos los empleados //
routes.get('/', (req, res)=>{
    req.getConnection((error, conn)=>{
        if(error) res.status(500).send('Error de servidor');

        conn.query('SELECT * FROM empleados', (err,rows)=>{
            if(err) res.status(404).send('Empleados no encontrados');

            res.status(200);
            res.json(rows);

            if(rows == null){
                console.log("No se encontraron registros");
            }else{
                let result = Object.values(JSON.parse(JSON.stringify(rows)));
                console.log(result);
            }
        });
    });
});


//Petición para el login//
routes.post('/login', (req,res)=>{

    const {email, password} = req.body;
    req.getConnection((error, conn)=>{
        conn.query('select email,password from empleados where email=? and password=?',
        [email,password],
        (error,rows,fields)=>{
            if(!error){
                if(rows.length >0){
                    let data = JSON.stringify(rows[0]);
                    const token = jwt.sign(data, 'stil');
                    res.json({token});
                    console.log(token);
                }else{
                    res.send('correo o contraseña incorrectos');
                }
            }else{
                res.send(error);
                res.send('correo o contraseña incorrectos');
            }
        });
    });
});

routes.post('/test',verifyToken, (req,res)=>{
    
    res.json('Información secreta');
});

function verifyToken(req,res, next){
    if(!req.headers.authorization) return res.status(401).json('No autorizado');
    const token = req.headers.authorization.substr(7);
    if(token!==''){
        const content = jwt.verify(token, 'stil');
        req.data = content;
        next(); 
    }else{
        res.status(401).json('Token vacio o invalido');
    }
    
}

//Petición Get un solo empleado//
routes.get('/:idempleado',(req,res)=>{
    req.getConnection((error, conn)=>{

        let idempleado = req.params.idempleado;
        let consulta = `select * from empleados where idempleado = ${idempleado}`;

        conn.query(consulta,(error,result)=>{

            if(error){
                console.log(error);
            }else{
                if(consulta==null){
                    res.send("No se encontro el empleado con el id ingresado");
                }else{
                    res.send(result);
                }
            }
        });
    });
});

// Petición POST agregar un nuevo empleado//
routes.post('/',(req,res)=>{
    req.getConnection((error, conn)=>{

        let nombre = req.body.nombre;
        let appaterno = req.body.appaterno;
        let apmaterno = req.body.apmaterno;
        let email = req.body.email;
        let password = req.body.password;
        let puesto = req.body.puesto;
        let fecha_n = req.body.fecha_n;
        let domicilio = req.body.domicilio;
        let habilidad = req.body.habilidad;

        let consulta = `insert into empleados(nombre, appaterno, apmaterno, email, password, puesto, fecha_n, domicilio, habilidad)
                        values('${nombre}','${appaterno}','${apmaterno}','${email}','${password}','${puesto}','${fecha_n}','${domicilio}','${habilidad}')`;
        conn.query(consulta,(error,result)=>{
            if(error){
                console.log(error);
                res.send({message:'Error al registrar empleado'});
            }else{
                res.send({message:'Empleado agregado correctamente'});
            }
        }); 
        
    });
});

//Petición Put actualizar empleados//
routes.put('/:idempleado',(req,res)=>{

    req.getConnection((err, conn)=>{
        let idempleado = req.params.idempleado;
        let nombre = req.body.nombre;
        let appaterno = req.body.appaterno;
        let apmaterno = req.body.apmaterno;
        let email = req.body.email;
        let password = req.body.password;
        let puesto = req.body.puesto;
        let fecha_n = req.body.fecha_n;
        let domicilio = req.body.domicilio;
        let habilidad = req.body.habilidad;
        let consulta = `update empleados set nombre = '${nombre}', appaterno = '${appaterno}',
                        apmaterno = '${apmaterno}', email = '${email}', password = '${password}',
                        puesto = '${puesto}', fecha_n = '${fecha_n}',
                        domicilio = '${domicilio}', habilidad = '${habilidad}' where idempleado = ${idempleado}`;
        conn.query(consulta,(req,result)=>{
            if(consulta == err){
                res.send({message:"Error al actualizar"});
            }
            res.send({message:"Empleado actualizado correctamente"});
        });
    });
});

//Petición delete borrar empleados//
routes.delete('/:idempleado',(req,res)=>{
    req.getConnection((error,conn)=>{
        let idempleado = req.params.idempleado;
        let consulta = `Delete from empleados where idempleado='${idempleado}'`;
        conn.query(consulta,(error,result)=>{
            if(error){
                res.send(404).send("Eror al eliminar empleado");
            }else{
                res.send({message: 'Empleado eliminado'});
            }
        });
    });
});


module.exports = routes;
//Requerimientos
const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

const app = express();

//Conexión a base de datos y asignación del puerto//
dbOption = {
    host: "localhost",
	user: "root",
    password: "",
	database: "empleados",
}
app.set('port', process.env.PORT || 3000)

//midddlewares//
app.use(myconn(mysql, dbOption, 'single'));
app.use(express.json());
app.use(bodyParser.json())

//Creando la URI//
app.use('/api/v1/empleados', routes);

//Creando servidor//
app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en el puerto', app.get('port'));
});



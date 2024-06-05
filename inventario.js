const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//------------conexión con la base de datos-----------------
const {connection} = require("../config/config.db");

const getInventario = (request, response) => {
    connection.query("SELECT * FROM inventario", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//ruta
app.route("/inventario").get(getInventario);
module.exports = app;


/------------aqui va mi primer post---------------/
const postInventario = (request, response) => {
    const {action, IdPantalla, Identificador, ModeloTv, Fecha_Entrada, Fecha_Salida, Roles_IdRol, Activo, Cliente_IdCliente, Reporte_IdReporte, Usuarios_IdUsuario} = request.body;
    if(action == "insert"){
    connection.query("INSERT INTO inventario(Identificador, ModeloTv, Fecha_Entrada, Fecha_Salida, Roles_IdRol, Activo, Cliente_IdCliente, Reporte_IdReporte, Usuarios_IdUsuario) values (?,?,?,?,?,?,?,?,?)",
    [Identificador, ModeloTv, Fecha_Entrada, Fecha_Salida, Roles_IdRol, Activo, Cliente_IdCliente, Reporte_IdReporte, Usuarios_IdUsuario],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item añadido correctamente": results.affectedRows});

    });
    }
    //---------------EDITAR---------------------
    else{
         //console.log(action);return false;
         connection.query("UPDATE inventario SET Identificador = ?, ModeloTv= ?, Fecha_Entrada= ?, Fecha_Salida= ?, Roles_IdRol= ?, Activo= ?, Cliente_IdCliente= ?, Reporte_IdReporte= ?, Usuarios_IdUsuario= ? WHERE IdPantalla = ?", 
         [Identificador, ModeloTv, Fecha_Entrada, Fecha_Salida, Roles_IdRol, Activo, Cliente_IdCliente, Reporte_IdReporte, Usuarios_IdUsuario, IdPantalla],
         (error, results) => {
             if(error)
                 throw error;
             response.status(201).json({"Item actualizado correctamente": results.affectedRows});
         });
    }
};

app.route("/inventario").post(postInventario);
module.exports = app;

//-------------Eliminar----------------
const delInventario = (request, response) => {
    const id = request.params.id;
    //console.log(id);return false;
    connection.query("DELETE FROM inventario WHERE IdPantalla = ?",
    [id],
    (error, results) => {
        if(error)
            throw error;
    response.status(201).json({"Item eliminado":results.affectedRows});
    });
};    
app.route("/inventario/:id").delete(delInventario);//nomeacuerdosiel"id" es como se llama en la base de datos
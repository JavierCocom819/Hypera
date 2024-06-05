const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//conexión con la base de datos
const {connection} = require("../config/config.db");

const getUsuario = (request, response) => {
    connection.query("SELECT * FROM usuarios", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//ruta
app.route("/usuario").get(getUsuario);
module.exports = app;



const delUsuario = (request,response) => {
    const id = request.params.id;
    connection.query("DELETE FROM usuarios WHERE IdUsuario= ?",
    [id],
    (error,results)=>{
        if(error)
        throw error;
    response.status(201).json({"Item eliminado":results.affectedRows});
    });


};

app.route("/usuario/:id").delete(delUsuario);



/*aqui va mi primer post*/
const postUsuario = (request, response) => {
    const {action,IdUsuario,Nombre, Apellido, Usuario,Email, Roles_IdRol} = request.body;
    //console.log(action);return false;
    if(action == "insert"){
        connection.query("INSERT INTO usuarios (Nombre, Apellido, Usuario,Email, Roles_IdRol) VALUES (?,?,?,?,?)", 
        [Nombre, Apellido, Usuario,Email, Roles_IdRol],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Item añadido correctamente": results.affectedRows});
        });
    }
    else{
        //console.log(action);return false;
        connection.query("UPDATE usuarios SET Nombre = ?, Apellido = ?, Usuario= ?,Email = ? , Roles_IdRol = ? WHERE IdUsuario = ?", 
        [ Nombre, Apellido, Usuario,Email,Roles_IdRol, IdUsuario],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Item actualizado correctamente": results.affectedRows});
        });
    }
};
app.route("/usuario").post(postUsuario);


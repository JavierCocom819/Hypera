const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//conexión con la base de datos
const {connection} = require("../config/config.db");

const getCliente = (request, response) => {
    connection.query("SELECT * FROM cliente", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/cliente").get(getCliente);
module.exports = app;



const postCliente = (request, response) => {
    const {action,IdCliente,Nombre, Telefono, Email} = request.body;

    if(action == "insert"){
        connection.query("INSERT INTO cliente (Nombre, Telefono, Email) VALUES (?,?,?)", 
        [Nombre, Telefono, Email],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Item añadido correctamente": results.affectedRows});
        });
    }
    else{
        //console.log(action);return false;
        connection.query("UPDATE cliente SET Nombre = ?, Telefono =?, Email= ? WHERE IdCliente = ?" ,
        [Nombre, Telefono, Email, IdCliente],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Item actualizado correctamente": results.affectedRows});
        });
    }
};
app.route("/cliente").post(postCliente);
module.exports = app;


const delCliente = (request,response) => {
    const id = request.params.id;
    connection.query("DELETE FROM cliente WHERE IdCliente = ?",
    [id],
    (error,results)=>{
        if(error)
        throw error;
    response.status(201).json({"Item eliminado":results.affectedRows});
    });


};

app.route("/cliente/:id").delete(delCliente);
module.exports = app
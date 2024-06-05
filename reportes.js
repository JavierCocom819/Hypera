const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//conexión con la base de datos
const {connection} = require("../config/config.db");

const getReporte = (request, response) => {
    connection.query("SELECT * FROM reporte", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/reportes").get(getReporte);
module.exports = app;



const postReporte = (request, response) => {
    const {action,IdReporte,Problema, Requerimiento, ReporteFinal, CostoFinal} = request.body;

    if(action == "insert"){
        connection.query("INSERT INTO reporte ( Problema, Requerimiento, ReporteFinal, CostoFinal) VALUES (?,?,?,?)", 
        [Problema, Requerimiento, ReporteFinal, CostoFinal],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Item añadido correctamente": results.affectedRows});
        });
    }
    else{
        //console.log(action);return false;
        connection.query("UPDATE reporte SET Problema = ?, Requerimiento =?, ReporteFinal= ? ,CostoFinal = ?  WHERE IdReporte = ? ", 
        [Problema, Requerimiento, ReporteFinal, CostoFinal, IdReporte],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Item actualizado correctamente": results.affectedRows});
        });
    }
};
app.route("/reportes").post(postReporte);
module.exports = app;


const delReporte = (request,response) => {
    const id = request.params.id;
    connection.query("DELETE FROM reporte WHERE IdReporte = ?",
    [id],
    (error,results)=>{
        if(error)
        throw error;
    response.status(201).json({"Item eliminado":results.affectedRows});
    });


};

app.route("/reportes/:id").delete(delReporte);
module.exports = app;
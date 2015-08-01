module.exports = function(sequelize, DataTypes){
    return sequelize.define('Quiz', 
        {pregunta: {
            type: DataTypes.STRING,
            validate: {notEmpty: {mst: "-> Falta Pregunta"}} 
            },
         respuesta:{
             type: DataTypes.STRING,
             validate: {notEmpty: {msg: "-> Falta Respuesta"}}
            },
         categoria:{
            type: DataTypes.STRING
         }
        });
}

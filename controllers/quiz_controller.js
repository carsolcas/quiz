var models = require('../models/models.js');

exports.question = function(req, res){
    models.Quiz.findAll().success(function(quiz){
        res.render('quizes/question', {pregunta: quiz[0].pregunta});
    });
}

exports.answer = function(req, res){
    models.Quiz.findAll().success(function(quiz){
        var answer = (req.query.answer == quiz[0].respuesta) ? 'Correcto' : 'Incorrecto';
        res.render('quizes/answer', {respuesta: answer});
    });
}

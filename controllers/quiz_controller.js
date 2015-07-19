var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
    models.Quiz.find(quizId).then(
        function(quiz){
            if(quiz){
                req.quiz = quiz;
                next();
            }else next(new Error('No existe quizId=' + quizId));
        }
    ).catch(function(error){ next(error);});
}


exports.show = function(req, res){
    res.render('quizes/show', {quiz: req.quiz});
}

exports.answer = function(req, res){
    var answer = (req.query.answer == req.quiz.respuesta) ? 'Correcto' : 'Incorrecto';
    res.render('quizes/answer', {respuesta: answer, quiz: req.quiz});
}

exports.index = function(req, res){
    models.Quiz.findAll(req.params.quizId).then(function(quizes){
        res.render('quizes/index', {quizes: quizes});
    });
}

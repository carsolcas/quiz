var models = require('../models/models.js');
var categorias = ["Otro", "Humanidades", "Ocio", "Ciencia", "Tecnología" ]; 

exports.load = function(req, res, next, quizId){
    models.Quiz.find({where: {id: Number(quizId)},
                     include: [{model: models.Comment}]}
        ).then(
        function(quiz){
            if(quiz){
                req.quiz = quiz;
                next();
            }else next(new Error('No existe quizId=' + quizId));
        }
    ).catch(function(error){ next(error);});
}


exports.show = function(req, res){
    res.render('quizes/show', {quiz: req.quiz, errors: []});
}

exports.answer = function(req, res){
    var answer = (req.query.answer == req.quiz.respuesta) ? 'Correcto' : 'Incorrecto';
    res.render('quizes/answer', {respuesta: answer, quiz: req.quiz, errors: []});
}

exports.new = function(req, res){
    var quiz = models.Quiz.build({pregunta: "Pregunta", respuesta: "Respuesta"});
    res.render('quizes/new', {quiz: quiz, errors: [], categorias: categorias});
}

exports.edit= function(req, res){
    var quiz = req.quiz;
    res.render('quizes/edit', {quiz: quiz, errors: [], categorias: categorias});
}

exports.destroy= function(req, res){
    req.quiz.destroy().then(function(){
        res.redirect('/quizes');
    }).catch(function(error){next(error)});
}

exports.update = function(req, res){
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.categoria = req.body.quiz.categoria;
    
    req.quiz
    .validate()
    .then(
        function(err){
            if(err){
                res.render('quizes/edit', {"quiz": req.quiz, errors: err.errors});
            }else{
                req.quiz
                .save({fields: ["pregunta", "respuesta", "categoria"]})
                .then(function(){res.redirect('/quizes');});
            }
        }
    );
}

exports.create= function(req, res){
    var quiz = models.Quiz.build(req.body.quiz);

    quiz
    .validate()
    .then(
       function(err){
            if (err){
                res.render("/quizes/new", {quiz: quiz, errors: err.errors});
            }else{
                quiz.save({fields: ["pregunta", "respuesta", "categoria"]})
                    .then(function(){res.redirect('/quizes');});
            }
        });
}

exports.index = function(req, res){
    var filters = {};
    var q = req.query.q || '';

    if (q)
        filters = {
            where: {
                pregunta:{like: '%' + q + '%'}
            }
        }

    models.Quiz.findAll(filters).then(function(quizes){
        res.render('quizes/index', {quizes: quizes, q: q, errors: []});
    });
}

exports.question = function(req, res){
    res.render('quizes/question', {pregunta: 'Capital de Italia', title: 'Quiz'});
}

exports.answer = function(req, res){
    var answer = (req.query.answer == 'Roma') ? 'Correcto' : 'Incorrecto';
    res.render('quizes/answer', {respuesta: answer, title: 'Quiz'});
}

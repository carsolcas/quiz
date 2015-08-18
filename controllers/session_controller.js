var models = require('../models/models');

exports.loginRequired = function(req,res, next){
  if(req.session.user) {
    next();
  } else{
    res.redirect('/login');
  }
}


// session/new
exports.new = function(req, res) {
  var errors = req.session.errors || {};
  req.session.errors = {}

  res.render('sessions/new', {errors: errors})
}

//POST session/create -- crea la session
exports.create = function(req, res) {
	var login = req.body.login;
  var password = req.body.password;
  var userController = require('./user_controller');
  userController.autenticar(login, password, function(error, user) {

    if (error) {
      req.session.errors = [{"message": 'Se ha producido un error:' + error}];
      res.redirect("/login");
      return;
    }

      //crear req.session.user y guardar los campos id y username
      //la session se define por la existencia de: req.session.user
      req.session.user = {id:user.id, username:user.username};
      res.redirect(req.session.redir.toString()); //redireccion a path anterior a login
    });
};


exports.destroy = function(req, res) {
  delete req.session.user;
  res.redirect(req.session.redir.toString());  // redirect a path anterior a login
}

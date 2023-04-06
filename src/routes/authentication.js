// Importar los paquetes necesarios
const express = require('express'); // Framework web para Node.js
const router = express.Router(); // Enrutador de Express
const passport = require('passport'); // Middleware de autenticación
const { isLoggedIn } = require('../lib/auth'); // Función de autenticación
const { isNotLoggedIn } = require('../lib/auth'); // Función de autenticación

// Ruta para mostrar la página de registro
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup'); // Renderizar la vista de registro
});

// Ruta para procesar el formulario de registro
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile', // Redirigir al perfil si la autenticación es exitosa
    failureRedirect: '/signup', // Redirigir al registro si la autenticación falla
    failureFlash: true // Mostrar un mensaje flash si la autenticación falla
}));

// Ruta para mostrar la página de inicio de sesión
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin'); // Renderizar la vista de inicio de sesión
});

// Ruta para procesar el formulario de inicio de sesión
router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile', // Redirigir al perfil si la autenticación es exitosa
        failureRedirect: '/signin', // Redirigir al inicio de sesión si la autenticación falla
        failureFlash: true // Mostrar un mensaje flash si la autenticación falla
    })(req, res, next);
});

// Ruta para mostrar el perfil del usuario
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile'); // Renderizar la vista de perfil
});

// Ruta para cerrar la sesión del usuario
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut(); // Cerrar la sesión del usuario
    res.redirect('/signin'); // Redirigir al inicio de sesión
});

// Exportar el enrutador para su uso en otras partes de la aplicación
module.exports = router;
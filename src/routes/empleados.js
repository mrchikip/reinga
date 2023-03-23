const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');



router.get('/add', isLoggedIn, async(req, res) => {
    const proceso = await pool.query('SELECT * FROM proceso');
    const ccostos = await pool.query('SELECT * FROM ccostos');
    const lider = await pool.query('SELECT * FROM lider');
    res.render('empleados/add', { proceso, ccostos, lider });
});



router.post('/add', isLoggedIn, async(req, res) => {
    const { id, nombreEmpleado, apellidoEmpleado, centroCosto, proceso, lider } = req.body;
    const newEmpleado = {
        id,
        nombreEmpleado,
        apellidoEmpleado,
        centroCosto,
        proceso,
        lider
    };
    await pool.query('INSERT INTO empleados set ?', [newEmpleado]);
    req.flash('success', 'Registro guardado satisfactoriamente');
    res.redirect('/empleados');
});


router.get('/', isLoggedIn, async(req, res) => {
    const empleados = await pool.query('SELECT * FROM empleados');
    res.render('empleados/list', { empleados });
});

router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM empleados WHERE ID = ?', [id]);
    req.flash('success', 'Registro eliminado satisfactoriamente');
    res.redirect('/empleados');
});

router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const proceso = await pool.query('SELECT * FROM proceso');
    const centroCosto = await pool.query('SELECT * FROM ccostos');
    const lider = await pool.query('SELECT * FROM lider');
    const empleados = await pool.query('SELECT * FROM empleados WHERE ID = ?', [id]);
    res.render('empleados/edit', { proceso, centroCosto, lider, empleados: empleados[0] });
});

router.post('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.body;
    const { nombreEmpleado, apellidoEmpleado, centroCosto, proceso, lider } = req.body;
    const editEmpleado = {
        nombreEmpleado,
        apellidoEmpleado,
        centroCosto,
        proceso,
        lider
    };
    await pool.query('UPDATE empleados set ? WHERE ID = ?', [editEmpleado, id]);
    req.flash('success', 'Registro actualizado satisfactoriamente');
    res.redirect('/empleados');
});

module.exports = router;
const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


// router.get('/hardware/add', (req, res) => {
//     res.render('modules/hardware/add');
// });

// router.post('/hardware/add', isLoggedIn, async(req, res) => {
//     const { nombre_equipo, categoria, serial, sistema_operativo, modelo, fabricante, procesador, ram, tipo_almacenamiento, capacidad_almacenamiento } = req.body;
//     const newRegistro = {
//         nombre_equipo,
//         categoria,
//         serial,
//         sistema_operativo,
//         modelo,
//         fabricante,
//         procesador,
//         ram,
//         tipo_almacenamiento,
//         capacidad_almacenamiento
//     };  
//     await pool.query('INSERT INTO equipos set ?', [newRegistro]);
//     req.flash('success', 'Registro guardado satisfactoriamente');
//     res.redirect('/modules/hardware/list');
// });


router.get('/', isLoggedIn, async(req, res) => {
    const hardware = await pool.query('SELECT * FROM equipos');
    res.render('hardware/list', { hardware });
});

// router.get('/modules/hardware/delete/:id', isLoggedIn, async(req, res) => {
//     const { id } = req.params;
//     await pool.query('DELETE FROM equipos WHERE ID = ?', [id]);
//     req.flash('success', 'Registro eliminado satisfactoriamente');
//     res.redirect('modules/hardware/list');
// });

// router.get('/hardware/edit/:id', isLoggedIn, async(req, res) => {
//     const { id } = req.params;
//     const hardware = await pool.query('SELECT * FROM equipos WHERE ID = ?', [id]);
//     res.render('/modules/hardware/edit', { hardware: hardware[0] });
// });

// router.post('/hardware/edit/:id', isLoggedIn, async(req, res) => {
//     const { id } = req.params;
//     const { nombre_equipo, categoria, serial, sistema_operativo, modelo, fabricante, procesador, ram, tipo_almacenamiento, capacidad_almacenamiento } = req.body;
//     const newRegistro = {
//         nombre_equipo,
//         categoria,
//         serial,
//         sistema_operativo,
//         modelo,
//         fabricante,
//         procesador,
//         ram,
//         tipo_almacenamiento,
//         capacidad_almacenamiento
//     };  
//     await pool.query('UPDATE equipos set ? WHERE ID = ?', [newRegistro, id]);
//     req.flash('success', 'Registro actualizado satisfactoriamente');
//     res.redirect('/src/views/modules/hardware/list.hbs');
// });

module.exports = router;
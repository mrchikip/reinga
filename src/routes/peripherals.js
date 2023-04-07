const express = require("express");
const router = express.Router();

const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/", isLoggedIn, async (req, res) => {
  const peripherals = await pool.query("SELECT * FROM peripherals");
  res.render("peripherals/list", { peripherals });
});

// router.get("/add", isLoggedIn, async (req, res) => {
//   const proceso = await pool.query('SELECT * FROM proceso');
//   const ccostos = await pool.query('SELECT * FROM ccostos');
//   const lider = await pool.query('SELECT * FROM lider');
//   res.render("people/add", { proceso, ccostos, lider });
// });

// router.post("/add", isLoggedIn, async (req, res) => {
//   const { nombre_empleado, usuario, cedula, cargo, proceso, centro_costo } = req.body;
//   const newRegistro = {
//     nombre_empleado,
//     usuario,
//     cedula,
//     cargo,
//     proceso,
//     centro_costo,
//   };

//   await pool.query("INSERT INTO usuarios SET ?", [newRegistro]);
//   req.flash("success", "Registro guardado satisfactoriamente");
//   res.redirect("/people");
// });

router.post('/search',isLoggedIn, async (req, res) => {
    const busqueda = req.body.busqueda;
    const id = await pool.query(`SELECT * FROM peripherals WHERE id LIKE '%${busqueda}%'`);
    const tipo = await pool.query(`SELECT * FROM peripherals WHERE type LIKE '%${busqueda}%'`);
    const serial = await pool.query(`SELECT * FROM peripherals WHERE serial LIKE '%${busqueda}%'`);
    const assignation = await pool.query(`SELECT * FROM peripherals WHERE assignation LIKE '%${busqueda}%'`);
  res.render('people/search', { id, tipo, serial, assignation });
});

// router.get("/edit/:cedula", isLoggedIn, async (req, res) => {
//     const { cedula } = req.params;

//     const proceso = await pool.query('SELECT * FROM proceso');
//     const ccostos = await pool.query('SELECT * FROM ccostos');
//     const lider = await pool.query('SELECT * FROM lider');
//     const persona = await pool.query('SELECT * FROM usuarios WHERE cedula = ?', [cedula]);
//     res.render('people/edit', { lider, proceso, ccostos, persona: persona[0] });
// });
  
// router.post('/edit/:cedula', isLoggedIn, async (req, res) => {
//     const { cedula } = req.params;
//     const { nombre_empleado, usuario, cargo, proceso, centro_costo } = req.body;
//     const editRegistro = {
//         nombre_empleado,
//         usuario,
//         cedula,
//         cargo,
//         proceso,
//         centro_costo
//       };
//     await pool.query('UPDATE usuarios SET ? WHERE cedula = ?', [editRegistro, cedula]);
//     req.flash('success', 'Registro actualizado satisfactoriamente');
//     res.redirect('/people');
// });

// router.get('/delete/:cedula', isLoggedIn, async(req, res) => {
//     const { cedula } = req.params;
//     await pool.query('DELETE FROM usuarios WHERE cedula = ?', [cedula]);
//     req.flash('success', 'Registro eliminado satisfactoriamente');
//     res.redirect('/people');
// });

module.exports = router;
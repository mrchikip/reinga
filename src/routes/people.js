const express = require("express");
const router = express.Router();

const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/", isLoggedIn, async (req, res) => {
  const people = await pool.query("SELECT * FROM usuarios");
  res.render("people/list", { people });
});

router.get("/add", isLoggedIn, async (req, res) => {
  const proceso = await pool.query('SELECT * FROM proceso');
  const ccostos = await pool.query('SELECT * FROM ccostos');
  res.render("people/add", { proceso, ccostos });
});

router.post("/add", isLoggedIn, async (req, res) => {
  const { nombre_empleado, usuario, cedula, cargo, proceso, centro_costo } = req.body;
  const newRegistro = {
    nombre_empleado,
    usuario,
    cedula,
    cargo,
    proceso,
    centro_costo,
  };

  await pool.query("INSERT INTO usuarios SET ?", [newRegistro]);
  req.flash("success", "Registro guardado satisfactoriamente");
  res.redirect("/people");
});

router.post('/search',isLoggedIn, async (req, res) => {
    const busqueda = req.body.busqueda;
    const persona = await pool.query(`SELECT * FROM usuarios WHERE cedula LIKE '%${busqueda}%'`);
  res.render('people/search', { persona });
  });

  router.get("/edit/:cedula", isLoggedIn, async (req, res) => {
    const { cedula } = req.params;
    const persona = await pool.query('SELECT * FROM usuarios WHERE cedula = ?', [cedula]);
    res.render('people/edit', { persona: persona[0] });
  });
  
  router.post('/edit/:cedula', isLoggedIn, async (req, res) => {
    const { cedula } = req.params;
    const { nombre_empleado, usuario, cargo, proceso, centro_costo } = req.body;
    const editRegistro = {
        nombre_empleado,
        usuario,
        cedula,
        cargo,
        proceso,
        centro_costo
      };
    await pool.query('UPDATE usuarios SET ? WHERE cedula = ?', [editRegistro, cedula]);
    req.flash('success', 'Registro actualizado satisfactoriamente');
    res.redirect('/people');
  });
  

module.exports = router;
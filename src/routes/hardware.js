const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/add", isLoggedIn, async (req, res) => {
  const assignation = await pool.query("SELECT nombre_empleado FROM usuarios");
  res.render("hardware/add", { assignation });
});

router.post("/search", isLoggedIn, async (req, res) => {
  const busqueda = req.body.busqueda;
  const compu = await pool.query(
    `SELECT * 
    FROM equipos 
    WHERE 
      nombre_equipo LIKE '%${busqueda}%' OR 
      categoria LIKE '%${busqueda}%' OR 
      sistema_operativo LIKE '%${busqueda}%' OR 
      modelo LIKE '%${busqueda}%' OR 
      fabricante LIKE '%${busqueda}%' OR 
      procesador LIKE '%${busqueda}%' OR 
      tipo_almacenamiento LIKE '%${busqueda}%' OR 
      capacidad_almacenamiento LIKE '%${busqueda}%' OR 
      propiedad LIKE '%${busqueda}%' OR 
      salud LIKE '%${busqueda}%';
      assignation LIKE '%${busqueda}%';
  `
  );
  res.render("hardware/search", { compu });
});

router.post("/add", isLoggedIn, async (req, res) => {
  const {
    nombre_equipo,
    categoria,
    serial,
    sistema_operativo,
    modelo,
    fabricante,
    procesador,
    ram,
    tipo_almacenamiento,
    capacidad_almacenamiento,
    assignation,
    propiedad,
    salud,
    fecha_ultimo_mantenimiento,
  } = req.body;
  const newRegistro = {
    nombre_equipo,
    categoria,
    serial,
    sistema_operativo,
    modelo,
    fabricante,
    procesador,
    ram,
    tipo_almacenamiento,
    capacidad_almacenamiento,
    assignation,
    propiedad,
    salud,
    fecha_ultimo_mantenimiento,
  };

  await pool.query("INSERT INTO equipos SET ?", [newRegistro]);
  req.flash("success", "Registro guardado satisfactoriamente");
  res.redirect("/hardware");
});

router.get("/", isLoggedIn, async (req, res) => {
  const hardware = await pool.query("SELECT * FROM equipos");
  res.render("hardware/list", { hardware });
});

router.get("/delete/:serial", isLoggedIn, async (req, res) => {
  const { serial } = req.params;
  await pool.query("DELETE FROM equipos WHERE serial = ?", [serial]);
  req.flash("success", "Registro eliminado satisfactoriamente");
  res.redirect("/hardware");
});

router.get("/edit/:serial", isLoggedIn, async (req, res) => {
  const { serial } = req.params;
  const assignation = await pool.query("SELECT nombre_empleado FROM usuarios");
  const hardware = await pool.query("SELECT * FROM equipos WHERE serial = ?", [
    serial,
  ]);
  res.render("hardware/edit", { assignation, hardware: hardware[0] });
});

router.post("/edit/:serial", isLoggedIn, async (req, res) => {
  const { serial } = req.params;
  const {
    nombre_equipo,
    categoria,
    sistema_operativo,
    modelo,
    fabricante,
    procesador,
    ram,
    tipo_almacenamiento,
    capacidad_almacenamiento,
    assignation,
    propiedad,
    salud,
    fecha_ultimo_mantenimiento,
  } = req.body;
  const editRegistro = {
    nombre_equipo,
    categoria,
    sistema_operativo,
    modelo,
    fabricante,
    procesador,
    ram,
    tipo_almacenamiento,
    capacidad_almacenamiento,
    assignation,
    propiedad,
    salud,
    fecha_ultimo_mantenimiento,
  };
  await pool.query("UPDATE equipos SET ? WHERE serial = ?", [
    editRegistro,
    serial,
  ]);
  req.flash("success", "Registro actualizado satisfactoriamente");
  res.redirect("/hardware");
});

module.exports = router;

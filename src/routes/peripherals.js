const express = require("express");
const router = express.Router();

const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/", isLoggedIn, async (req, res) => {
  const peripherals = await pool.query("SELECT * FROM peripherals");
  res.render("peripherals/list", { peripherals });
});

router.get("/add", isLoggedIn, async (req, res) => {
  const assignation = await pool.query("SELECT nombre_empleado FROM usuarios");
  res.render("peripherals/add", { assignation });
});

router.post("/add", isLoggedIn, async (req, res) => {
  const { serial, marca, modelo, type, salud, assignation } = req.body;
  const newRegistro = {
    serial,
    marca,
    modelo,
    type,
    salud,
    assignation,
  };
  await pool.query("INSERT INTO peripherals SET ?", [newRegistro]);
  req.flash("success", "Registro guardado satisfactoriamente");
  res.redirect("/peripherals");
});

router.post("/search", isLoggedIn, async (req, res) => {
  const busqueda = req.body.busqueda;
  const id = await pool.query(
    `SELECT * FROM peripherals WHERE id LIKE '%${busqueda}%'`
  );
  const tipo = await pool.query(
    `SELECT * FROM peripherals WHERE type LIKE '%${busqueda}%'`
  );
  const serial = await pool.query(
    `SELECT * FROM peripherals WHERE serial LIKE '%${busqueda}%'`
  );
  const assignation = await pool.query(
    `SELECT * FROM peripherals WHERE assignation LIKE '%${busqueda}%'`
  );
  res.render("peripherals/search", { id, tipo, serial, assignation });
});

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const assignation = await pool.query("SELECT nombre_empleado FROM usuarios");
  const peripheral = await pool.query(
    "SELECT * FROM peripherals WHERE id = ?",
    [id]
  );
  res.render("peripherals/edit", { assignation, peripheral: peripheral[0] });
});

router.post("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { serial, marca, modelo, type, salud, assignation } = req.body;
  const editRegistro = {
    serial,
    marca,
    modelo,
    type,
    salud,
    assignation,
  };
  await pool.query("UPDATE peripherals SET ? WHERE id = ?", [editRegistro, id]);
  req.flash("success", "Registro actualizado satisfactoriamente");
  res.redirect("/peripherals");
});

router.get("/delete/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM peripherals WHERE id = ?", [id]);
  req.flash("success", "Registro eliminado satisfactoriamente");
  res.redirect("/peripherals");
});

module.exports = router;

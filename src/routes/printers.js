const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/", isLoggedIn, async (req, res) => {
  const printer = await pool.query("SELECT * FROM printers");
  res.render("printers/list", { printer });
});

router.post("/search", isLoggedIn, async (req, res) => {
  const busqueda = req.body.busqueda;
  const printer = await pool.query(
    `SELECT *
    FROM printers
    WHERE
      serial LIKE '%${busqueda}%' OR
      type LIKE '%${busqueda}%' OR
      marca LIKE '%${busqueda}%' OR
      modelo LIKE '%${busqueda}%' OR
      ubicacion LIKE '%${busqueda}%' OR
      propiety LIKE '%${busqueda}%' OR
      estado LIKE '%${busqueda}%';
  `
  );
  res.render("printers/search", { printer });
});

router.get("/add", isLoggedIn, (req, res) => {
  res.render("printers/add");
});

router.post("/add", isLoggedIn, async (req, res) => {
  const { serial, type, marca, modelo, ubicacion, propiety, estado } = req.body;
  const newRegistro = {
    serial,
    type,
    marca,
    modelo,
    ubicacion,
    propiety,
    estado,
  };

  await pool.query("INSERT INTO printers SET ?", [newRegistro]);
  req.flash("success", "Registro guardado satisfactoriamente");
  res.redirect("/printers");
});

router.get("/edit/:serial", isLoggedIn, async (req, res) => {
  const { serial } = req.params;
  const printer = await pool.query("SELECT * FROM printers WHERE serial = ?", [
    serial,
  ]);
  res.render("printers/edit", { printer: printer[0] });
});

router.post("/edit/:serial", isLoggedIn, async (req, res) => {
  const { serial } = req.params;
  const { type, marca, modelo, ubicacion, propiety, estado } = req.body;
  const editRegistro = {
    serial,
    type,
    marca,
    modelo,
    ubicacion,
    propiety,
    estado,
  };
  await pool.query("UPDATE printers SET ? WHERE serial = ?", [
    editRegistro,
    serial,
  ]);
  req.flash("success", "Registro actualizado satisfactoriamente");
  res.redirect("/printers");
});

router.get("/delete/:serial", isLoggedIn, async (req, res) => {
  const { serial } = req.params;
  await pool.query("DELETE FROM printers WHERE serial = ?", [serial]);
  req.flash("success", "Registro eliminado satisfactoriamente");
  res.redirect("/printers");
});

module.exports = router;

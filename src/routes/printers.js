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

// router.get("/add", isLoggedIn, async (req, res) => {
//   const assignation = await pool.query("SELECT nombre_empleado FROM usuarios");
//   res.render("hardware/add", { assignation });
// });

// router.post("/add", isLoggedIn, async (req, res) => {
//   const {
//     nombre_equipo,
//     categoria,
//     serial,
//     sistema_operativo,
//     modelo,
//     fabricante,
//     procesador,
//     ram,
//     tipo_almacenamiento,
//     capacidad_almacenamiento,
//     assignation,
//     propiedad,
//     salud,
//     fecha_ultimo_mantenimiento,
//   } = req.body;
//   const newRegistro = {
//     nombre_equipo,
//     categoria,
//     serial,
//     sistema_operativo,
//     modelo,
//     fabricante,
//     procesador,
//     ram,
//     tipo_almacenamiento,
//     capacidad_almacenamiento,
//     assignation,
//     propiedad,
//     salud,
//     fecha_ultimo_mantenimiento,
//   };

//   await pool.query("INSERT INTO equipos SET ?", [newRegistro]);
//   req.flash("success", "Registro guardado satisfactoriamente");
//   res.redirect("/hardware");
// });

// router.get("/edit/:serial", isLoggedIn, async (req, res) => {
//   const { serial } = req.params;
//   const assignation = await pool.query("SELECT nombre_empleado FROM usuarios");
//   const hardware = await pool.query("SELECT * FROM equipos WHERE serial = ?", [
//     serial,
//   ]);
//   res.render("hardware/edit", { assignation, hardware: hardware[0] });
// });

// router.post("/edit/:serial", isLoggedIn, async (req, res) => {
//   const { serial } = req.params;
//   const {
//     nombre_equipo,
//     categoria,
//     sistema_operativo,
//     modelo,
//     fabricante,
//     procesador,
//     ram,
//     tipo_almacenamiento,
//     capacidad_almacenamiento,
//     assignation,
//     propiedad,
//     salud,
//     fecha_ultimo_mantenimiento,
//   } = req.body;
//   const editRegistro = {
//     nombre_equipo,
//     categoria,
//     sistema_operativo,
//     modelo,
//     fabricante,
//     procesador,
//     ram,
//     tipo_almacenamiento,
//     capacidad_almacenamiento,
//     assignation,
//     propiedad,
//     salud,
//     fecha_ultimo_mantenimiento,
//   };
//   await pool.query("UPDATE equipos SET ? WHERE serial = ?", [
//     editRegistro,
//     serial,
//   ]);
//   req.flash("success", "Registro actualizado satisfactoriamente");
//   res.redirect("/hardware");
// });

// router.get("/delete/:serial", isLoggedIn, async (req, res) => {
//   const { serial } = req.params;
//   await pool.query("DELETE FROM equipos WHERE serial = ?", [serial]);
//   req.flash("success", "Registro eliminado satisfactoriamente");
//   res.redirect("/hardware");
// });

module.exports = router;

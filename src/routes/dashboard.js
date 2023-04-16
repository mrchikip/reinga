const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/", isLoggedIn, async (req, res) => {
  const gpcalm = await pool.query(
    "SELECT COUNT(*) AS num_almacenados FROM equipos WHERE assignation = 'Almacenado'"
  );
  const gpcent = await pool.query(
    "SELECT COUNT(*) AS num_no_almacenados FROM equipos WHERE assignation != 'Almacenado'"
  );
  const gpcperc =
    (gpcent[0].num_no_almacenados * 100) /
    (gpcent[0].num_no_almacenados + gpcalm[0].num_almacenados);
  const gucount = await pool.query(
    "SELECT  COUNT(*) AS num_users FROM usuarios"
  );
  const gucpro = await pool.query(
    "SELECT proceso, COUNT(*) AS count_proceso FROM usuarios GROUP BY proceso ORDER BY count_proceso DESC LIMIT 1"
  );

  const gpcount = await pool.query(
    "SELECT type, COUNT(*) AS count_type FROM peripherals GROUP BY type"
  );

  // const gpcdiadema = await pool.query(
  //   "SELECT proceso, COUNT(*) AS count_diadema FROM peripherals GROUP BY proceso ORDER BY count_proceso DESC LIMIT 1"
  // );

  // const gpcmouse = await pool.query(
  //   "SELECT proceso, COUNT(*) AS count_mouse FROM peripherals GROUP BY proceso ORDER BY count_proceso DESC LIMIT 1"
  // );

  // const gpcteclado = await pool.query(
  //   "SELECT proceso, COUNT(*) AS count_teclado FROM peripherals GROUP BY proceso ORDER BY count_proceso DESC LIMIT 1"
  // );

  // const gpcbase = await pool.query(
  //   "SELECT proceso, COUNT(*) AS count_base FROM peripherals GROUP BY proceso ORDER BY count_proceso DESC LIMIT 1"
  // );

  // const gpcbolso = await pool.query(
  //   "SELECT proceso, COUNT(*) AS count_bolso FROM peripherals GROUP BY proceso ORDER BY count_proceso DESC LIMIT 1"
  // );

  // const gpcpantalla = await pool.query(
  //   "SELECT proceso, COUNT(*) AS count_pantalla FROM peripherals GROUP BY proceso ORDER BY count_proceso DESC LIMIT 1"
  // );

  res.render("dashboard/index", {
    gpcount,
    gpcalm: gpcalm[0],
    gpcent: gpcent[0],
    gpcperc: gpcperc.toFixed(2),
    gucount: gucount[0],
    gucpro: gucpro[0],
  });
});

module.exports = router;

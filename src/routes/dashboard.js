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

  res.render("dashboard/index", {
    gpcalm: gpcalm[0],
    gpcent: gpcent[0],
    gpcperc: gpcperc.toFixed(2),
    gucount: gucount[0],
    gucpro: gucpro[0],
  });
});

module.exports = router;

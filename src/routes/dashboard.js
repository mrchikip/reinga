const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/", isLoggedIn, async (req, res) => {
  const gequiposalm = await pool.query(
    "SELECT COUNT(*) AS num_almacenados FROM equipos WHERE assignation = 'Almacenado'"
  );
  const gequiposent = await pool.query(
    "SELECT COUNT(*) AS num_no_almacenados FROM equipos WHERE assignation != 'Almacenado'"
  );
  res.render("dashboard/index", { gequiposalm, gequiposent });
});

module.exports = router;

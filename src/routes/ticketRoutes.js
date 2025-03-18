const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

router.get("/ingressos", ticketController.getAllIngressos);
router.get("/ingressos/:id", ticketController.getIngresso);
router.post("/ingressos", ticketController.createIngresso);
router.put("/ingressos/:id", ticketController.updateIngresso);
router.delete("/ingressos/:id", ticketController.deleteIngresso);
router.post("/venda", ticketController.vendaIngresso);

module.exports = router;

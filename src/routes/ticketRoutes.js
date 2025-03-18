const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

router.get("/tickets", ticketController.getAllIngressos);
router.get("/tickets/:id", ticketController.getIngresso);
router.post("/tickets", ticketController.createIngresso);
router.put("/tickets/:id", ticketController.updateIngresso);
router.delete("/tickets/:id", ticketController.deleteIngresso);
router.post("/venda/:id", ticketController.vendaIngresso);
module.exports = router;

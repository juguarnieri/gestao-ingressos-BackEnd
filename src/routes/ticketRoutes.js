const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/tickets", userController.getAllIngressos);
router.get("/tickets/:id", userController.getIngresso);
router.post("/tickets", userController.createIngresso);
//router.put("/tickets/:id", userController.updateIngresso);
//router.delete("/tickets/:id", userController.deleteIngresso);

module.exports = router;

const express = require("express")
const ApiInventoryMovement = require("../api/inventoryMovement")
const inventoryMoveRouter = express.Router();
const authMiddleware = require("../middleware/auth");

inventoryMoveRouter.get('/:inventoryId/', authMiddleware(), ApiInventoryMovement.FindAll)
inventoryMoveRouter.get('/:inventoryId/:id', authMiddleware(), ApiInventoryMovement.FindById)
inventoryMoveRouter.post('/:inventoryId/', authMiddleware(), ApiInventoryMovement.Create)
inventoryMoveRouter.put('/:inventoryId/:id', authMiddleware(), ApiInventoryMovement.Update)
inventoryMoveRouter.delete('/:inventoryId/:id', authMiddleware(), ApiInventoryMovement.Delete)

module.exports = inventoryMoveRouter

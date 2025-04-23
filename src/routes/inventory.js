const express = require("express")
const ApiInventory = require("../api/inventory")
const inventoryRouter = express.Router();
const authMiddleware = require("../middleware/auth");

inventoryRouter.get('/', authMiddleware(), ApiInventory.FindAll)
inventoryRouter.get('/:id', authMiddleware(), ApiInventory.FindById)
inventoryRouter.post('/', authMiddleware(), ApiInventory.Create)
inventoryRouter.put('/:id', authMiddleware(), ApiInventory.Update)
inventoryRouter.delete('/:id', authMiddleware(), ApiInventory.Delete)

module.exports = inventoryRouter

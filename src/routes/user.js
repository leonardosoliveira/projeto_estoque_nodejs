const express = require("express")
const ApiUser = require("../api/user");
const authMiddleware = require("../middleware/auth");
const userRouter = express.Router();

// opções de usuarios 
userRouter.get('/info', authMiddleware(), ApiUser.FindById)
userRouter.put('/:id', authMiddleware(), ApiUser.Update)
userRouter.delete('/', authMiddleware(), ApiUser.Delete)


// opções de admin
userRouter.post('/', authMiddleware('admin'), ApiUser.Create)
userRouter.get('/', authMiddleware('admin'), ApiUser.FindAll)
userRouter.get('/:id', authMiddleware('admin'), ApiUser.FindById)
userRouter.put('/:id', authMiddleware('admin'), ApiUser.Update)
userRouter.delete('/:id', authMiddleware('admin'), ApiUser.Delete)


module.exports = userRouter

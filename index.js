const express = require("express")
const app = express()
const database = require("./src/database")
const userRouter = require("./src/routes/user")
const productRouter = require("./src/routes/product")
const inventoryRouter = require("./src/routes/inventory")
const organizationRouter = require("./src/routes/organization")
const inventoryMoveRouter = require("./src/routes/inventoryMovement")
const apiUser = require("./src/api/user")


port = 3000

app.use(express.json())

app.post('/api/v1/login', apiUser.Login)

//rotas
app.use('/api/v1/organization', organizationRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/inventory', inventoryRouter)
app.use('/api/v1/inventoryMovement', inventoryMoveRouter)


//Iniciar uma conexão com o Banco de dados
database.db
    .sync({force: false})
    .then((_) => {
        app.listen(port, () => {
            console.info(`Servidor rodando na porta ${port}`)
        })
    })
    .catch((e) => {
        console.error(`Não foi possivel conectar com o banco: ${e}`)
    })

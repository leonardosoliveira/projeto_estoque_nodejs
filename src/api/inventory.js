const serviceInventory = require("../service/inventory")

class ApiInventory{

    async FindAll(req, res ){
        try {
            const organizationId = req.session.organizationId
            const inventoriesAll = await serviceInventory.FindAll(organizationId)

            res.status(200).send({ inventoriesAll })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }
    async FindById(req, res ){
        try {
            const organizationId = req.session.organizationId
            const {id} = req.params
            const inventory = await serviceInventory.FindById(organizationId, id)

            res.status(200).send({ inventory })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }

    async Create(req, res ){
        try {
            const organizationId = req.session.organizationId
            const {name} = req.body
            const inventoryNew = await serviceInventory.Create(organizationId, name)

            res.status(200).send({ inventoryNew })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }

    async Update(req, res ){
        try {
            const organizationId = req.session.organizationId
            const {id} = req.params
            const {name} = req.body
            const inventoryUpdate = await serviceInventory.Update(organizationId, id, name)

            res.status(200).send({ inventoryUpdate })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }

    async Delete(req, res ){
        try {
            const organizationId = req.session.organizationId
            const {id} = req.params
            const inventoryDelete = await serviceInventory.Delete(organizationId, id)

            res.status(200).send({ inventoryDelete })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }

}

module.exports = new ApiInventory()
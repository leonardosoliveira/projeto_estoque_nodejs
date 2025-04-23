const serviceProduct = require("../service/product")

class ApiProduct{

    async FindAll(req, res ){
        try {
            const organizationId = req.session.organizationId
            const productAll = await serviceProduct.FindAll(organizationId)

            res.status(200).send({ productAll })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }
    async FindById(req, res ){
        try {
            const {id} = req.params
            const organizationId = req.session.organizationId
            const productById = await serviceProduct.FindById(organizationId, id)

            res.status(200).send({ productById })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }

    async Create(req, res ){
        try {
            const organizationId = req.session.organizationId
            const {name, description} = req.body
            const productCreate = await serviceProduct.Create(organizationId, name, description)

            res.status(200).send({ productCreate })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }

    async Update(req, res ){
        try {
            const organizationId = req.session.organizationId
            const {id} = req.params
            const {name, description} = req.body
            const productUpdate = await serviceProduct.Update(organizationId, id, name, description)

            res.status(200).send({ productUpdate })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }

    async Delete(req, res ){
        try {
            const organizationId = req.session.organizationId
            const {id} = req.params
            const productDelete = await serviceProduct.Delete(organizationId, id)

            res.status(200).send({ productDelete })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }

}

module.exports = new ApiProduct()
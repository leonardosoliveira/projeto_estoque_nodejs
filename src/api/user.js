const serviceUser = require("../service/user")

class ApiUser{

    async FindAll(req, res ){
        try {
            const organizationId = req.session.organizationId
            const users = await serviceUser.FindAll(organizationId)

            res.status(200).send({ users })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }
    async FindById(req, res ){
        try {
            const organizationId = req.session.organizationId
            const {id} = req.params
            const user = await serviceUser.FindById(organizationId, id)

            res.status(200).send({ user })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }

    async Create(req, res ){
        try {
            const organizationId = req.session.organizationId
            const {name, email, password, role} = req.body
            const user = await serviceUser.Create(organizationId, name, email, password, role)
            res.status(200).send({ user })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }

    async Update(req, res ){
        try {
            const organizationId = req.session.organizationId
            const {id} = req.params
            const {name, email, password, role} = req.body
            const user = await serviceUser.Update(organizationId, id, name, email, password, role)

            res.status(200).send({ user })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }

    async Delete(req, res){
        try {
            const organizationId = req.session.organizationId
            const {id} = req.params
            const user = await serviceUser.Delete(organizationId, id)
            res.status(200).send({ user })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }

    async Login(req, res){
        try {
            const {email, password} = req.body
            const token = await serviceUser.Login(email, password)
            
            res.status(200).send({ token })
        } catch (error) {
            res.status(500).send({msg : error.message})
        }
    }

}

module.exports = new ApiUser()
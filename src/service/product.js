

const modelProduct = require("../model/product")

class ServiceProduct{

    async FindAll(organizationId, transaction){
        
        if(!organizationId){
            throw new Error("Informar uma organização valida")
        }
        
        const productsAll = await modelProduct.findAll(
            { where: {organizationId} },
            { transaction }
        )
        return productsAll
    }

    async FindById(organizationId, id, transaction){
        if(!organizationId){
            throw new Error("Informar uma organização valida")
        }else if(!id){
            throw new Error("Informar um Id valido")
        }

        const productById = await modelProduct.findOne(
            { where: {organizationId, id }},
            { transaction }
        )
        return productById
    }

    async Create(organizationId, name, description, transaction){
        if(!organizationId){
            throw new Error("Organização não encontrada")
        }else if(!name){
            throw new Error("Informar um nome valido")
        }else if(!description){
            throw new Error("Informar uma descrição valida")
        }

       return modelProduct.create({organizationId, name, description}, {transaction})
    }

    async Update(organizationId, id, name, description, transaction){
        const oldProduct = await this.FindById(organizationId, id, transaction)

        if(!oldProduct){
            throw new Error("Produto não encontrado")
        }

        oldProduct.name = name || oldProduct.name
        oldProduct.description = description || oldProduct.description

        return oldProduct.save({transaction})
    }

    async Delete(organizationId, id, transaction){
        const deleteUser = await this.FindById(organizationId, id, transaction)

        if(!deleteUser){
            throw new Error("Produto não encontrado")
        }

        const user = await deleteUser.destroy({ transaction })

        return user
    }

}

module.exports = new ServiceProduct()
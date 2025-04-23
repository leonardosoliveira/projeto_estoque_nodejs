

const getProductMovements = require("../fns/get-product-movements")
const modelInventory = require("../model/inventory")
const inventoryMovement = require("./inventoryMovement")

class ServiceInventory{

    async FindAll(organizationId, transaction){
        
        if(!organizationId){
            throw new Error("Informar uma organização valida")
        }
        
        const inventoriesAll = await modelInventory.findAll(
            {where: {organizationId}},
            {transaction}
        )
        return inventoriesAll
    }

    async FindById(organizationId, id, transaction){
        if(!organizationId){
            throw new Error("Informar uma organização valida")
        }else if(!id){
            throw new Error("Informar um Id valido")
        }

        const inventoryById = await modelInventory.findOne(
            { where: {organizationId, id }},
            {transaction}
        )

        if(!inventoryById){
            throw new Error("Estoque não encontrado")
        }

        const movements = await inventoryMovement.FindAll(inventoryById.id)

        const result = getProductMovements(movements)

        return {...inventoryById.dataValues, ...result}
    }

    async Create(organizationId, name, transaction){
        if(!organizationId){
            throw new Error("Organização não encontrada")
        }else if(!name){
            throw new Error("Informar um nome valido")
        }

       return modelInventory.create({organizationId, name}, {transaction})
    }

    async Update(organizationId, id, name, transaction){
        const oldInventory = await this.FindById(organizationId, id, transaction)

        if(!oldInventory){
            throw new Error("Inventario não encontrado")
        }

        oldInventory.name = name || oldInventory.name

        return oldInventory.save({transaction})
    }

    async Delete(organizationId, id, transaction){
        const deleteInventory = await this.FindById(organizationId, id, transaction)

        if(!deleteInventory){
            throw new Error("Inventario não encontrado")
        }

        const inventory = await deleteInventory.destroy({ transaction })

        return inventory
    }

}

module.exports = new ServiceInventory()
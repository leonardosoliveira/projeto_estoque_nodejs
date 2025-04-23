const modelInventoryMovement = require("../model/inventoryMovement")
const product = require("../model/product")

const movementTypes = ['out', 'in']

class ServiceInventoryMovement{

    async FindAll(inventoryId, transaction){
        
        if(!inventoryId){
            throw new Error("Informar um estoque valido")
        }
        
        const inventoriesAll = await modelInventoryMovement.findAll(
            { where: { inventoryId }, include: { model: product} },
            { transaction }
        )
        return inventoriesAll
    }

    async FindById(inventoryId, id, transaction){
        if(!inventoryId){
            throw new Error("Informar um Id valido")
        }else if(!id){
            throw new Error("Informar um Id valido")
        }

        const inventoryById = await modelInventoryMovement.findOne(
            { where: {inventoryId, id }},
            {transaction}
        )
        return inventoryById
    }

    async Create(inventoryId, userId, type, amount, productId, transaction){
        if(!inventoryId){
            throw new Error("Informar um inventoryId valido")
        }else if(!userId){
            throw new Error("Informar um userId valido")
        }else if(!type || !movementTypes.includes(type)){
            throw new Error("Informar um type valido")
        }else if(!amount){
            throw new Error("Informar o campo quantidade")
        }else if(!productId){
            throw new Error("Informar um productId valido")
        }

       return modelInventoryMovement.create({inventoryId, userId, type, amount, productId}, {transaction})
    }

    async Update(inventoryId, id, type, amount, transaction){
        const oldInventoryMovement = await this.FindById(inventoryId, id, transaction)

        if(!oldInventoryMovement){
            throw new Error("Inventario não encontrado")
        }else if(type && !movementTypes.includes(type)){
            throw new Error("Informe o tipo de movimentação corretamente")
        }

        oldInventoryMovement.type = type || oldInventoryMovement.type
        oldInventoryMovement.amount = amount || oldInventoryMovement.amount

        return oldInventoryMovement.save({transaction})
    }

    async Delete(inventoryId, id, transaction){
        const deleteInventory = await this.FindById(inventoryId, id, transaction)

        if(!deleteInventory){
            throw new Error("Inventario não encontrado")
        }

        const inventory = await deleteInventory.destroy({ transaction })

        return inventory
    }

}

module.exports = new ServiceInventoryMovement()
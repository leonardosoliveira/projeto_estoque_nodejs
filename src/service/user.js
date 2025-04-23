const modelUser = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const salt = 12
const secretKey = 'MeuSegredoForte'
const roles = ['admin', 'employee']

class ServiceUser{
    async FindAll(organizationId, transaction){

        if(!organizationId){
            throw new Error("Organização invalida")
        }

        const users = await modelUser.findAll({
            where: {
                organizationId: organizationId
            }
          }, {transaction})
        return users
    }

    async FindById(organizationId, id, transaction){
        if(!organizationId){
            throw new Error("Id invalido")
        }else if(!id){
            throw new Error("Organizacao invalida")
        }

        const userID = await modelUser.findOne({
            where: {
                organizationId: organizationId,
                id:id
            }
        }, {transaction})

        return userID
    }

    async Create(organizationId, name, email, password, role, transaction){
        if(!organizationId){
            throw new Error("Organização Invalida")
        }else if(!name){
            throw new Error("Nome Invalido")
        }else if(!email){
            throw new Error("Email Invalido")
        }else if(!password){
            throw new Error("Senha Invalida")
        }else if(!role || !roles.includes(role)){
            throw new Error("Role Invalido")
        }

        const hashPass = await bcrypt.hash(password, salt)

       return modelUser.create({ organizationId, name, email, password: hashPass, role }, { transaction })
    }

    async Update(organizationId, id, name, email, password, role, transaction){
        const oldUser = await this.FindById(organizationId, id, transaction)

        if(role && !roles.includes(role)){
            throw new Error("Informar a permissão corretamente")
        }else if(role && oldUser.role == "admin"){
            oldUser.role = role
        }else if(!organizationId){
            throw new Error("Organização ou usuario não encontrado")
        }else if(!id){
            throw new Error("Organização ou usuario não encontrado")
        }

        oldUser.name = name || oldUser.name
        oldUser.email = email || oldUser.email
        oldUser.password = password ? await bcrypt.hash(password, salt) : oldUser.password

        await oldUser.save({ transaction })

        return oldUser
    }

    async Delete(organizationId, id, transaction){
        const deleteUser = await this.FindById(organizationId, id, transaction)

        if(!deleteUser){
            throw new Error("Usuario não encontrado")
        }
        
        return deleteUser.destroy({transaction})
    }

    async Login(email, password, transaction){

        if(!email || !password){
            throw new Error("Email ou senha incorretos")
        }

        const user = await modelUser.findOne(
            { where: {email} },
            { transaction }
        )

        if(!user){
            throw new Error("Email ou senha incorretos")
        }

        const verify = await bcrypt.compare(password, user.password)

        if(verify){
            return jwt.sign({
                id: user.id,
                role: user.role,
                organizationId: user.organizationId
            }, secretKey, { expiresIn: 60 * 60 } )
        }

        throw new Error("Xabalueueud teste")
    }
    async Verify(id, role, transaction){
        return modelUser.findOne(
            { where: {id, role} },
            { transaction }
        )
    }

}

module.exports = new ServiceUser()
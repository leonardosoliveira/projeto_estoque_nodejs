const jwt = require("jsonwebtoken")
const user = require("../service/user")
const secretKey = 'MeuSegredoForte'

function authMiddleware(role) {

    return (req, res, next) => {
        const token = req.headers['authorization']
        console.log(token, role)

        if(!token){
           res.status(400).json({msg: "Sessão invalida"})
           return
        }

        jwt.verify(token, secretKey, async(err, decoded) =>{
            if(err){
                console.log(err)
                res.status(400).json({msg: "Sessão invalida"})
                return
            }

            const verify = await user.Verify(decoded.id, decoded.role)

            if(!verify || (role && !role.includes(decoded.role))){
                res.status(401).json({msg: "Permissão negada - Solicite liberação com o seu supervisor"})
                return
            }

            req.session = decoded
            next()
        })
    }
}

module.exports = authMiddleware
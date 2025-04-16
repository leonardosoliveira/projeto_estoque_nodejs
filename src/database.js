const {Sequelize} = require("sequelize")

class Database{
    constructor(){
        this.init()
    }

    init(){
        this.db = new Sequelize({
            database: "project_inventory",
            host: "localhost",
            username: "root",
            dialect: "mysql",
            password: ""
        })
    }
   
}

module.exports = new Database()
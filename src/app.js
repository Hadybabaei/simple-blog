const express = require("express");
const dataBaseConnection = require("./utils/database/dbConnect");
const errorMiddleware = require("./middlewares/errorHandler.middleware");
const helmet = require("helmet")
const morgan = require("morgan")

class App {
    app = express();

    constructor(controllers,port){
        this.port = port
        this.initiateExpress(this.port)
        this.initiateMiddlewares()
        this.controllers = controllers
        this.initiateControllers(this.controllers)
        this.initiateDatabase()
        this.errorHandler()
    }

    initiateExpress = (port)=>{
        this.app.listen(port,()=>{
            console.log(`App Started on port ${port}`)
        })
    }

    initiateMiddlewares = ()=>{
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:false}))
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    errorHandler  = ()=>{
        this.app.use(errorMiddleware)
    }

    initiateControllers = (controllers)=>{
        controllers.forEach(controller=>{
            this.app.use('/api/',controller.router)
        })
    }

    initiateDatabase = ()=>{
        return dataBaseConnection() 
    }
}

module.exports = App
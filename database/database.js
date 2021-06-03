const mongoose = require("mongoose");
const url = "mongodb+srv://user_admin:enzo2011@clusterquest.qh30x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const options = { poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true };



   const connection = mongoose.connect(url, options);
    mongoose.set("useCreateIndex", true);


    
    
    //CONSOLE
    mongoose.connection.on("error", (err) => {
        console.log("Erro na conexão com o banco de dados: " + err);
    })
    
    mongoose.connection.on("disconected", () => {
        console.log("Aplicação desconectada do banco de dados!")
    })
    
    mongoose.connection.on("connected", () => {
        console.log("Aplicação conectada ao banco de dados!");
    });

    module.exports = connection;